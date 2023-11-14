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
  {#if $controlsDisplayState.showHint}
    <button
      title={"hint"}
      class="outline shadow"
      disabled={false}
      on:click={() => {
        controlLog.setLastControl("hint");
      }}
    >
      <Svg size="1.25rem" name="question" />
    </button>
  {:else if $controlsDisplayState.showSol}
    <button
      title={"solution"}
      class="outline shadow"
      disabled={false}
      on:click={() => {
        controlLog.setLastControl("solution");
      }}
    >
      <Svg size="1.25rem" name="question" />
    </button>
  {:else}
    <button
      title={$controlsDisplayState.showHint
        ? "hint"
        : $controlsDisplayState.showSol
        ? "solution"
        : "retry"}
      class="outline shadow"
      disabled={false}
      on:click={() => {
        controlLog.setLastControl(
          $controlsDisplayState.showHint
            ? "hint"
            : $controlsDisplayState.showSol
            ? "solution"
            : "retry"
        );
      }}
    >
      <Svg size="1.25rem" name="question" />
    </button>
  {/if}
{:else if buttonType == "flip"}
  <button
    title="flip board"
    class="flip outline shadow"
    on:click={() => {
      controlLog.setLastControl("flip");
    }}
  >
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
      <div class="hide-small">
        <b>analyse</b>
      </div>
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
</style>
