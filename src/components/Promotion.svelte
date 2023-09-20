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
</style>
