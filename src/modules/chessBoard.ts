import { Chess, Square } from "chess.js";

export class ChessBoard {
  history: string[] = [];
  movesBack = 0;
  chess: Chess = new Chess();

  constructor(fen = null) {}

  load(fen) {
    this.history = [];
    this.movesBack = 0;
    this.chess.load(fen);
  }

  makeMove(move: string) {
    if (this.movesBack == 0) this.history.push(move);
    this.chess.move(move);
  }

  getPossibleMoves(square: Square) {
    return this.chess
      .moves({
        square,
        verbose: true,
      })
      .map((move) => {
        return move.to;
      });
  }

  checkIfPromotion(move) {
    // check if the move is promotion
    // if moveTo is last row and if piece is pawn
    const piece = this.chess.get(move.substring(0, 2));
    if (
      piece.type == "p" &&
      ((move[3] == "1" && piece.color == "b") ||
        (move[3] == "8" && piece.color == "w"))
    ) {
      return true;
    }
    return false;
  }

  showPrevMove() {
    if (this.history.length > this.movesBack) {
      this.movesBack = this.movesBack + 1;
      this.chess.undo();
      return this.history[this.history.length - this.movesBack];
    }
    return null;
  }
  showNextMove() {
    if (this.movesBack > 0) {
      const move = this.history[this.history.length - this.movesBack];
      this.makeMove(move);
      this.movesBack = this.movesBack - 1;
      return move;
    }
    return null;
  }

  undoMove() {
    if (!this.history.length) throw Error("no moves to undo");
    this.history.pop();
    this.chess.undo();
  }
}
