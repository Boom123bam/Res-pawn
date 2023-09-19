<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleSelect(piece) {
    dispatch("promotion", piece);
  }
</script>

<div class="board-blocker">
  <div class="buttons">
    <button on:click={() => handleSelect("q")}>queen</button>
    <button on:click={() => handleSelect("r")}>rook</button>
    <button on:click={() => handleSelect("k")}>knight</button>
    <button on:click={() => handleSelect("b")}>bishop</button>
  </div>
</div>

<style>
  .board-blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
</style>
