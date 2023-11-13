<script>
  import { createEventDispatcher } from "svelte";
  import Svg from "./Svg.svelte";

  export let seqInfo;
  const dispatch = createEventDispatcher();
</script>

<div class="seq-info-container">
  <div class="text-section">
    <h3>{seqInfo.playlistName}</h3>
    <hr />
    <small>
      played {seqInfo.timesStudied} times
    </small>

    <button
      class="more-button outline"
      on:click={() => dispatch("morePressed")}
    >
      <Svg name="info" size=".7rem" /><small>more</small>
    </button>
  </div>
  <div class="to-play">
    {#if seqInfo.seqData.fen.split(" ")[1] === "w"}
      <img src="/images/pieces/set3/k-b.svg" alt="black king" />
    {:else}
      <img src="/images/pieces/set3/k-w.svg" alt="white king" />
    {/if}
    <hr />
    <div class="text">
      <h4 class="color">
        {#if seqInfo.seqData.fen.split(" ")[1] === "w"}
          black
        {:else}
          white
        {/if}
      </h4>
      <small> to play </small>
    </div>
  </div>
</div>

<style>
  .seq-info-container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-md);
  }

  .text-section,
  .to-play {
    background-color: var(--background-alt);
    border-radius: var(--br);
    border: 1px dashed var(--border-light);
  }

  .text-section {
    display: grid;
    text-align: center;
    padding: 1.5rem 1rem;
    gap: var(--gap-sm);
    grid-template-areas:
      "title"
      "line"
      "times-played"
      "more";
  }

  .text-section h3 {
    grid-area: "title";
    margin-bottom: 0.1rem;
  }
  .text-section hr {
    border-top: 1px solid var(--border-light);
    grid-area: line;
  }

  .text-section small {
    grid-area: times-played;
  }

  .text-section .more-button {
    grid-area: more;
    margin: auto;
    padding: 0.375rem 0.75rem;
    display: flex;
    gap: 0.25rem;
    font-weight: 400;
  }

  .to-play {
    padding: 1.125rem 1.375rem;
    display: flex;
    gap: 0.875rem;
  }

  .to-play hr {
    border-left: 1px solid var(--border-light);
  }

  .to-play img {
    width: 2.375rem;
    height: 2.375rem;
  }

  @media screen and (max-width: 800px) {
    .text-section {
      grid-template-columns: 8rem 1fr;
      grid-template-areas:
        "title more"
        "times-played more";
    }
    .text-section hr {
      display: none;
    }
  }
</style>
