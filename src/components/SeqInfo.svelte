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
  <hr />
</div>

<style>
  .seq-info-container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-md);
  }
  .seq-info-container > hr {
    display: none;
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
    grid-area: title;
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

  .to-play > img {
    width: 2.5rem;
    height: 2.5rem;
  }

  @media screen and (max-width: 800px) {
    .text-section hr,
    .to-play hr {
      display: none;
    }
    .seq-info-container {
      width: 100%;
      flex-direction: row;
      gap: 0;
      justify-content: space-evenly;
      align-items: center;
      align-items: stretch;
      background-color: var(--background-alt);
      border-radius: var(--br);
      border: 1px dashed var(--border-light);
      padding: 1rem;
    }
    .seq-info-container > hr {
      display: unset;
      border-left: 1px solid var(--border-light);
    }
    .text-section,
    .to-play {
      background-color: unset;
      border-radius: unset;
      border: unset;
      padding: 0;
    }
    .to-play {
      align-self: center;
      flex-direction: column;
      align-items: center;
      gap: var(--gap-sm);
    }
    .to-play > .text {
      display: flex;
      gap: 0.2rem;
    }
    .to-play > .text > h4 {
      font-size: 0.625rem;
    }
    .text-section {
      order: 1;
      padding-inline: 5%;
      grid-template-areas:
        "title"
        "times-played"
        "more";
      gap: 0;
    }
    .text-section .more-button {
      margin-top: 0.2rem;
    }
  }

  @media screen and (max-height: 700px) {
    .seq-info-container {
      padding-block: 0.5rem;
    }
    .text-section {
      grid-template-columns: 8rem 1fr;
      grid-template-areas:
        "title more"
        "times-played more";
      padding-inline: 0;
    }
    .to-play > .text {
      display: none;
    }
    .text-section > .more-button {
      margin-block: auto;
    }
    .seq-info-container > hr {
      display: none;
    }
    .to-play > img {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
</style>
