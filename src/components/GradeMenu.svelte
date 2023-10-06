<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Popup from "./Popup.svelte";

  onMount(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // this function is called when the component is destroyed
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const dispatch = createEventDispatcher();

  const moveAudio = new Audio("/sound/move.mp3");

  // value ranges from 0 to 2
  export let value = 0;

  $: value,
    (() => {
      moveAudio.cloneNode(true).play();
    })();
  let mouseDown = false;

  function handleClose() {
    handleSubmit(false);
  }

  function handleSubmit(goNext) {
    dispatch("submit", { value, goNext });
  }

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
      // moveAudio.play();
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<Popup on:close={handleClose}>
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
        src="/images/queen.png"
        alt="queen slider"
        draggable="false"
        class="queen"
      />
    </div>
    <div class="button-tiles">
      <button
        on:click={() => {
          value = 0;
          // moveAudio.play();
        }}
      /><button
        on:click={() => {
          value = 0.5;
          // moveAudio.play();
        }}
      /><button
        on:click={() => {
          value = 1;
          // moveAudio.play();
        }}
      /><button
        on:click={() => {
          value = 1.5;
          // moveAudio.play();
        }}
      /><button
        on:click={() => {
          value = 2;
          // moveAudio.play();
        }}
      />
      <p class="label left">again</p>
      <p class="label mid">tricky</p>
      <p class="label right">easy</p>
    </div>
  </div>
  <div class="text">
    <h2>How hard was it?</h2>
    <p>drag the queen along the tiles</p>
    <small>(or tap on the tiles)</small>
  </div>
  <button
    class="next cta"
    on:click={() => {
      handleSubmit(true);
    }}>next</button
  >
</Popup>

<style>
  button.next {
    border-radius: var(--br-small);
    padding: 0.5rem 2.25rem;
  }

  .slider {
    width: 100%;
    position: relative;
  }

  .img-container {
    position: relative;
    width: 20%;
    display: flex;
    justify-content: center;
    transition: 0.1s;
  }
  .img-container .queen {
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

  .button-tiles {
    display: grid;
    row-gap: 0.25rem;
    grid-template-columns: repeat(5, 1fr);
  }
  .button-tiles :nth-child(5) {
    background-color: #b1eb8d;
  }
  .button-tiles :nth-child(4) {
    background-color: #e3ef98;
  }
  .button-tiles :nth-child(3) {
    background-color: #f4d566;
  }
  .button-tiles :nth-child(2) {
    background-color: #f2a864;
  }
  .button-tiles :nth-child(1) {
    background-color: #db7676;
  }
  .button-tiles button {
    width: 100%;
    height: 1.5rem;
    background: black;
  }

  .label {
    text-align: center;
  }
  .label.right {
    grid-column: 5;
  }
  .label.mid {
    grid-column: 3;
  }

  .text {
    text-align: center;
  }
  .text p {
    margin-top: 0.75rem;
  }
  .text h2 {
    font-size: 1.25rem;
    margin-top: 0.5rem;
    font-family: var(--font-small);
  }
</style>
