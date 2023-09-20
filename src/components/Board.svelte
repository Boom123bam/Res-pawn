<script>
  import { Chess } from "chess.js";
  import Square from "./Square.svelte";
  import { sequenceData } from "./boardStore";
  import "./board.css";
  import Promotion from "./Promotion.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let currentSequence = null;

  let board = {
    chess: new Chess(),
    displayer: new Chess(),
    board: null,
    highlightedSquares: [],
    selectedSquare: null,
    movesBack: 0,
    disabled: false,
    flipped: false,
    moveToPromote: "",
  };
  board.board = board.chess.board();

  sequenceData.subscribe((newSeqData) => {
    if (newSeqData && !newSeqData?.finished) {
      handleSeqLoad(newSeqData);
    }
  });

  function handleSeqLoad(seqData) {
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
    (board.flipped = currentSequence.start.split(" ")[1] === "b"), // flip board if black is first
      resetSequence();
    updateBoard();
  }

  function resetSequence() {
    // reset seq and board
    board.chess.load(currentSequence.start);
    resetBoardHighlights(false, true);
    board.movesBack = 0;
    currentSequence.step = 0;
    currentSequence.failed = false;
    currentSequence.finished = false;
    currentSequence.deductedPoints = 0;
    updateBoard();
  }

  function resetBoardHighlights(
    disable = null,
    resetHintSol = false
  ) {
    // resets highlights and hints
    board.highlightedSquares = [];
    board.selectedSquare = null;
    if (disable != null) {
      board.disabled = disable;
    }
    if (resetHintSol) {
      currentSequence.hint = false;
      currentSequence.solution = false;
    }
  }

  function updateBoard() {
    if (board.movesBack == -1) {
      // user got the sequence wrong, show the last move in board.displayer
      resetBoardHighlights(true, true);
      board.displayer.load(currentSequence.failed);
      board.board = board.displayer.board();
    } else if (board.movesBack) {
      //switch to history mode
      resetBoardHighlights(true, true);
      loadMovesBack(board.movesBack);
      board.board = board.displayer.board();
    } else {
      if (
        board.disabled &&
        (!currentSequence ||
          (!currentSequence.failed && !currentSequence.finished))
      ) {
        //switch to normal mode
        board.disabled = false;
      }
      board.board = board.chess.board();
    }
  }

  function getSquare(row, col) {
    // convert row and col to square notation
    return `${String.fromCharCode("a".charCodeAt(0) + col)}${
      8 - row
    }`;
  }

  function checkIfPromotion(move) {
    // check if the move is promotion
    // if moveTo is last row and if piece is pawn

    const piece = board.chess.get(move.substring(0, 2));
    if (
      piece.type == "p" &&
      ((move[3] == "1" && piece.color == "b") ||
        (move[3] == "8" && piece.color == "w"))
    ) {
      return true;
    }
    return false;
  }

  function movePiece(move, useDisplayer = false) {
    if (!useDisplayer) board.chess.move(move);
    else board.displayer.move(move);
  }

  function updateSequence(move = null) {
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
      movePiece(expectedMove);
      currentSequence.step++;
    }

    if (currentSequence.step === currentSequence.moves.length) {
      // finished
      currentSequence.finished = true;
      board.disabled = true;
      // dispatch event and return stats
      dispatch("finish", currentSequence.stats);
    }

    return true;
  }

  function loadMovesBack(movesBack) {
    const history = board.chess.history({ verbose: true });
    board.displayer.load(history[history.length - movesBack].before);
  }

  function getMoves(square) {
    // get valid moves for a square
    return board.chess
      .moves({
        square,
        verbose: true,
      })
      .map((move) => {
        return move.to;
      });
  }

  function handleMoveClick(move, promotion = "") {
    // if the move is a promotion
    if (!promotion & checkIfPromotion(move)) {
      board.moveToPromote = move;
      return;
    }

    move = move + promotion;
    if (currentSequence) {
      if (updateSequence(move)) {
        // correct move, move piece
        movePiece(move);
        updateSequence(); // auto move opposing side
      } else {
        board.movesBack = -1;
        board.displayer.load(board.chess.fen());
        movePiece(move, true);
        resetBoardHighlights(true);
        currentSequence.failed = board.displayer.fen();
        currentSequence.stats.timesFailed++;
      }
      resetBoardHighlights(null, true);
      updateBoard();
    } else {
      // no sequence, move piece
      movePiece(move);
      updateBoard();
    }
  }

  function handlePieceClick(id) {
    if (board.disabled) return;
    if (board.highlightedSquares.length == 0) {
      // select the piece and highlight possible moves
      board.highlightedSquares = getMoves(id);
      if (board.highlightedSquares.length) board.selectedSquare = id;
    } else if (board.highlightedSquares.includes(id)) {
      handleMoveClick(board.selectedSquare + id);
      // check if there is a sequence
      resetBoardHighlights();
    } else {
      // un-select and un-highlight
      resetBoardHighlights();
    }
  }

  function handlePromotion(e) {
    handleMoveClick(board.moveToPromote, e.detail);
    board.moveToPromote = "";
  }
</script>

<div class="board-component-wrapper">
  {#if board.moveToPromote}
    <Promotion on:promotion={handlePromotion} />
  {/if}
  <div class={`board${board.flipped ? " flipped" : " normal"}`}>
    {#each board.board as row, rowNum}
      {#each row as square, colNum}
        <Square
          id={getSquare(rowNum, colNum)}
          squareColor={board.chess.squareColor(
            getSquare(rowNum, colNum)
          )}
          highlighted={board.highlightedSquares.includes(
            getSquare(rowNum, colNum)
          )}
          {square}
          {handlePieceClick}
          hint={currentSequence?.hint &&
            currentSequence?.moves[currentSequence?.step].substring(
              0,
              2
            ) == getSquare(rowNum, colNum)}
          solution={currentSequence?.solution &&
            currentSequence?.moves[currentSequence?.step].substring(
              2,
              4
            ) == getSquare(rowNum, colNum)}
          order={board.flipped
            ? 63 - (rowNum * 8 + colNum)
            : rowNum * 8 + colNum}
          flipped={board.flipped}
        />
      {/each}
    {/each}
  </div>

  <div class="buttons">
    <button on:click={resetSequence}>reset</button>
    <button
      on:click={() => {
        if (board.movesBack < board.chess.history().length) {
          board.movesBack++;
          updateBoard();
        }
      }}>back</button
    >
    <button
      on:click={() => {
        if (
          board.movesBack > 0 ||
          (board.movesBack == 0 && currentSequence?.failed)
        ) {
          board.movesBack--;
          updateBoard();
        }
      }}>next</button
    >
    <button
      on:click={() => {
        board.flipped = !board.flipped;
      }}>flip</button
    >

    {#if currentSequence?.failed}
      <button
        on:click={() => {
          board.disabled = false;
          currentSequence.failed = false;
          board.movesBack = 0;
          updateBoard();
        }}>retry last move</button
      >
    {/if}

    {#if !currentSequence?.finished && !currentSequence?.failed && !currentSequence?.hint}
      <button
        on:click={() => {
          currentSequence.hint = true;
          currentSequence.stats.hintsUsed++;
        }}>hint</button
      >
    {/if}

    {#if !currentSequence?.finished && !currentSequence?.failed && currentSequence?.hint && !currentSequence.solution}
      <button
        on:click={() => {
          currentSequence.solution = true;
          currentSequence.stats.solsUsed++;
        }}>solution</button
      >
    {/if}

    {#if currentSequence?.finished}
      <button on:click={() => {}}>next sequence</button>
    {/if}
  </div>
</div>

<style>
</style>
