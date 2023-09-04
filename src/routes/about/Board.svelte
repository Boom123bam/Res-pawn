<script>
  import { Chess } from "chess.js";
  import Square from "./Square.svelte";
  import "./board.css";

  // const currentSequence = null;
  const currentSequence = {
    start:
      "rnbqkbnr/1ppppppp/p7/8/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 0 1",
    moves: [
      { from: "e2", to: "e4" },
      { from: "e7", to: "e5" },
      { from: "f2", to: "f4" },
      { from: "f7", to: "f5" },
    ],
    step: 0,
    failed: false,
    finished: false,
  };

  const chess = currentSequence
    ? new Chess(currentSequence.start)
    : new Chess();
  const displayer = new Chess();

  let board = chess.board();
  let highlightedSquares = [];
  let selectedSquare = null;
  let movesBack = 0;
  let boardDisabled = false;

  function updateBoard() {
    if (movesBack == -1) {
      highlightedSquares = [];
      selectedSquare = null;
      boardDisabled = true;
      displayer.load(currentSequence.failed);
      board = displayer.board();
    } else if (movesBack) {
      //switch to history mode
      highlightedSquares = [];
      selectedSquare = null;
      loadMovesBack(movesBack);
      boardDisabled = true;
      board = displayer.board();
    } else {
      if (
        boardDisabled &&
        (!currentSequence ||
          (!currentSequence.failed && !currentSequence.finished))
      ) {
        //switch to normal mode
        boardDisabled = false;
      }
      board = chess.board();
    }
  }

  function getSquare(row, col) {
    // convert row and col to square notation
    return `${String.fromCharCode("a".charCodeAt(0) + col)}${
      8 - row
    }`;
  }

  function movePiece(move, useDisplayer = false) {
    if (!useDisplayer) chess.move(`${move.from}-${move.to}`);
    else displayer.move(`${move.from}-${move.to}`);
  }

  function updateSequence(move = null) {
    // updates the currentSequence object based on the move recieved
    // if not move provided, it will execute the next move in the sequence

    // get the expected move
    const expectedMove = currentSequence.moves[currentSequence.step];

    // Check if a move is provided and validate it
    if (move) {
      //compare move to expected move
      if (JSON.stringify(move) === JSON.stringify(expectedMove)) {
        // correct move
        currentSequence.step++;
      } else {
        // failed
        movesBack = -1;
        displayer.load(chess.fen());
        movePiece(move, true);
        boardDisabled = true;
        currentSequence.failed = displayer.fen();
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
      boardDisabled = true;
    }

    return true;
  }

  function resetSequence() {
    // reset seq and board
    chess.load(currentSequence.start);
    highlightedSquares = [];
    selectedSquare = null;
    movesBack = 0;
    boardDisabled = false;
    currentSequence.step = 0;
    currentSequence.failed = false;
    currentSequence.finished = false;
    updateBoard();
  }

  function loadMovesBack(movesBack) {
    const history = chess.history({ verbose: true });
    displayer.load(history[history.length - movesBack].before);
  }

  function getMoves(square) {
    // get valid moves for a square
    return chess
      .moves({
        square,
        verbose: true,
      })
      .map((move) => {
        return move.to;
      });
  }

  function handlePieceClick(id) {
    if (boardDisabled) return;
    if (highlightedSquares.length == 0) {
      // select the piece and highlight possible moves
      highlightedSquares = getMoves(id);
      if (highlightedSquares.length) selectedSquare = id;
    } else if (highlightedSquares.includes(id)) {
      // check if there is a sequence
      if (currentSequence) {
        if (!updateSequence({ from: selectedSquare, to: id })) {
          // wrong move
          updateBoard();
        } else {
          // correct move, move piece, and move the opposing side
          movePiece({ from: selectedSquare, to: id });
          updateSequence();
          updateBoard();
        }
      } else {
        // no sequence, move piece
        movePiece({ from: selectedSquare, to: id });
        updateBoard();
      }
      highlightedSquares = [];
      selectedSquare = null;
    } else {
      // un-select and un-highlight
      highlightedSquares = [];
      selectedSquare = null;
    }
  }
</script>

<div class="board">
  {#each board as row, rowNum}
    {#each row as square, colNum}
      <Square
        id={getSquare(rowNum, colNum)}
        squareColor={chess.squareColor(getSquare(rowNum, colNum))}
        highlighted={highlightedSquares.includes(
          getSquare(rowNum, colNum)
        )}
        {square}
        {handlePieceClick}
      />
    {/each}
  {/each}
</div>
<button on:click={resetSequence}>reset</button>
<button
  on:click={() => {
    if (movesBack < chess.history().length) {
      movesBack++;
      updateBoard();
    }
  }}>back</button
>
<button
  on:click={() => {
    if (
      movesBack > 0 ||
      (movesBack == 0 && currentSequence?.failed)
    ) {
      movesBack--;
      updateBoard();
    }
  }}>next</button
>

{#if currentSequence?.failed}
  <button
    on:click={() => {
      boardDisabled = false;
      currentSequence.failed = false;
      movesBack = 0;
      updateBoard();
    }}>retry last move</button
  >
{/if}

{#if !currentSequence?.finished && !currentSequence?.failed}
  <button on:click={() => {}}>hint</button>
{/if}

{#if currentSequence?.finished}
  <button on:click={() => {}}>next sequence</button>
{/if}

<style>
</style>
