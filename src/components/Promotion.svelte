<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleSelect(piece) {
    dispatch("promotion", piece);
  }

  export let color = "b";
</script>

<div class="board-blocker">
  <div
    class={`buttons-container ${
      color == "b" ? "popup" : ""
    } ${color}`}
  >
    <button on:click={() => handleSelect("q")}>
      <img
        src={`/images/pieces/set3/q-${color}.svg`}
        alt="queen"
        draggable="false"
      />
    </button>
    <button on:click={() => handleSelect("b")}>
      <img
        src={`/images/pieces/set3/b-${color}.svg`}
        alt="bishop"
        draggable="false"
      />
    </button>
    <button on:click={() => handleSelect("r")}>
      <img
        src={`/images/pieces/set3/r-${color}.svg`}
        alt="rook"
        draggable="false"
      />
    </button>
    <button on:click={() => handleSelect("n")}>
      <img
        src={`/images/pieces/set3/n-${color}.svg`}
        alt="knight"
        draggable="false"
      />
    </button>
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
    z-index: 50;
  }
  .buttons-container {
    border-radius: var(--br-small);
    width: max(60%, 18rem);
    padding: 0.5rem 1.25rem;
    display: grid;
    gap: 5%;
    grid-template-columns: repeat(4, 1fr);
  }
  .buttons-container button {
    padding: 15%;
    border-radius: var(--br-small);
  }
  .buttons-container button:hover {
    background-color: color-mix(
      in oklab,
      var(--primary) 50%,
      rgba(0, 0, 0, 0) 50%
    );
  }

  .buttons-container.w {
    background-color: var(--text);
  }
</style>
