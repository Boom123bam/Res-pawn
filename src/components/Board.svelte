<script>
  import "./Board.css";
  import Square from "./Square.svelte";
  import Promotion from "./Promotion.svelte";
  import BoardControls from "./BoardControls.svelte";
  import Svg from "./Svg.svelte";
  import { sequenceData } from "../stores/boardStore";
  import { getSetting } from "../modules/localStorage";
  import { createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import { Chess } from "chess.js";
  import { ChessBoard } from "../modules/chessBoard";

  // audio
  let moveBuffer;
  let captureBuffer;
  let context;
  loadAudioBuffers();

  const dispatch = createEventDispatcher();
  let currentSequence = null;

  let board = new ChessBoard();

  const display = {
    highlightedSquares: [],
    disabled: false,
    hint: false,
    solution: false,
    moveToPromote: null,
    movePlaying: null,
    board: board.chess.board(),
    flipped: false,
    failed: false,
  };

  function resetHighlights() {
    // resets highlights and hints

    display.highlightedSquares = [];
    // board.selectedSquare = null;
  }

  function resetHints() {
    display.hint = false;
    display.solution = false;
  }

  // let board = {
  //   chess: new Chess(),
  //   displayer: new Chess(),
  //   board: null,
  //   highlightedSquares: [],
  //   selectedSquare: null,
  //   movesBack: 0,
  //   disabled: false,
  //   flipped: false,
  //   moveToPromote: "",
  //   lastMove: "e4d5",
  //   movePlaying: null,
  //   showIndicatorOnHover: getSetting("showIndicatorOnHover"),
  //   soundOn: getSetting("sound"),
  // };
  // board.board = board.chess.board();

  sequenceData.subscribe((newSeqData) => {
    if (newSeqData && !newSeqData?.finished) {
      handleSeqLoad(newSeqData);
    }
  });

  function loadAudioBuffers() {
    if (browser) {
      let AudioContext =
        window.AudioContext || window.webkitAudioContext;
      context = new AudioContext(); // Make it crossbrowser
      window
        .fetch("/sfx/capture.mp3")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          context.decodeAudioData(
            arrayBuffer,
            (audioBuffer) => {
              captureBuffer = audioBuffer;
            },
            (error) => console.error(error)
          )
        );
      window
        .fetch("/sfx/move.mp3")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          context.decodeAudioData(
            arrayBuffer,
            (audioBuffer) => {
              moveBuffer = audioBuffer;
            },
            (error) => console.error(error)
          )
        );
    }
  }

  // function playAudio(audioBuffer) {
  //   if (browser) {
  //     let source = context.createBufferSource();
  //     source.buffer = audioBuffer;
  //     source.connect(context.destination);
  //     source.start();
  //   }
  // }

  async function handleSeqLoad(seqData) {
    currentSequence = {
      start: seqData.fen,
      moves: seqData.moves.split(" "),
      failed: false,
      finished: false,
      stats: {
        hintsUsed: 0,
        solsUsed: 0,
        timesFailed: 0,
      },
    };
    display.flipped = currentSequence.start.split(" ")[1] === "w"; // flip board if black is first
    resetSequence();
    board.load(currentSequence.start);
    updateBoard();
    await timeout(100);
    await movePiece(currentSequence.moves[0]);
    updateBoard();
  }

  function resetSequence() {
    // reset seq and board
    board.load(currentSequence.start);
    display.disabled = false;
    resetHighlights();
    resetHints();
    currentSequence.failed = false;
    currentSequence.finished = false;
  }

  function updateBoard() {
    console.log("update");
    resetHighlights();
    board = board; //trigger re render
    display.board = board.chess.board();
  }

  function getSquare(row, col) {
    // convert row and col to square notation
    return `${String.fromCharCode("a".charCodeAt(0) + col)}${
      8 - row
    }`;
  }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function movePiece(move, duration = 0.1) {
    if (board.soundOn) {
      if (board.chess.get(move.substring(2, 4))) {
        playAudio(captureBuffer);
      } else playAudio(moveBuffer);
    }

    resetHints();
    // play animation
    display.movePlaying = move;

    board.makeMove(move);
    // if (board.movesBack == 0) board.lastMove = move; TODO history
    await timeout(duration * 1000);
    display.movePlaying = null;
  }

  async function updateSequence(move = null) {
    // updates the currentSequence object based on the move recieved
    // if not move provided, it will execute the next move in the sequence

    // get the expected move
    const expectedMove = currentSequence.moves[board.history.length];

    // Check if a move is provided and validate it
    if (move) {
      //compare move to expected move
      await movePiece(move);
      updateBoard();
      if (move === expectedMove) {
        // correct move
        if (board.history.length !== currentSequence.moves.length) {
          await timeout(250);
          await updateSequence(); // auto move opposing side if not finished
          return;
        }
      } else {
        // wrong move

        // check if checkmate (somtimes there are 2 answers for the last move)
        if (board.chess.isCheckmate()) {
          currentSequence.finished = true;
          // dispatch event and return stats
          dispatch("finish", currentSequence.stats);
        } else {
          display.disabled = true;
          currentSequence.failed = board.chess.fen();
          currentSequence.stats.timesFailed++;
        }
      }
    } else {
      // auto move
      await movePiece(expectedMove);
      if (board.history.length == currentSequence.length - 2) {
        console.error(`step out of range: ${board.history.length}`);
      }
      updateBoard();
    }

    if (board.history.length === currentSequence.moves.length) {
      // finished
      currentSequence.finished = true;
      display.disabled = true;
      // dispatch event and return stats
      dispatch("finish", currentSequence.stats);
    }

    return true;
  }

  async function handleMoveClick(move, promoteToPiece = "") {
    if (!promoteToPiece & board.checkIfPromotion(move)) {
      // if the move is a promotion
      display.moveToPromote = move;
      return;
    }

    move += promoteToPiece;
    if (currentSequence) {
      resetHints();
      if (await updateSequence(move)) {
      } else {
      }
    } else {
      // no sequence, move piece
      await movePiece(move);
      updateBoard();
    }
  }

  function handlePieceClick(id) {
    if (display.disabled) return;
    if (display.highlightedSquares.length == 0) {
      // select the piece and highlight possible moves
      display.highlightedSquares = board.getPossibleMoves(id);
      if (display.highlightedSquares.length)
        board.selectedSquare = id;
    } else if (display.highlightedSquares.includes(id)) {
      handleMoveClick(board.selectedSquare + id);
      // check if there is a sequence
    } else {
      // un-select and un-highlight
      resetHighlights();
    }
  }

  function handlePromotion(e) {
    handleMoveClick(display.moveToPromote, e.detail);
    display.moveToPromote = "";
  }

  function handleBackButton() {
    console.log(board.showPrevMove());
    updateBoard();
  }

  function handleNextButton() {
    console.log(board.showNextMove());
    updateBoard();
  }

  function handleFlipButton() {
    display.flipped = !display.flipped;
  }

  function handleRetryLastMoveButton() {
    display.disabled = false;
    currentSequence.failed = false;
    board.undoMove();
    updateBoard();
  }

  function handleHintButton() {
    display.hint = true;
    currentSequence.stats.hintsUsed++;
  }

  function handleSolutionButton() {
    display.solution = true;
    currentSequence.stats.solsUsed++;
  }
</script>

<div class="board-component-wrapper">
  <div class="board-wrapper">
    {#if display.moveToPromote}
      <Promotion
        on:promotion={handlePromotion}
        color={board.chess.get(display.moveToPromote.substring(0, 2))
          .color}
      />
    {/if}
    <div class="board-padding">
      <div class={`board${display.flipped ? " flipped" : " normal"}`}>
        {#each display.board as row, rowNum}
          {#each row as square, colNum}
            <Square
              id={getSquare(rowNum, colNum)}
              squareColor={board.chess.squareColor(
                getSquare(rowNum, colNum)
              )}
              highlighted={display.highlightedSquares.includes(
                getSquare(rowNum, colNum)
              )}
              {square}
              {handlePieceClick}
              hint={display.hint &&
                currentSequence?.moves[
                  board.history.length
                ].substring(0, 2) == getSquare(rowNum, colNum)}
              solution={display.solution &&
                currentSequence?.moves[
                  board.history.length
                ].substring(2, 4) == getSquare(rowNum, colNum)}
              lastMove={board.movesBack == 0 &&
                (board.lastMove?.substring(0, 2) ==
                  getSquare(rowNum, colNum) ||
                  board.lastMove?.substring(2, 4) ==
                    getSquare(rowNum, colNum))}
              order={display.flipped
                ? 63 - (rowNum * 8 + colNum)
                : rowNum * 8 + colNum}
              flipped={display.flipped}
              moveTo={display.movePlaying
                ? display.movePlaying.substring(0, 2) ==
                  getSquare(rowNum, colNum)
                  ? display.movePlaying.substring(2, 4)
                  : null
                : null}
              showIndicatorOnHover={board.showIndicatorOnHover}
            />
          {/each}
        {/each}
      </div>
    </div>

    <div class="buttons-wrapper">
      <div class="buttons">
        <div class="before">
          <!-- <slot name="before" /> -->
          <!-- <a
            href={`https://www.chess.com/analysis?fen=${board.chess.fen()}&flip=${
              currentSequence.start.split(" ")[1] === "w"
            }&tab=analysis`}
            target="_blank"
          > -->
          <a
            href={`https://lichess.org/analysis/standard/${board.chess.fen()}?color=${
              currentSequence.start.split(" ")[1] === "w"
                ? "black"
                : "white"
            }`}
            target="_blank"
          >
            <button class="analyze" title="analyze in lichess"
              ><Svg name="search" color="var(--secondary)" /></button
            >
          </a>
        </div>
        <BoardControls
          showRetryLastMove={currentSequence?.failed}
          showHint={!currentSequence?.finished &&
            !currentSequence?.failed &&
            !display?.hint &&
            board.movesBack == 0}
          showSol={!currentSequence?.finished &&
            !currentSequence?.failed &&
            display?.hint &&
            !display.solution}
          flashingNext={board.movesBack > 0}
          on:back={handleBackButton}
          on:next={handleNextButton}
          on:hint={handleHintButton}
          on:solution={handleSolutionButton}
          on:flip={handleFlipButton}
          on:retryLastMove={handleRetryLastMoveButton}
        />
        <div class="after">
          <slot name="after" />
        </div>
      </div>
    </div>
  </div>
</div>
