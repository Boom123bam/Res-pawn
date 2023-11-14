<script>
  import {
    controlLog,
    controlsDisplayState,
    sequenceData, // for analyse button
    board, // for analyse button
  } from "../stores/boardStore";
  import Svg from "./Svg.svelte";

  export let buttonType;
</script>

{#if buttonType == "arrows"}
  <div class="arrows">
    <button
      class="contrast shadow left"
      title="previous move"
      on:click={() => {
        controlLog.setLastControl("back");
      }}
    >
      <Svg size="1.25rem" name="expand_left" />
    </button>
    <button
      title="next move"
      class={`contrast shadow right ${
        $controlsDisplayState.flashingNext ? "flashing" : ""
      }`}
      on:click={() => {
        controlLog.setLastControl("next");
      }}
    >
      <Svg size="1.25rem" name="expand_right" />
    </button>
  </div>
{:else if buttonType == "hint + solution + retry"}
  <button
    title={$controlsDisplayState.actionButton}
    class={`action outline shadow${
      $controlsDisplayState.actionButton == "retry" ? " flashing" : ""
    }`}
    disabled={$controlsDisplayState.actionButtonDisabled}
    on:click={() => {
      controlLog.setLastControl($controlsDisplayState.actionButton);
    }}
  >
    {$controlsDisplayState.actionButton}
    {#if $controlsDisplayState.actionButton == "retry"}
      <Svg size="1.25rem" name="refresh" />
    {:else}
      <Svg size="1.25rem" name="question" />
    {/if}
  </button>
{:else if buttonType == "flip"}
  <button
    title="flip board"
    class="flip outline shadow"
    on:click={() => {
      controlLog.setLastControl("flip");
    }}
  >
    <div class="hide-small">flip</div>
    <Svg size="1.25rem" name="vertical_switch_alt" />
  </button>
{:else if buttonType == "analyse"}
  {#if $sequenceData?.fen}
    <a
      class="analyse button-like secondary shadow"
      href={`https://lichess.org/analysis/standard/${$board.chess.fen()}?color=${
        $sequenceData.fen.split(" ")[1] === "w" ? "black" : "white"
      }`}
      target="_blank"
    >
      <div class="hide-small">analyse</div>
      <Svg size="1.25rem" name="search" />
    </a>
  {/if}
{/if}

<style>
  a,
  button,
  .arrows {
    width: 100%;
  }
  .arrows {
    display: flex;
    position: relative;
    gap: 1px;
  }
  .flip,
  .action {
    font-weight: 400;
  }
  .arrows .left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .arrows .right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .analyse {
    padding: 0.5rem 0;
  }

  .flashing.outline {
    animation: flashing-outline 2s infinite;
  }
  .flashing.contrast {
    animation: flashing-contrast 2s infinite;
  }

  @media screen and (max-width: 800px) {
    .flip,
    .analyse {
      height: 100%;
      padding: 0;
    }
  }
  @media screen and (max-width: 800px) and (max-height: 750px) {
    .hide-small {
      display: none;
    }
  }

  @keyframes flashing-outline {
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

  @keyframes flashing-contrast {
    0% {
      background-color: var(--contrast);
    }
    50% {
      background-color: var(--purple);
    }
    100% {
      background-color: var(--contrast);
    }
  }
</style>
