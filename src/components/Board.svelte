<script>
  import "./Board.css";
  import Square from "./Square.svelte";
  import Promotion from "./Promotion.svelte";
  import BoardControls from "./BoardControls.svelte";
  import Svg from "./Svg.svelte";
  import {
    sequenceData,
    controlLog,
    board,
  } from "../stores/boardStore";
  import { getSetting } from "../modules/localStorage";
  import { createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import { ChessBoard } from "../modules/chessBoard";

  // audio
  let moveBuffer;
  let captureBuffer;
  let context;
  loadAudioBuffers();

  const dispatch = createEventDispatcher();
  let currentSequence = null;

  // let board = new ChessBoard();
  $board = new ChessBoard();

  const display = {
    board: $board.chess.board(),
    highlightedSquares: [],
    selectedSquare: null,
    disabled: false,
    hint: false,
    solution: false,
    moveToPromote: null,
    movePlaying: null,
    flipped: false,
    failed: false,
    soundOn: getSetting("sound"),
    showIndicatorOnHover: getSetting("showIndicatorOnHover"),
  };

  sequenceData.subscribe((newSeqData) => {
    if (newSeqData && !newSeqData?.finished) {
      loadSeq(newSeqData);
    }
  });

  controlLog.subscribe(({ lastControl }) => {
    if (lastControl == "back") {
      handleBackButton();
      return;
    }
    if (lastControl == "next") {
      handleNextButton();
      return;
    }
    if (lastControl == "hint") {
      handleHintButton();
      return;
    }
    if (lastControl == "solution") {
      handleSolutionButton();
      return;
    }
    if (lastControl == "flip") {
      handleFlipButton();
      return;
    }
    if (lastControl == "retry") {
      handleRetryLastMoveButton();
      return;
    }
  });

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

  function playAudio(audioBuffer) {
    if (browser) {
      let source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }
  }

  async function loadSeq(seqData) {
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
    $board.load(currentSequence.start);
    updateBoard();
    await timeout(100);
    await movePiece(currentSequence.moves[0]);
    updateBoard();
  }

  function finish() {
    currentSequence.finished = true;
    display.disabled = true;
    // dispatch event and return stats
    dispatch("finish", currentSequence.stats);
  }

  function resetHighlights() {
    // resets highlights and hints

    display.highlightedSquares = [];
  }

  function resetHints() {
    display.hint = false;
    display.solution = false;
  }

  function resetSequence() {
    // reset seq and board
    $board.load(currentSequence.start);
    display.disabled = false;
    resetHighlights();
    resetHints();
    currentSequence.failed = false;
    currentSequence.finished = false;
  }

  function updateBoard() {
    resetHighlights();
    // $board = $board; //trigger re render
    display.board = $board.chess.board();
  }

  function getSquareName(row, col) {
    // convert row and col to square notation
    return `${String.fromCharCode("a".charCodeAt(0) + col)}${
      8 - row
    }`;
  }

  async function movePiece(move, duration = 0.1) {
    if (display.soundOn) {
      if ($board.chess.get(move.substring(2, 4))) {
        playAudio(captureBuffer);
      } else playAudio(moveBuffer);
    }

    resetHints();
    // play animation
    display.movePlaying = move;

    $board.makeMove(move);
    await timeout(duration * 1000);
    display.movePlaying = null;
  }

  async function updateSequence(move = null) {
    // makes the move and updates the currentSequence object
    // if not move provided, it will execute the next move in the sequence

    // get the expected move
    const expectedMove = currentSequence.moves[$board.history.length];

    // Check if a move is provided and validate it
    if (move) {
      //compare move to expected move
      await movePiece(move);
      updateBoard();
      if (move === expectedMove) {
        // correct move
        if ($board.history.length !== currentSequence.moves.length) {
          await timeout(250);
          await updateSequence(); // auto move opposing side if not finished
          return;
        }
      } else {
        // wrong move

        // check if checkmate (somtimes there are 2 answers for the last move)
        if ($board.chess.isCheckmate()) {
          finish();
        } else {
          display.disabled = true;
          currentSequence.failed = true;
          currentSequence.stats.timesFailed++;
        }
      }
    } else {
      // auto move
      await movePiece(expectedMove);
      if ($board.history.length == currentSequence.length - 2) {
        console.error(`step out of range: ${$board.history.length}`);
      }
      updateBoard();
    }

    if (
      $board.history.length === currentSequence.moves.length &&
      !currentSequence.failed
    ) {
      // finished
      finish();
    }

    return true;
  }

  async function handleMoveClick(move, promoteToPiece = "") {
    if (!promoteToPiece & $board.checkIfPromotion(move)) {
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
    if (display.disabled || $board.movesBack) return;
    if (display.highlightedSquares.length == 0) {
      // select the piece and highlight possible moves
      display.highlightedSquares = $board.getPossibleMoves(id);
      if (display.highlightedSquares.length)
        display.selectedSquare = id;
    } else if (display.highlightedSquares.includes(id)) {
      handleMoveClick(display.selectedSquare + id);
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
    $board.showPrevMove();
    updateBoard();
  }

  function handleNextButton() {
    $board.showNextMove();
    updateBoard();
  }

  function handleFlipButton() {
    display.flipped = !display.flipped;
  }

  function handleRetryLastMoveButton() {
    display.disabled = false;
    currentSequence.failed = false;
    $board.returnToCurrentMove();
    $board.undoMove();
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
              id={getSquareName(rowNum, colNum)}
              squareColor={$board.chess.squareColor(
                getSquareName(rowNum, colNum)
              )}
              highlighted={display.highlightedSquares.includes(
                getSquareName(rowNum, colNum)
              )}
              {square}
              {handlePieceClick}
              hint={display.hint &&
                currentSequence?.moves[
                  $board.history.length
                ].substring(0, 2) == getSquareName(rowNum, colNum)}
              solution={display.solution &&
                currentSequence?.moves[
                  $board.history.length
                ].substring(2, 4) == getSquareName(rowNum, colNum)}
              lastMove={$board.movesBack == 0 &&
                ($board.lastMove?.substring(0, 2) ==
                  getSquareName(rowNum, colNum) ||
                  $board.lastMove?.substring(2, 4) ==
                    getSquareName(rowNum, colNum))}
              order={display.flipped
                ? 63 - (rowNum * 8 + colNum)
                : rowNum * 8 + colNum}
              flipped={display.flipped}
              moveTo={display.movePlaying
                ? display.movePlaying.substring(0, 2) ==
                  getSquareName(rowNum, colNum)
                  ? display.movePlaying.substring(2, 4)
                  : null
                : null}
              showIndicatorOnHover={display.showIndicatorOnHover}
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
            href={`https://lichess.org/analysis/standard/${$board.chess.fen()}?color=${
              currentSequence.start.split(" ")[1] === "w"
                ? "black"
                : "white"
            }`}
            target="_blank"
          >
            <button class="analyze" title="analyze in lichess"
              ><Svg
                name="search"
                color="var(--background-alt)"
              /></button
            >
          </a>
        </div>
        <BoardControls
          showRetryLastMove={currentSequence?.failed}
          showHint={!currentSequence?.finished &&
            !currentSequence?.failed &&
            !display?.hint &&
            $board.movesBack == 0}
          showSol={!currentSequence?.finished &&
            !currentSequence?.failed &&
            display?.hint &&
            !display.solution}
          flashingNext={$board.movesBack > 0}
        />
        <div class="after">
          <slot name="after" />
        </div>
      </div>
    </div>
  </div>
</div>
