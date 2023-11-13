<script>
  import { createEventDispatcher } from "svelte";
  import Board from "./Board.svelte";
  import SeqInfo from "./SeqInfo.svelte";

  export let seqInfo;

  console.log(seqInfo);

  const dispatch = createEventDispatcher();
</script>

<div class="layout">
  <div class="board-container">
    <Board on:finish={() => dispatch("finish")} />
  </div>

  {#if seqInfo}
    <SeqInfo {seqInfo} />
  {/if}

  <!-- <BoardControl buttonType={"flip"} /> -->
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: 4fr 1fr;
    width: 100%;
    height: 100%;
  }
  .board-container {
    display: flex;
    justify-content: center;
    width: min(100vh - 10rem, 100%);
    width: 100%;
    position: relative;
    flex-grow: 1;
    height: 100%;
  }
</style>
