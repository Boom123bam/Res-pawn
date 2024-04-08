<script>
    import './Board.css';
    import Promotion from './Promotion.svelte';
    import {
        sequenceData,
        controlLog,
        board,
        controlsDisplayState,
    } from '../stores/boardStore';
    import { getSetting } from '../modules/localStorage';
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { ChessBoard } from '../modules/chessBoard';
    import { onMount } from 'svelte';
    import { Chessground } from 'chessground';
    import { toDests } from '../modules/chessgroundHelper';

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
        soundOn: getSetting('sound'),
        showIndicatorOnHover: getSetting('showIndicatorOnHover'),
    };

    $controlsDisplayState = {
        actionButton: 'hint', // hint | solution | retry
        actionButtonDisabled: false,
        flashingNext: false,
    };

    let controlLogUnsubscribe = controlLog.subscribe(({ lastControl }) => {
        if (lastControl == 'back') {
            handleBackButton();
            return;
        }
        if (lastControl == 'next') {
            handleNextButton();
            return;
        }
        if (lastControl == 'hint') {
            handleHintButton();
            return;
        }
        if (lastControl == 'solution') {
            handleSolutionButton();
            return;
        }
        if (lastControl == 'flip') {
            handleFlipButton();
            return;
        }
        if (lastControl == 'retry') {
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
            // fen: $board.chess.fen(),
            // orientation: boardDisplayState.flipped ? 'black' : 'white',
            // movable: {
            // color:
            //     currentSequenceData.start.split(' ')[1] === 'w'
            //         ? 'black'
            //         : 'white',
            // free: false,
            // dests: toDests(chess),
            // events: { after: handleMoveClick },
            // },
        });
        cg.set({
            movable: { events: { after: handleMoveClick } },
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

        window.addEventListener('resize', resizeBoard);
        requestAnimationFrame(() => {
            resizeBoard();
        });
    });

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function loadAudioBuffers() {
        if (browser) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            context = new AudioContext(); // Make it crossbrowser
            window
                .fetch('/sfx/capture.mp3')
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
                .fetch('/sfx/move.mp3')
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
            moves: seqData.moves.split(' '),
            stats: {
                hintsUsed: 0,
                solsUsed: 0,
                timesFailed: 0,
            },
        };
        boardDisplayState.flipped =
            currentSequenceData.start.split(' ')[1] === 'w'; // flip board if black is first
        resetSequence();
        $board.load(currentSequenceData.start);
        updateBoard();
        // await timeout(100);
        await movePiece(currentSequenceData.moves[0]);
        updateBoard();
    }

    function finish() {
        boardDisplayState.finished = true;
        boardDisplayState.disabled = true;
        // dispatch event and return stats
        dispatch('finish', currentSequenceData.stats);
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
            $controlsDisplayState.actionButton = 'retry';
            $controlsDisplayState.actionButtonDisabled = false;
            return;
        } else if (hint) {
            $controlsDisplayState.actionButton = 'hint';
            $controlsDisplayState.actionButtonDisabled = false;
            return;
        } else if (solution) {
            $controlsDisplayState.actionButton = 'solution';
            $controlsDisplayState.actionButtonDisabled = false;
            return;
        }
        $controlsDisplayState.actionButtonDisabled = true;
    }

    function resetHighlights() {
        // resets highlights and hints
        cg.set({
            highlight: {
                custom: undefined,
            },
        });
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
        console.log('update');
        resetHighlights();
        console.log(cg.state);
        cg.set({
            fen: $board.chess.fen(),
            orientation: boardDisplayState.flipped ? 'black' : 'white',
            turnColor:
                currentSequenceData.start.split(' ')[1] === 'w'
                    ? 'black'
                    : 'white',
            movable: {
                color:
                    currentSequenceData.start.split(' ')[1] === 'w'
                        ? 'black'
                        : 'white',
                free: false,
                dests: toDests($board.chess),
            },
        });
        $board = $board; //trigger re render
        boardDisplayState.board = $board.chess.board();
        updateControlsDisplayState();
    }

    function getSquareName(row, col) {
        // convert row and col to square notation
        return `${String.fromCharCode('a'.charCodeAt(0) + col)}${8 - row}`;
    }

    async function movePiece(move, duration = 0.1) {
        console.log('move');
        if (boardDisplayState.soundOn) {
            if ($board.chess.get(move.substring(2, 4))) {
                playAudio(captureBuffer);
            } else playAudio(moveBuffer);
        }

        resetHints();
        // play animation
        // boardDisplayState.movePlaying = move;

        cg.move(move.substring(0, 2), move.substring(2, 4));
        console.log(move);
        $board.makeMove(move);
        await timeout(duration * 1000);
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

    async function handleMoveClick(from, to) {
        // TODO fix promotion
        let move = from + to;
        // if (!promoteToPiece & $board.checkIfPromotion(move)) {
        //     // if the move is a promotion
        //     boardDisplayState.moveToPromote = move;
        //     return;
        // }

        // move += promoteToPiece;
        if (currentSequenceData) {
            resetHints();
            await updateSequence(move);
        }
    }

    function handlePromotion(e) {
        handleMoveClick(boardDisplayState.moveToPromote, e.detail);
        boardDisplayState.moveToPromote = '';
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
        let square = currentSequenceData?.moves[
            $board.history.length
        ].substring(0, 2);

        cg.set({
            highlight: {
                custom: new Map([[square, 'highlight']]),
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
                    [square1, 'highlight'],
                    [square2, 'highlight'],
                ]),
            },
        });
        currentSequenceData.stats.solsUsed++;
        updateControlsDisplayState();
    }
</script>

<div class="board-component-wrapper blue california">
    <div class="board-wrapper">
        <div class="board-padding shadow">
            <div bind:this={boardWrapper} class="board-inner-wrapper">
                <div bind:this={chessboard} class="board" />
            </div>
        </div>
    </div>
</div>
