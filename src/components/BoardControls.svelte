<script>
  import { createEventDispatcher } from "svelte";

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
    <img
      class="icon"
      src={`/images/icons/left.svg`}
      alt="back"
      draggable="false"
    />
  </button>
  <button
    title="next move"
    class={`${flashingNext ? "flashing" : ""}`}
    on:click={() => {
      dispatch("next");
    }}
  >
    <img
      class="icon"
      src={`/images/icons/right.svg`}
      alt="next"
      draggable="false"
    />
  </button>

  {#if showRetryLastMove}
    <button
      class="flashing"
      title="retry last move"
      on:click={() => {
        dispatch("retryLastMove");
      }}
    >
      <img
        class="icon"
        src={`/images/icons/refresh.svg`}
        alt="retry"
        draggable="false"
      />
    </button>
  {/if}

  {#if showHint}
    <button
      title="hint"
      on:click={() => {
        dispatch("hint");
      }}
    >
      <img
        class="icon"
        src={`/images/icons/question.svg`}
        alt="hint/solution"
        draggable="false"
      />
    </button>
  {/if}

  {#if showSol}
    <button
      title="solutoin"
      on:click={() => {
        dispatch("solution");
      }}
    >
      <img
        class="icon"
        src={`/images/icons/question.svg`}
        alt="hint/solution"
        draggable="false"
      />
    </button>
  {/if}
  <button
    title="flip board"
    on:click={() => {
      dispatch("flip");
    }}
  >
    <img
      class="icon"
      src={`/images/icons/flip.svg`}
      alt="flip board"
      draggable="false"
    />
  </button>
</div>

<style>
  .board-controls {
    /* height: 4rem; */
    background-color: var(--secondary);
    border-radius: var(--br);
    border: var(--border);
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
