<script>
  import { createEventDispatcher } from "svelte";
  import Svg from "./Svg.svelte";

  const dispatch = createEventDispatcher();
  function handleClose() {
    dispatch("close");
  }
</script>

<div class="popup-window popup">
  <button class="close" on:click={handleClose}
    ><Svg name="close" color="var(--secondary)" />
  </button>
  <slot />
</div>

<style>
  .popup-window {
    padding: 12%;
    padding-bottom: 3.5rem;
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    position: relative;
  }

  button.close {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    background-color: var(--text);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--br-small);
  }
</style>
