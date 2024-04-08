
<script>
    import "./Board.css";
    import {
        sequenceData,
        controlLog,
        board,
        controlsDisplayState,
    } from "../stores/boardStore";
    import { createEventDispatcher, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { ChessBoard } from "../modules/chessBoard";
    import { onMount } from "svelte";
    import { Chessground } from "chessground";

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

    $board = new ChessBoard();

    let chessboard
    let boardWrapper
    onMount(() => {
        const cg = Chessground(chessboard, {
            movable: {
                color: "white",
                free: false,
                // dests: toDests(chess),
            },
            draggable: {
                showGhost: true,
            },
        });
        cg.set({
            // movable: { events: { after: playOtherSide(cg, chess) } },
        });

        const resizeBoard = () => {
            const mod = boardWrapper.clientWidth % 8;
            let boardSize = boardWrapper.clientWidth - mod;
            chessboard.style.height = `${boardSize}px`;
            chessboard.style.width = `${boardSize}px`;
        };

        window.addEventListener("resize", resizeBoard);
        requestAnimationFrame(() => {
            resizeBoard();
        });
    });

    $controlsDisplayState = {
        actionButton: "hint", // hint | solution | retry
        actionButtonDisabled: false,
        flashingNext: false,
    };

    let sequenceDataUnsubscribe = sequenceData.subscribe((newSeqData) => {
        if (newSeqData && !newSeqData?.finished) {
        }
    });

    let controlLogUnsubscribe = controlLog.subscribe(({ lastControl }) => {
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
                        (error) => console.error(error),
                    ),
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
                        (error) => console.error(error),
                    ),
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

    function finish() {
        dispatch("finish", currentSequenceData.stats);
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
