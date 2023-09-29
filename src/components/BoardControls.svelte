<script>
  import { createEventDispatcher } from "svelte";

  export let showRetryLastMove;
  export let showHint;
  export let showSol;

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
      src={`/images/icons/left.svg`}
      alt="back"
      draggable="false"
    />
  </button>
  <button
    title="next move"
    on:click={() => {
      dispatch("next");
    }}
  >
    <img
      src={`/images/icons/right.svg`}
      alt="next"
      draggable="false"
    />
  </button>

  {#if showRetryLastMove}
    <button
      class="retry"
      title="retry last move"
      on:click={() => {
        dispatch("retryLastMove");
      }}
    >
      <img
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
      src={`/images/icons/flip.svg`}
      alt="flip board"
      draggable="false"
    />
  </button>
</div>

<style>
  .board-controls {
    height: 4rem;
    padding-inline: 2.25rem;
    background-color: var(--secondary);
    border-radius: var(--br);
    border: var(--border);
    display: flex;
    gap: 1.25rem;
    justify-content: space-evenly;
    overflow: hidden;
  }
  .board-controls button {
    /* padding: 3%; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 1rem;
  }
  .board-controls button:hover {
    background-color: var(--light-gray);
  }
  .board-controls button img {
    width: var(--button-icon-size);
    height: var(--button-icon-size);
  }
  button.retry {
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
  @media screen and (max-width: 400px) {
    .board-controls {
      padding: 0;
      gap: 0;
    }
  }
</style>
