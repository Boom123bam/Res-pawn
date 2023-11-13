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

{#if buttonType == "back"}
  <button
    title="previous move"
    on:click={() => {
      controlLog.setLastControl("back");
    }}
  >
    <Svg name="expand_left" />
  </button>
{:else if buttonType == "next"}
  <button
    title="next move"
    class={`${$controlsDisplayState.flashingNext ? "flashing" : ""}`}
    on:click={() => {
      controlLog.setLastControl("next");
    }}
  >
    <Svg name="expand_right" />
  </button>
{:else if buttonType == "retry"}
  {#if $controlsDisplayState.showRetryLastMove}
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
{:else if buttonType == "hint"}
  {#if $controlsDisplayState.showHint}
    <button
      title="hint"
      on:click={() => {
        controlLog.setLastControl("hint");
      }}
    >
      <Svg name="question" />
    </button>
  {/if}
{:else if buttonType == "solution"}
  {#if $controlsDisplayState.showSol}
    <button
      title="solutoin"
      on:click={() => {
        controlLog.setLastControl("solution");
      }}
    >
      <Svg name="question" />
    </button>
  {/if}
{:else if buttonType == "flip"}
  <button
    title="flip board"
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
      <button class="analyse" title="analyse in lichess"
        ><Svg name="search" color="var(--background-alt)" /></button
      >
    </a>
  {/if}
{/if}
