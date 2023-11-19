<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Popup from "./Popup.svelte";

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };
  const handleTouchMove = (e) => {
    handleMove(e.targetTouches[0].pageX);
  };
  onMount(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // this function is called when the component is destroyed

      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const dispatch = createEventDispatcher();
  // TODO add audio

  // value ranges from 0 to 2
  export let value = 0;

  let slider;

  let mouseDown = false;

  function handleClose() {
    handleSubmit(false);
  }

  function handleSubmit(goNext) {
    dispatch("submit", { value, goNext });
  }

  function handleMove(x) {
    if (mouseDown) {
      const componentWidth = slider.clientWidth;
      const mouseX = x - slider.getBoundingClientRect().left;

      // Calculate the mouse position as a percentage
      let intValue = Math.floor((mouseX / componentWidth) * 5);
      if (intValue < 0) intValue = 0;
      if (intValue > 4) intValue = 4;
      value = intValue / 2;
    }
  }
  function handleMouseDown(e) {
    mouseDown = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
  }
  function handleMouseUp(e) {
    if (mouseDown) {
      mouseDown = false;
      // moveAudio.play();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    }
  }
</script>

<Popup on:close={handleClose}>
  <div class="slider-container" bind:this={slider}>
    <div
      class="img-container"
      style={`${mouseDown ? "bottom:1rem" : "bottom: 0"}; left:${
        value * 40
      }%;`}
    >
      <div
        class="img-wrapper"
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp}
        on:touchstart={handleMouseDown}
        on:touchend={handleMouseUp}
        tabindex="0"
        role="slider"
        aria-valuenow={value}
      >
        <img
          src="/images/queen.png"
          alt="queen slider"
          draggable="false"
          class="queen"
        />
      </div>
    </div>
    <div class="button-tiles">
      <button
        aria-label="Set Value to 0"
        on:mousedown={() => {
          value = 0;
          // moveAudio.play();
        }}
      /><button
        aria-label="Set Value to 0.5"
        on:mousedown={() => {
          value = 0.5;
          // moveAudio.play();
        }}
      /><button
        aria-label="Set Value to 1"
        on:mousedown={() => {
          value = 1;
          // moveAudio.play();
        }}
      /><button
        aria-label="Set Value to 1.5"
        on:mousedown={() => {
          value = 1.5;
          // moveAudio.play();
        }}
      /><button
        aria-label="Set Value to 2"
        on:mousedown={() => {
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
    class="primary next shadow"
    on:click={() => {
      handleSubmit(true);
    }}>next</button
  >
</Popup>

<style>
  .slider-container,
  .text {
    user-select: none;
    -webkit-user-select: none;
  }
  button.next {
    padding: 0.5rem 2.25rem;
    border-radius: var(--br-sm);
  }

  .slider-container {
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
  .img-container .img-wrapper {
    cursor: pointer;
    width: 150%;
    position: absolute;
    z-index: 10;
    overflow: visible;
    height: auto;
    max-block-size: none;
    max-inline-size: none;
    bottom: -1.5rem;
  }
  .img-container .queen {
    width: 100%;
  }

  .button-tiles {
    display: grid;
    row-gap: 0.25rem;
    grid-template-columns: repeat(5, 1fr);
  }
  .button-tiles :nth-child(5) {
    background-color: #b1eb8d;
    border-top-right-radius: var(--br-sm);
    border-bottom-right-radius: var(--br-sm);
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
    border-top-left-radius: var(--br-sm);
    border-bottom-left-radius: var(--br-sm);
  }
  .button-tiles > button {
    width: 100%;
    height: 1.5rem;
    border-radius: 0;
    position: relative;
  }
  @media (hover: hover) {
    .button-tiles > button:hover:before {
      content: "";
      position: absolute;
      background: rgba(0, 0, 0, 0.25);
      inset: 0.55rem 1.5rem;
      z-index: 1;
      border-radius: 50%;
    }
  }

  .button-tiles > button:after {
    content: "";
    position: absolute;
    inset: -5rem 0 -5rem 0;
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
    font-family: var(--font-sm);
  }
</style>
