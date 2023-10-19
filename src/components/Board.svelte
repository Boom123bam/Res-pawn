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

  function resetHighlights(resetHintSol = false) {
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
      step: 0,
      failed: false,
      finished: false,
      deductedPoints: 0,
      hint: false,
      solution: false,
      stats: {
        hintsUsed: 0,
        solsUsed: 0,
        timesFailed: 0,
      },
    };
    display.flipped = currentSequence.start.split(" ")[1] === "w"; // flip board if black is first
    // resetSequence(); TODO
    board.load(currentSequence.start);
    updateBoard();
    await timeout(100);
    await movePiece(currentSequence.moves[0]);
    updateBoard();
  }

  // function resetSequence() {
  //   // reset seq and board
  //   board.chess.load(currentSequence.start);
  //   resetBoardHighlights(false, true);
  //   board.movesBack = 0;
  //   currentSequence.step = 1;
  //   currentSequence.failed = false;
  //   currentSequence.finished = false;
  //   currentSequence.deductedPoints = 0;
  // }

  // function resetBoardHighlights(
  //   disable = null,
  //   resetHintSol = false
  // ) {
  //   // resets highlights and hints
  //   board.highlightedSquares = [];
  //   board.selectedSquare = null;
  //   if (disable != null) {
  //     display.disabled = disable;
  //   }
  //   if (resetHintSol) {
  //     currentSequence.hint = false;
  //     currentSequence.solution = false;
  //   }
  // }

  function updateBoard() {
    resetHighlights();
    display.board = board.chess.board();
  }

  // function updateBoard() {
  //   if (board.movesBack == -1) {
  //     // user got the sequence wrong, show the last move in board.displayer
  //     resetBoardHighlights(true, true);
  //     board.displayer.load(currentSequence.failed);
  //     board.board = board.displayer.board();
  //   } else if (board.movesBack) {
  //     //switch to history mode
  //     resetBoardHighlights(true, true);
  //     loadMovesBack(board.movesBack);
  //     board.board = board.displayer.board();
  //   } else {
  //     if (
  //       display.disabled &&
  //       (!currentSequence ||
  //         (!currentSequence.failed && !currentSequence.finished))
  //     ) {
  //       //switch to normal mode
  //       display.disabled = false;
  //     }
  //     board.board = board.chess.board();
  //   }
  // }

  function getSquare(row, col) {
    // convert row and col to square notation
    return `${String.fromCharCode("a".charCodeAt(0) + col)}${
      8 - row
    }`;
  }

  // function checkIfPromotion(move) {
  //   // check if the move is promotion
  //   // if moveTo is last row and if piece is pawn

  //   const piece = board.chess.get(move.substring(0, 2));
  //   if (
  //     piece.type == "p" &&
  //     ((move[3] == "1" && piece.color == "b") ||
  //       (move[3] == "8" && piece.color == "w"))
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function movePiece(move, duration = 0.1) {
    if (board.soundOn) {
      if (board.chess.get(move.substring(2, 4))) {
        playAudio(captureBuffer);
      } else playAudio(moveBuffer);
    }

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
    const expectedMove = currentSequence.moves[currentSequence.step];

    // Check if a move is provided and validate it
    if (move) {
      //compare move to expected move
      if (move === expectedMove) {
        // correct move
        currentSequence.step++;
      } else {
        // wrong move
        return false;
      }
    } else {
      // auto move
      await movePiece(expectedMove);
      if (currentSequence.step == currentSequence.length - 2) {
        console.error(`step out of range: ${currentSequence.step}`);
      }
      currentSequence.step++;
    }

    if (currentSequence.step === currentSequence.moves.length) {
      // finished
      currentSequence.finished = true;
      display.disabled = true;
      // dispatch event and return stats
      dispatch("finish", currentSequence.stats);
    }

    return true;
  }

  // function loadMovesBack(movesBack) {
  //   const history = board.chess.history({ verbose: true });
  //   board.displayer.load(history[history.length - movesBack].before);
  // }

  // function getMoves(square) {
  //   // get valid moves for a square
  //   return board.chess
  //     .moves({
  //       square,
  //       verbose: true,
  //     })
  //     .map((move) => {
  //       return move.to;
  //     });
  // }

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
        // correct move, move piece
        await movePiece(move);
        if (currentSequence.step !== currentSequence.moves.length) {
          updateBoard();
          await timeout(250);
          await updateSequence(); // auto move opposing side if not finished
        }
      } else {
        // wrong move
        await movePiece(move);
        // check if checkmate (somtimes there are 2 answers for the last move)
        if (board.chess.isCheckmate()) {
          currentSequence.finished = true;
          // dispatch event and return stats
          dispatch("finish", currentSequence.stats);
        } else {
          display.disabled = true;
          board.movesBack = -1;
          currentSequence.failed = board.chess.fen();
          currentSequence.stats.timesFailed++;
        }
        updateBoard();
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

  // function handlePromotion(e) {
  //   handleMoveClick(board.moveToPromote, e.detail);
  //   board.moveToPromote = "";
  // }

  function handleBackButton() {
    console.log(board.showPrevMove());
    updateBoard();
    //   if (board.movesBack < board.chess.history().length) {
    //     board.movesBack++;
    //     updateBoard();
    //   }
  }

  function handleNextButton() {
    console.log(board.showNextMove());
    updateBoard();
    //   if (
    //     board.movesBack > 0 ||
    //     (board.movesBack == 0 && currentSequence?.failed)
    //   ) {
    //     board.movesBack--;
    //     updateBoard();
    //   }
  }

  // function handleFlipButton() {
  //   board.flipped = !board.flipped;
  // }

  // function handleRetryLastMoveButton() {
  //   display.disabled = false;
  //   currentSequence.failed = false;
  //   board.movesBack = 0;
  //   updateBoard();
  // }

  function handleHintButton() {
    currentSequence.hint = true;
    currentSequence.stats.hintsUsed++;
  }

  // function handleSolutionButton() {
  //   currentSequence.solution = true;
  //   currentSequence.stats.solsUsed++;
  // }
</script>

<div class="board-component-wrapper">
  <div class="board-wrapper">
    <!-- {#if board.moveToPromote}
      <Promotion
        on:promotion={handlePromotion}
        color={board.chess.get(board.moveToPromote.substring(0, 2))
          .color}
      />
    {/if} -->
    <div class="board-padding">
      <div class={`board${board.flipped ? " flipped" : " normal"}`}>
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
              hint={currentSequence?.hint &&
                currentSequence?.moves[
                  currentSequence?.step
                ].substring(0, 2) == getSquare(rowNum, colNum)}
              solution={currentSequence?.solution &&
                currentSequence?.moves[
                  currentSequence?.step
                ].substring(2, 4) == getSquare(rowNum, colNum)}
              lastMove={board.movesBack == 0 &&
                (board.lastMove?.substring(0, 2) ==
                  getSquare(rowNum, colNum) ||
                  board.lastMove?.substring(2, 4) ==
                    getSquare(rowNum, colNum))}
              order={board.flipped
                ? 63 - (rowNum * 8 + colNum)
                : rowNum * 8 + colNum}
              flipped={board.flipped}
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
            href={
            board.movesBack === -1
              ? `https://www.chess.com/analysis?fen=${
                  currentSequence.failed
                }&flip=${
                  currentSequence.start.split(" ")[1] === "w"
                }&tab=analysis`
              : board.movesBack
              ? `https://www.chess.com/analysis?fen=${board.displayer.fen()}&flip=${
                  currentSequence.start.split(" ")[1] === "w"
                }&tab=analysis`
              : `https://www.chess.com/analysis?fen=${board.chess.fen()}&flip=${
                  currentSequence.start.split(" ")[1] === "w"
                }&tab=analysis`
                }
            target="_blank"
          > -->
          <!-- <a
            href={board.movesBack === -1
              ? `https://lichess.org/analysis/standard/${
                  currentSequence.failed
                }?color=${
                  currentSequence.start.split(" ")[1] === "w"
                    ? "black"
                    : "white"
                }`
              : board.movesBack
              ? `https://lichess.org/analysis/standard/${board.displayer.fen()}?color=${
                  currentSequence.start.split(" ")[1] === "w"
                    ? "black"
                    : "white"
                }`
              : `https://lichess.org/analysis/standard/${board.chess.fen()}?color=${
                  currentSequence.start.split(" ")[1] === "w"
                    ? "black"
                    : "white"
                }`}
            target="_blank"
          >
            <button class="analyze" title="analyze in lichess"
              ><Svg name="search" color="var(--secondary)" /></button
            >
          </a> -->
        </div>
        <BoardControls
          showRetryLastMove={currentSequence?.failed}
          showHint={!currentSequence?.finished &&
            !currentSequence?.failed &&
            !currentSequence?.hint &&
            board.movesBack == 0}
          showSol={!currentSequence?.finished &&
            !currentSequence?.failed &&
            currentSequence?.hint &&
            !currentSequence.solution}
          flashingNext={board.movesBack > 0}
          on:back={handleBackButton}
          on:next={handleNextButton}
          on:hint={handleHintButton}
        />
        <div class="after">
          <slot name="after" />
        </div>
      </div>
    </div>
  </div>
</div>
