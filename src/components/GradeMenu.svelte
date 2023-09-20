<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  onMount(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // this function is called when the component is destroyed
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const dispatch = createEventDispatcher();

  function handleSubmit(goNext) {
    dispatch("submit", { value, goNext });
  }

  // value ranges from 0 to 2
  let value = 0;
  let mouseDown = false;

  function handleMouseMove(event) {
    if (mouseDown) {
      const componentWidth = slider.clientWidth;
      const mouseX =
        event.clientX - slider.getBoundingClientRect().left;

      // Calculate the mouse position as a percentage
      let intValue = Math.floor((mouseX / componentWidth) * 5);
      if (intValue < 0) intValue = 0;
      if (intValue > 4) intValue = 4;
      value = intValue / 2;
    }
  }
  function handleMouseDown(e) {
    mouseDown = true;
  }
  function handleMouseUp(e) {
    if (mouseDown) {
      mouseDown = false;
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="board-blocker"
  on:mousemove={() => {
    handleMouseMove(false);
  }}
  on:click={handleSubmit}
>
  <div class="popup-window">
    <button
      class="close"
      on:click={() => {
        handleMouseMove(false);
      }}
    />
    <div class="slider" id="slider">
      <div
        class="img-container"
        style={`${mouseDown ? "bottom:1rem" : "bottom: 0"}; left:${
          value * 40
        }%;`}
      >
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          on:mousedown={handleMouseDown}
          on:mouseup={handleMouseUp}
          src="https://i.imgur.com/R6Ky0xY.png"
          alt=""
          draggable="false"
          class="queen"
        />
      </div>
      <div class="button-tiles">
        <button
          on:click={() => {
            value = 0;
          }}
        /><button
          on:click={() => {
            value = 0.5;
          }}
        /><button
          on:click={() => {
            value = 1;
          }}
        /><button
          on:click={() => {
            value = 1.5;
          }}
        /><button
          on:click={() => {
            value = 2;
          }}
        />
        <p class="label left">again</p>
        <p class="label mid">tricky</p>
        <p class="label right">fluent</p>
      </div>
    </div>
    <button
      class="next cta"
      on:click={() => {
        handleMouseMove(true);
      }}>next</button
    >
  </div>
</div>

<style>
  .popup-window {
    padding: 5rem;
    background-color: var(--secondary);
    border: var(--border);
    border-radius: var(--br);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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

  .slider {
    width: 25rem;
    position: relative;
  }

  .img-container {
    position: relative;
    width: 20%;
    display: flex;
    justify-content: center;
    transition: 0.1s;

    & .queen {
      cursor: pointer;
      width: 150%;
      object-fit: cover;
      position: absolute;
      z-index: 10;
      overflow: visible;
      height: auto;
      max-block-size: none;
      max-inline-size: none;
      bottom: -1.5rem;
    }
  }

  .button-tiles {
    display: grid;
    row-gap: 0.25rem;
    grid-template-columns: repeat(5, 1fr);
    & button {
      width: 100%;
      height: 1.5rem;
      background: black;
    }
    & :nth-child(1) {
      background-color: #db7676;
    }
    & :nth-child(2) {
      background-color: #f2a864;
    }
    & :nth-child(3) {
      background-color: #f4d566;
    }
    & :nth-child(4) {
      background-color: #e3ef98;
    }
    & :nth-child(5) {
      background-color: #b1eb8d;
    }
  }

  .label {
    text-align: center;
    &.mid {
      grid-column: 3;
    }
    &.right {
      grid-column: 5;
    }
  }
</style>
