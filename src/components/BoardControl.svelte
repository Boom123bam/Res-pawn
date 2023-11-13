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
      <Svg name="expand_left" />
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
      <Svg name="expand_right" />
    </button>
  </div>
{:else if buttonType == "retry"}
  {#if $controlsDisplayState.showRetryLastMove}
    <button
      class="flashing outline shadow"
      title="retry last move"
      on:click={() => {
        controlLog.setLastControl("retry");
      }}
    >
      <Svg name="refresh" />
    </button>
  {/if}
{:else if buttonType == "hint + solution"}
  <button
    title={$controlsDisplayState.showHint
      ? "hint"
      : $controlsDisplayState.showSol
      ? "solution"
      : "hint/solution"}
    class="outline shadow"
    disabled={!$controlsDisplayState.showHint &&
      !$controlsDisplayState.showSol}
    on:click={() => {
      controlLog.setLastControl(
        $controlsDisplayState.showHint
          ? "hint"
          : $controlsDisplayState.showSol
          ? "solution"
          : null
      );
    }}
  >
    <Svg name="question" />
  </button>
{:else if buttonType == "flip"}
  <button
    title="flip board"
    class="outline shadow"
    on:click={() => {
      controlLog.setLastControl("flip");
    }}
  >
    <Svg name="vertical_switch_alt" />
  </button>
{:else if buttonType == "analyse"}
  {#if $sequenceData?.fen}
    <a
      href={`https://lichess.org/analysis/standard/${$board.chess.fen()}?color=${
        $sequenceData.fen.split(" ")[1] === "w" ? "black" : "white"
      }`}
      target="_blank"
    >
      <button
        class="analyse secondary shadow"
        title="analyse in lichess"><Svg name="search" /></button
      >
    </a>
  {/if}
{/if}

<style>
  .arrows {
    display: flex;
    position: relative;
    gap: 1px;
  }
  .arrows .left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .arrows .right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
