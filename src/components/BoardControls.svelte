<script>
  import { createEventDispatcher } from "svelte";
  import { controlLog } from "../stores/boardStore";
  import Svg from "./Svg.svelte";

  export let showRetryLastMove;
  export let showHint;
  export let showSol;
  export let flashingNext;

  const dispatch = createEventDispatcher();
</script>

<div class="board-controls">
  <button
    title="previous move"
    on:click={() => {
      controlLog.setLastControl("back");
    }}
  >
    <Svg name="expand_left" />
  </button>
  <button
    title="next move"
    class={`${flashingNext ? "flashing" : ""}`}
    on:click={() => {
      controlLog.setLastControl("next");
    }}
  >
    <Svg name="expand_right" />
  </button>

  {#if showRetryLastMove}
    <button
      class="flashing"
      title="retry last move"
      on:click={() => {
        controlLog.setLastControl("retry");
      }}
    >
      <Svg name="refresh" />
    </button>
  {/if}

  {#if showHint}
    <button
      title="hint"
      on:click={() => {
        controlLog.setLastControl("hint");
      }}
    >
      <Svg name="question" />
    </button>
  {/if}

  {#if showSol}
    <button
      title="solutoin"
      on:click={() => {
        controlLog.setLastControl("solution");
      }}
    >
      <Svg name="question" />
    </button>
  {/if}
  <button
    title="flip board"
    on:click={() => {
      controlLog.setLastControl("flip");
    }}
  >
    <Svg name="vertical_switch_alt" />
  </button>
</div>

<style>
  .board-controls {
    /* height: 4rem; */
    background-color: var(--background-alt);
    border-radius: var(--br);
    border: var(--border-light);
    display: flex;
    /* gap: 1.25rem; */
    overflow: hidden;
  }
  .board-controls button {
    padding: 0.5rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-inline: 1rem; */
  }

  .flashing {
    animation-name: color-pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes color-pulse {
    0% {
      background-color: var(--background-alt);
    }
    50% {
      background-color: var(--purple);
    }
    100% {
      background-color: var(--background-alt);
    }
  }
  @media screen and (max-width: 600px) {
    .board-controls button {
      padding: 0.5rem 1rem;
    }
  }
  @media (hover: hover) {
    .board-controls button:hover {
      background-color: var(--gray-100);
    }
  }
</style>
