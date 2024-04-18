<script>
    import "./Board.css";
    import Promotion from "./Promotion.svelte";
    import {
        sequenceData,
        controlLog,
        board,
        controlsDisplayState,
    } from "../stores/boardStore";
    import { getSetting } from "../modules/localStorage";
    import { createEventDispatcher, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { ChessBoard } from "../modules/chessBoard";
    import { onMount } from "svelte";
    import { Chessground } from "chessground";
    import { toDests } from "../modules/chessgroundHelper";

    // audio
    let moveBuffer;
    let captureBuffer;
    let context;
    loadAudioBuffers();

    const dispatch = createEventDispatcher();
    let currentSequenceData = null;

    onDestroy(() => {
        sequenceDataUnsubscribe();
        controlLogUnsubscribe();
        $sequenceData = null;
        controlLog.reset();
    });
    // let board = new ChessBoard();
    $board = new ChessBoard();

    const boardDisplayState = {
        board: $board.chess.board(),
        selectedSquare: null,
        hint: false,
        solution: false,
        failed: false,
        finished: false,
        moveToPromote: null,
        flipped: false,
        soundOn: getSetting("sound"),
    };

    $controlsDisplayState = {
        actionButton: "hint", // hint | solution | retry
        actionButtonDisabled: false,
        flashingNext: false,
    };

    let controlLogUnsubscribe = controlLog.subscribe(({ lastControl }) => {
        switch (lastControl) {
            case "back":
                handleBackButton();
                return;
            case "next":
                handleNextButton();
                return;
            case "hint":
                handleHintButton();
                return;
            case "solution":
                handleSolutionButton();
                return;
            case "flip":
                handleFlipButton();
                return;
            case "retry":
                handleRetryLastMoveButton();
                return;
        }
    });

    let chessboard;
    let boardWrapper;
    let cg;
    let sequenceDataUnsubscribe;

    onMount(() => {
        cg = Chessground(chessboard, {
            movable: {
                free: false,
                events: {
                    after: handleMove,
                },
            },
        });

        sequenceDataUnsubscribe = sequenceData.subscribe((newSeqData) => {
            if (newSeqData && !newSeqData?.finished) {
                loadSeq(newSeqData);
            }
        });

        const resizeBoard = () => {
            const mod = boardWrapper.clientWidth % 8;
            let boardSize = boardWrapper.clientWidth - mod;
            chessboard.style.height = `${boardSize}px`;
            chessboard.style.width = `${boardSize}px`;
        };

        window.addEventListener("resize", resizeBoard);
        resizeBoard();
    });

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function loadAudioBuffers() {
        if (browser) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
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
            color: seqData.fen.split(" ")[1] === "w" ? "black" : "white",
            moves: seqData.moves.split(" "),
            stats: {
                hintsUsed: 0,
                solsUsed: 0,
                timesFailed: 0,
            },
        };
        boardDisplayState.flipped = currentSequenceData.color === "black"; // flip board if black is first
        resetSequence();
        $board.load(currentSequenceData.start);
        cg.set({
            turnColor: currentSequenceData.color,
            movable: {
                color: currentSequenceData.color,
            },
        });
        updateBoard();
        await movePiece(currentSequenceData.moves[0]);
        updateBoard();
    }

    function finish() {
        boardDisplayState.finished = true;
        // dispatch event and return stats
        dispatch("finish", currentSequenceData.stats);
        updateControlsDisplayState();
    }

    function updateControlsDisplayState() {
        const [retry, hint, solution] = [
            boardDisplayState?.failed,
            !boardDisplayState?.finished &&
                !boardDisplayState?.failed &&
                !boardDisplayState?.hint &&
                $board.movesBack == 0,
            !boardDisplayState?.finished &&
                !boardDisplayState?.failed &&
                boardDisplayState?.hint &&
                !boardDisplayState.solution,
        ];
        $controlsDisplayState.flashingNext = $board.movesBack > 0 && !retry;

        if (retry) {
            $controlsDisplayState.actionButton = "retry";
            $controlsDisplayState.actionButtonDisabled = false;
            return;
        } else if (hint) {
            $controlsDisplayState.actionButton = "hint";
            $controlsDisplayState.actionButtonDisabled = false;
            return;
        } else if (solution) {
            $controlsDisplayState.actionButton = "solution";
            $controlsDisplayState.actionButtonDisabled = false;
            return;
        }
        $controlsDisplayState.actionButtonDisabled = true;
    }

    function resetHints() {
        boardDisplayState.hint = false;
        boardDisplayState.solution = false;
        cg.set({
            highlight: {
                custom: undefined,
            },
        });
    }

    function resetSequence() {
        // reset seq and board
        $board.load(currentSequenceData.start);
        resetHints();
        boardDisplayState.failed = false;
        boardDisplayState.finished = false;
    }

    function updateBoard() {
        cg.set({
            turnColor: currentSequenceData.color,
            fen: $board.chess.fen(),
            orientation: boardDisplayState.flipped ? "black" : "white",
            movable: {
                dests: toDests($board.chess),
            },
        });
        $board = $board; //trigger re render
        boardDisplayState.board = $board.chess.board();
        updateControlsDisplayState();
    }

    async function movePiece(move) {
        if (boardDisplayState.soundOn) {
            if ($board.chess.get(move.substring(2, 4))) {
                playAudio(captureBuffer);
            } else playAudio(moveBuffer);
        }

        resetHints();

        // play animation
        cg.move(move.substring(0, 2), move.substring(2, 4));
        $board.makeMove(move);
    }

    async function updateSequence(move = null) {
        // makes the move and updates the currentSequence object
        // if not move provided, it will execute the next move in the sequence

        // get the expected move
        const expectedMove = currentSequenceData.moves[$board.history.length];

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
                    await timeout(100);
                    await updateSequence(); // auto move opposing side if not finished
                    return;
                }
            } else {
                // wrong move

                // check if checkmate (somtimes there are 2 answers for the last move)
                if ($board.chess.isCheckmate()) {
                    finish();
                } else {
                    boardDisplayState.failed = true;
                    currentSequenceData.stats.timesFailed++;
                    updateControlsDisplayState();
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

    async function handleMove(from, to) {
        let move = from + to;
        if ($board.checkIfPromotion(move)) {
            // if the move is a promotion, show promotion menu
            boardDisplayState.moveToPromote = move;
            updateBoard();
            return;
        }

        if (currentSequenceData) {
            resetHints();
            await updateSequence(move);
        }
    }

    async function makePromotionMove(move) {
        if (currentSequenceData) {
            resetHints();
            await updateSequence(move);
        }
    }

    function handlePromotion(e) {
        makePromotionMove(boardDisplayState.moveToPromote + e.detail);
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
        updateBoard();
    }

    function handleRetryLastMoveButton() {
        boardDisplayState.failed = false;
        $board.returnToCurrentMove();
        $board.undoMove();
        updateBoard();
    }

    function handleHintButton() {
        boardDisplayState.hint = true;
        let square = currentSequenceData?.moves[
            $board.history.length
        ].substring(0, 2);

        cg.set({
            highlight: {
                custom: new Map([[square, "highlight"]]),
            },
        });
        currentSequenceData.stats.hintsUsed++;
        updateControlsDisplayState();
    }

    function handleSolutionButton() {
        boardDisplayState.solution = true;
        let square1 = currentSequenceData?.moves[
            $board.history.length
        ].substring(0, 2);
        let square2 = currentSequenceData?.moves[
            $board.history.length
        ].substring(2, 4);

        cg.set({
            highlight: {
                custom: new Map([
                    [square1, "highlight"],
                    [square2, "highlight"],
                ]),
            },
        });
        currentSequenceData.stats.solsUsed++;
        updateControlsDisplayState();
    }
</script>

<div class="board-component-wrapper blue california">
    <div class="board-wrapper">
        {#if boardDisplayState.moveToPromote}
            <Promotion
                on:promotion={handlePromotion}
                on:cancel={() => (boardDisplayState.moveToPromote = "")}
                color={$board.chess.get(
                    boardDisplayState.moveToPromote.substring(0, 2)
                ).color}
            />
        {/if}
        <div class="board-padding shadow">
            <div bind:this={boardWrapper} class="board-inner-wrapper">
                <div bind:this={chessboard} class="board" />
            </div>
        </div>
    </div>
</div>
