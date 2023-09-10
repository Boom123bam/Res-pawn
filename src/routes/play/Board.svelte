<script>
  import { Chess } from "chess.js";
  import Square from "./Square.svelte";
  import "./board.css";

  const pointsToDeduct = {
    hint: 1,
    solution: 3,
    fail: 2,
  };

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
    deductedPoints: 0, // deduct points for each hint, move-reveal, fail
    hint: false,
    solution: false,
  };

  const chess = currentSequence
    ? new Chess(currentSequence.start)
    : new Chess();
  const displayer = new Chess();

  let board = {
    board: chess.board(),
    highlightedSquares: [],
    selectedSquare: null,
    movesBack: 0,
    disabled: false,
    flipped: currentSequence?.start.split(" ")[1] === "b", // flip board if black is first
  };

  function resetBoard(disable = null, resetHintSol = false) {
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
      // user got the sequence wrong, show the last move in displayer
      resetBoard(true, true);
      displayer.load(currentSequence.failed);
      board.board = displayer.board();
    } else if (board.movesBack) {
      //switch to history mode
      resetBoard(true, true);
      loadMovesBack(board.movesBack);
      board.board = displayer.board();
    } else {
      if (
        board.disabled &&
        (!currentSequence ||
          (!currentSequence.failed && !currentSequence.finished))
      ) {
        //switch to normal mode
        board.disabled = false;
      }
      board.board = chess.board();
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
        // wrong move
        board.movesBack = -1;
        displayer.load(chess.fen());
        movePiece(move, true);
        resetBoard(true);
        currentSequence.failed = displayer.fen();
        currentSequence.deductedPoints += pointsToDeduct.fail;
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
    }

    return true;
  }

  function resetSequence() {
    // reset seq and board
    chess.load(currentSequence.start);
    resetBoard(false, true);
    board.movesBack = 0;
    currentSequence.step = 0;
    currentSequence.failed = false;
    currentSequence.finished = false;
    currentSequence.deductedPoints = 0;
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
    if (board.disabled) return;
    if (board.highlightedSquares.length == 0) {
      // select the piece and highlight possible moves
      board.highlightedSquares = getMoves(id);
      if (board.highlightedSquares.length) board.selectedSquare = id;
    } else if (board.highlightedSquares.includes(id)) {
      // check if there is a sequence
      if (currentSequence) {
        if (updateSequence({ from: board.selectedSquare, to: id })) {
          // correct move, move piece, and move the opposing side
          movePiece({ from: board.selectedSquare, to: id });
          updateSequence();
        }
        resetBoard(null, true);
        updateBoard();
      } else {
        // no sequence, move piece
        movePiece({ from: board.selectedSquare, to: id });
        updateBoard();
      }
      resetBoard();
    } else {
      // un-select and un-highlight
      resetBoard();
    }
  }
</script>

<div class="board-wrapper">
  <div class={`board${board.flipped ? " flipped" : " normal"}`}>
    {#each board.board as row, rowNum}
      {#each row as square, colNum}
        <Square
          id={getSquare(rowNum, colNum)}
          squareColor={chess.squareColor(getSquare(rowNum, colNum))}
          highlighted={board.highlightedSquares.includes(
            getSquare(rowNum, colNum)
          )}
          {square}
          {handlePieceClick}
          hint={currentSequence?.hint &&
            currentSequence?.moves[currentSequence?.step].from ==
              getSquare(rowNum, colNum)}
          solution={currentSequence?.solution &&
            currentSequence?.moves[currentSequence?.step].to ==
              getSquare(rowNum, colNum)}
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
        if (board.movesBack < chess.history().length) {
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
          currentSequence.deductedPoints += pointsToDeduct.hint;
        }}>hint</button
      >
    {/if}

    {#if !currentSequence?.finished && !currentSequence?.failed && currentSequence?.hint && !currentSequence.solution}
      <button
        on:click={() => {
          currentSequence.solution = true;
          currentSequence.deductedPoints += pointsToDeduct.solution;
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
