<script>
  import { createEventDispatcher } from "svelte";
  import Svg from "./Svg.svelte";

  const dispatch = createEventDispatcher();
  function handleClose() {
    dispatch("close");
  }
</script>

<div class="popup-window popup">
  <button class="close contrast" on:click={handleClose}
    ><Svg name="close_round" />
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
    word-wrap: break-word;
  }

  button.close {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border-radius: var(--br-sm);
  }

  @media screen and (max-width: 500px) {
    .popup-window {
      padding: 3rem 1rem 2.5rem 1rem;
    }
  }
</style>
