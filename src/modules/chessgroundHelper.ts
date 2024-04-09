import { type Key } from 'chessground/types';
import { Chess, SQUARES } from 'chess.js';

export function toDests(chess: Chess): Map<Key, Key[]> {
    const dests = new Map();
    SQUARES.forEach((s) => {
        const ms = chess.moves({ square: s, verbose: true });
        if (ms.length)
            dests.set(
                s,
                ms.map((m) => m.to)
            );
    });
    return dests;
}
