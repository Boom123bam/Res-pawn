<script>
  import "./Board.css";
  import Square from "./Square.svelte";
  import Promotion from "./Promotion.svelte";
  import {
    sequenceData,
    controlLog,
    board,
    controlsDisplayState,
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
  let currentSequenceData = null;

  // let board = new ChessBoard();
  $board = new ChessBoard();

  const boardDisplayState = {
    board: $board.chess.board(),
    highlightedSquares: [],
    selectedSquare: null,
    disabled: false,
    hint: false,
    solution: false,
    failed: false,
    finished: false,
    moveToPromote: null,
    movePlaying: null,
    flipped: false,
    failed: false,
    soundOn: getSetting("sound"),
    showIndicatorOnHover: getSetting("showIndicatorOnHover"),
  };

  $controlsDisplayState = {
    showRetryLastMove: false,
    showHint: false,
    showSol: false,
    flashingNext: false,
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
    currentSequenceData = {
      start: seqData.fen,
      moves: seqData.moves.split(" "),
      stats: {
        hintsUsed: 0,
        solsUsed: 0,
        timesFailed: 0,
      },
    };
    boardDisplayState.flipped =
      currentSequenceData.start.split(" ")[1] === "w"; // flip board if black is first
    resetSequence();
    $board.load(currentSequenceData.start);
    updateBoard();
    await timeout(100);
    await movePiece(currentSequenceData.moves[0]);
    updateBoard();
  }

  function finish() {
    boardDisplayState.finished = true;
    boardDisplayState.disabled = true;
    // dispatch event and return stats
    dispatch("finish", currentSequenceData.stats);
    updateControlsDisplayState();
  }

  function updateControlsDisplayState() {
    console.log("update");
    $controlsDisplayState = {
      showRetryLastMove: boardDisplayState?.failed,
      showHint:
        !boardDisplayState?.finished &&
        !boardDisplayState?.failed &&
        !boardDisplayState?.hint &&
        $board.movesBack == 0,
      showSol:
        !boardDisplayState?.finished &&
        !boardDisplayState?.failed &&
        boardDisplayState?.hint &&
        !boardDisplayState.solution,
      flashingNext: $board.movesBack > 0,
    };
    console.log($controlsDisplayState);
  }

  function resetHighlights() {
    // resets highlights and hints

    boardDisplayState.highlightedSquares = [];
  }

  function resetHints() {
    boardDisplayState.hint = false;
    boardDisplayState.solution = false;
  }

  function resetSequence() {
    // reset seq and board
    $board.load(currentSequenceData.start);
    boardDisplayState.disabled = false;
    resetHighlights();
    resetHints();
    boardDisplayState.failed = false;
    boardDisplayState.finished = false;
  }

  function updateBoard() {
    resetHighlights();
    $board = $board; //trigger re render
    boardDisplayState.board = $board.chess.board();
    updateControlsDisplayState();
  }

  function getSquareName(row, col) {
    // convert row and col to square notation
    return `${String.fromCharCode("a".charCodeAt(0) + col)}${
      8 - row
    }`;
  }

  async function movePiece(move, duration = 0.1) {
    if (boardDisplayState.soundOn) {
      if ($board.chess.get(move.substring(2, 4))) {
        playAudio(captureBuffer);
      } else playAudio(moveBuffer);
    }

    resetHints();
    // play animation
    boardDisplayState.movePlaying = move;

    $board.makeMove(move);
    await timeout(duration * 1000);
    boardDisplayState.movePlaying = null;
  }

  async function updateSequence(move = null) {
    // makes the move and updates the currentSequence object
    // if not move provided, it will execute the next move in the sequence

    // get the expected move
    const expectedMove =
      currentSequenceData.moves[$board.history.length];

    // Check if a move is provided and validate it
    if (move) {
      //compare move to expected move
      await movePiece(move);
      updateBoard();
      if (move === expectedMove) {
        // correct move
        if (
          $board.history.length !== currentSequenceData.moves.length
        ) {
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
          boardDisplayState.disabled = true;
          boardDisplayState.failed = true;
          currentSequenceData.stats.timesFailed++;
        }
      }
    } else {
      // auto move
      await movePiece(expectedMove);
      if ($board.history.length == currentSequenceData.length - 2) {
        console.error(`step out of range: ${$board.history.length}`);
      }
      updateBoard();
    }

    if (
      $board.history.length === currentSequenceData.moves.length &&
      !boardDisplayState.failed
    ) {
      // finished
      finish();
    }

    return true;
  }

  async function handleMoveClick(move, promoteToPiece = "") {
    if (!promoteToPiece & $board.checkIfPromotion(move)) {
      // if the move is a promotion
      boardDisplayState.moveToPromote = move;
      return;
    }

    move += promoteToPiece;
    if (currentSequenceData) {
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
    if (boardDisplayState.disabled || $board.movesBack) return;
    if (boardDisplayState.highlightedSquares.length == 0) {
      // select the piece and highlight possible moves
      boardDisplayState.highlightedSquares =
        $board.getPossibleMoves(id);
      if (boardDisplayState.highlightedSquares.length)
        boardDisplayState.selectedSquare = id;
    } else if (boardDisplayState.highlightedSquares.includes(id)) {
      handleMoveClick(boardDisplayState.selectedSquare + id);
      // check if there is a sequence
    } else {
      // un-select and un-highlight
      resetHighlights();
    }
  }

  function handlePromotion(e) {
    handleMoveClick(boardDisplayState.moveToPromote, e.detail);
    boardDisplayState.moveToPromote = "";
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
    boardDisplayState.flipped = !boardDisplayState.flipped;
  }

  function handleRetryLastMoveButton() {
    boardDisplayState.disabled = false;
    boardDisplayState.failed = false;
    $board.returnToCurrentMove();
    $board.undoMove();
    updateBoard();
  }

  function handleHintButton() {
    boardDisplayState.hint = true;
    currentSequenceData.stats.hintsUsed++;
    updateControlsDisplayState();
  }

  function handleSolutionButton() {
    boardDisplayState.solution = true;
    currentSequenceData.stats.solsUsed++;
    updateControlsDisplayState();
  }
</script>

<div class="board-component-wrapper">
  <div class="board-wrapper">
    {#if boardDisplayState.moveToPromote}
      <Promotion
        on:promotion={handlePromotion}
        color={board.chess.get(
          boardDisplayState.moveToPromote.substring(0, 2)
        ).color}
      />
    {/if}
    <div class="board-padding">
      <div
        class={`board${
          boardDisplayState.flipped ? " flipped" : " normal"
        }`}
      >
        {#each boardDisplayState.board as row, rowNum}
          {#each row as square, colNum}
            <Square
              id={getSquareName(rowNum, colNum)}
              squareColor={$board.chess.squareColor(
                getSquareName(rowNum, colNum)
              )}
              highlighted={boardDisplayState.highlightedSquares.includes(
                getSquareName(rowNum, colNum)
              )}
              {square}
              {handlePieceClick}
              hint={boardDisplayState.hint &&
                currentSequenceData?.moves[
                  $board.history.length
                ].substring(0, 2) == getSquareName(rowNum, colNum)}
              solution={boardDisplayState.solution &&
                currentSequenceData?.moves[
                  $board.history.length
                ].substring(2, 4) == getSquareName(rowNum, colNum)}
              lastMove={$board.movesBack == 0 &&
                ($board.lastMove?.substring(0, 2) ==
                  getSquareName(rowNum, colNum) ||
                  $board.lastMove?.substring(2, 4) ==
                    getSquareName(rowNum, colNum))}
              order={boardDisplayState.flipped
                ? 63 - (rowNum * 8 + colNum)
                : rowNum * 8 + colNum}
              flipped={boardDisplayState.flipped}
              moveTo={boardDisplayState.movePlaying
                ? boardDisplayState.movePlaying.substring(0, 2) ==
                  getSquareName(rowNum, colNum)
                  ? boardDisplayState.movePlaying.substring(2, 4)
                  : null
                : null}
              showIndicatorOnHover={boardDisplayState.showIndicatorOnHover}
            />
          {/each}
        {/each}
      </div>
    </div>
  </div>
</div>
