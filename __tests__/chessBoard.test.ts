import { ChessBoard } from "./../src/modules/chessBoard";

describe("ChessBoard", () => {
  let chessBoard: ChessBoard;

  beforeEach(() => {
    chessBoard = new ChessBoard();
  });

  it("should initialize with an empty history", () => {
    expect(chessBoard.history).toEqual([]);
  });

  it("should make a move and update the history", () => {
    chessBoard.makeMove("e4");
    expect(chessBoard.history).toEqual(["e4"]);
  });

  it("should undo a move and update the history", () => {
    chessBoard.makeMove("e4");
    chessBoard.undoMove();
    expect(chessBoard.history).toEqual([]);
  });

  it("should throw error when undo is invalid", () => {
    expect(() => chessBoard.undoMove()).toThrow(
      Error("no moves to undo")
    );
  });
});
