<script>
  import { createEventDispatcher } from "svelte";
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
      dispatch("back");
    }}
  >
    <Svg name="expand_left" />
  </button>
  <button
    title="next move"
    class={`${flashingNext ? "flashing" : ""}`}
    on:click={() => {
      dispatch("next");
    }}
  >
    <Svg name="expand_right" />
  </button>

  {#if showRetryLastMove}
    <button
      class="flashing"
      title="retry last move"
      on:click={() => {
        dispatch("retryLastMove");
      }}
    >
      <Svg name="refresh" />
    </button>
  {/if}

  {#if showHint}
    <button
      title="hint"
      on:click={() => {
        dispatch("hint");
      }}
    >
      <Svg name="question" />
    </button>
  {/if}

  {#if showSol}
    <button
      title="solutoin"
      on:click={() => {
        dispatch("solution");
      }}
    >
      <Svg name="question" />
    </button>
  {/if}
  <button
    title="flip board"
    on:click={() => {
      dispatch("flip");
    }}
  >
    <Svg name="vertical_switch_alt" />
  </button>
</div>

<style>
  .board-controls {
    /* height: 4rem; */
    background-color: var(--secondary);
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
      background-color: var(--secondary);
    }
    50% {
      background-color: var(--primary);
    }
    100% {
      background-color: var(--secondary);
    }
  }
  @media screen and (max-width: 600px) {
    .board-controls button {
      padding: 0.5rem 1rem;
    }
  }
  @media (hover: hover) {
    .board-controls button:hover {
      background-color: var(--light-gray);
    }
  }
</style>
