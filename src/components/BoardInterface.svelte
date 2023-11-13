<script>
  import { createEventDispatcher } from "svelte";
  import Board from "./Board.svelte";
  import SeqInfo from "./SeqInfo.svelte";
  import BoardControl from "./BoardControl.svelte";

  export let seqInfo, enableNextButton;

  const dispatch = createEventDispatcher();
</script>

<div class="layout">
  <div class="board-container">
    <Board on:finish={(e) => dispatch("finish", e.detail)} />
  </div>

  {#if seqInfo}
    <div class="seq-info-wrapper">
      <SeqInfo
        on:morePressed={() => dispatch("morePressed")}
        {seqInfo}
      />
    </div>
  {/if}

  <BoardControl buttonType={"flip"} />
  <BoardControl buttonType={"hint + solution"} />
  <BoardControl buttonType={"arrows"} />
  <BoardControl buttonType={"analyse"} />

  <button
    class="next primary shadow"
    disabled={!enableNextButton}
    on:click={() => dispatch("next")}>next</button
  >
</div>

<style>
  .layout {
    --side-width: 12rem;
    --horizontal-whitespace: 3rem;
    --board-size: min(
      100svh - var(--nav-height) - 3rem,
      100vw - var(--side-width) - var(--horizontal-whitespace),
      40rem
    );
    display: grid;
    grid-template-columns: var(--board-size) 1fr;
    grid-template-rows: repeat(10, 1fr);
    gap: var(--gap-lg);
    width: 100%;
    height: 100%;
  }
  .board-container {
    display: flex;
    justify-content: center;
    width: var(--board-size);
    position: relative;
    flex-grow: 1;
    height: 100%;
    grid-row: 1/-1;
  }
  .seq-info-wrapper {
    width: var(--side-width);
  }
</style>
