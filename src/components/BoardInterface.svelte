<script>
    import { createEventDispatcher } from "svelte";
    import Board from "./Board.svelte";
    import SeqInfo from "./SeqInfo.svelte";
    import BoardControl from "./BoardControl.svelte";
    import Svg from "./Svg.svelte";
    import { controlLog } from "../stores/boardStore";

    export let seqInfo, enableNextButton;

    const dispatch = createEventDispatcher();

    function onKeyDown(e) {
        switch (e.key) {
            case "ArrowLeft":
                controlLog.setLastControl("back");
                break;
            case "ArrowRight":
                controlLog.setLastControl("next");
                break;
        }
    }
</script>

<div class="layout">
    <div class="board-container">
        <Board on:finish={(e) => dispatch("finish", e.detail)} />
    </div>

    <div class="side">
        {#if seqInfo}
            <div class="seq-info-wrapper">
                <SeqInfo
                    on:morePressed={() => dispatch("morePressed")}
                    {seqInfo}
                />
            </div>
        {/if}
        <div class="flip button-wrapper">
            <BoardControl buttonType={"flip"} />
        </div>
        <div class="hint button-wrapper">
            <BoardControl buttonType={"hint + solution + retry"} />
        </div>
        <div class="arrows button-wrapper">
            <BoardControl buttonType={"arrows"} />
        </div>
        <div class="analyse button-wrapper">
            <BoardControl buttonType={"analyse"} />
        </div>

        <button
            class="next primary shadow"
            disabled={!enableNextButton}
            on:click={() => dispatch("next")}
        >
            <h4>next</h4>
            <Svg name="expand_right_double" />
        </button>
    </div>
</div>
<svelte:window on:keydown={onKeyDown} />

<style>
    .layout {
        --side-width: 12rem;
        --horizontal-whitespace: 3rem;
        --board-size: min(
            100svh - var(--nav-height) - 3rem,
            100vw - var(--side-width) - var(--horizontal-whitespace),
            40rem
        );
        display: flex;
        gap: var(--gap-lg);
        margin-bottom: 5%;
    }

    .side {
        display: flex;
        flex-direction: column;
        gap: var(--gap-md);
        align-self: stretch;
    }

    .button-wrapper {
        width: 100%;
    }

    .flip,
    .analyse {
        margin-top: auto;
    }

    button.next {
        padding: 1.25rem 0;
    }

    .board-container {
        display: flex;
        justify-content: center;
        width: var(--board-size);
        position: relative;
        flex-grow: 1;
        height: calc(var(--board-size) + var(--shadow-size));
        grid-row: 1/-1;
        padding-bottom: var(--shadow-size);
    }
    .seq-info-wrapper {
        width: var(--side-width);
    }

    @media screen and (max-width: 800px) {
        .layout {
            --board-size: min(
                100svh - var(--nav-height) - 15rem,
                100vw - 0.5rem,
                40rem
            );
            display: grid;
            grid-template:
                "info   info    flip"
                "info   info    analyse"
                "board  board   board "
                "hint   arrows  next";
            column-gap: var(--gap-sm);
            row-gap: var(--gap-md);
            grid-template-columns: 27% 1fr 27%;
        }
        .board-container {
            grid-area: board;
        }
        .side {
            display: contents;
        }
        .side .seq-info-wrapper {
            grid-area: info;
        }
        .side .flip {
            grid-area: flip;
        }
        .side .hint {
            grid-area: hint;
        }
        .side .arrows {
            grid-area: arrows;
        }
        .side .analyse {
            grid-area: analyse;
        }
        .side .next {
            grid-area: next;
        }

        .seq-info-wrapper {
            width: auto;
        }
        button.next {
            padding: 0;
            margin-bottom: var(--shadow-size);
        }
        button.next > h4 {
            font-size: 1rem;
        }
        .flip,
        .analyse {
            height: 100%;
            padding-bottom: var(--shadow-size);
        }
    }

    @media screen and (max-width: 800px) and (max-height: 750px) {
        .layout {
            --board-size: min(
                100svh - var(--nav-height) - 8rem,
                100vw - 0.5rem,
                40rem
            );
            display: grid;
            grid-template:
                "info  info   info    flip   analyse"
                "board board  board   board  board"
                "hint  hint   arrows  next   next";
            grid-template-columns: 12% 12% 1fr 12% 12%;
        }
    }
    @media screen and (max-height: 800px) {
        .layout {
            margin-bottom: 0;
        }
    }
</style>
