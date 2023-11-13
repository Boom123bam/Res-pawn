<script>
  import { browser } from "$app/environment";

  function onKeyDown(e) {
    const key = document.getElementById(e.key);
    if (key) {
      key.click();
      key.classList.add("pressed");
      setTimeout(() => {
        key.classList.remove("pressed");
      }, 100);
    }
  }

  function playSound(audioBuffer) {
    if (browser) {
      let source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }
  }

  function loadAudioBuffers() {
    if (browser) {
      let AudioContext =
        window.AudioContext || window.webkitAudioContext;
      context = new AudioContext(); // Make it crossbrowser
      window
        .fetch("/sfx/capture.mp3")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          context.decodeAudioData(
            arrayBuffer,
            (audioBuffer) => {
              captureBuffer = audioBuffer;
            },
            (error) => console.error(error)
          )
        );
      window
        .fetch("/sfx/move.mp3")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          context.decodeAudioData(
            arrayBuffer,
            (audioBuffer) => {
              moveBuffer = audioBuffer;
            },
            (error) => console.error(error)
          )
        );
    }
  }

  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];
  const buttonTypes = ["primary", "secondary", "outline", "contrast"];

  // audio
  let moveBuffer;
  let captureBuffer;
  let context;
  loadAudioBuffers();

  let output = "";
  let shift = 0;
</script>

<section>
  <h3>KEYBOARD</h3>
  <div class="keyboard">
    {#each rows as row}
      <div class="row">
        {#each row as char, i}
          <button
            class={`shadow ${
              buttonTypes[(i + shift) % buttonTypes.length]
            }`}
            id={char.toLowerCase()}
            on:click={() => {
              playSound(moveBuffer);
              output += char;
            }}
          >
            {char}
          </button>
        {/each}
      </div>
    {/each}
    <div class="row">
      <button
        id=" "
        class={`shadow ${buttonTypes[shift % buttonTypes.length]}`}
        on:click={(e) => {
          playSound(captureBuffer);
          output = "";
          shift++;
        }}
      />
    </div>
  </div>

  <div class="output-container">
    <h1 class="output">{output}</h1>
  </div>
</section>
<svelte:window on:keydown={onKeyDown} />

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
  }
  .keyboard {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
  }
  button {
    width: 4rem;
    height: 3.5rem;
    transition: background-color 0.1s;
  }

  button.primary.shadow.pressed {
    box-shadow: 0 0 var(--pirmary-shadow);
    transform: translateY(var(--shadow-size));
    background-color: var(--blue-300);
  }

  button.secondary.shadow.pressed {
    box-shadow: 0 0 var(--secondary-shadow);
    transform: translateY(var(--shadow-size));
    background-color: var(--pink-300);
  }

  button.outline.shadow.pressed {
    box-shadow: inset 0px 0px 0px 1px var(--border-light),
      0 var(--border-light);
    transform: translateY(var(--shadow-size));
    background-color: var(--gray-50);
  }

  button.contrast.shadow.pressed {
    box-shadow: 0 0 var(--contrast-shadow);
    transform: translateY(var(--shadow-size));
  }

  .row {
    display: flex;
    gap: 0.25rem;
  }
  .row:nth-child(2) {
    padding-right: 2rem;
  }
  .row:nth-child(3) {
    padding-right: 2rem;
  }
  .row:nth-child(4) {
    padding-right: 2rem;
  }
  .row:nth-child(4) > button {
    width: 25rem;
  }
  .output-container {
    position: relative;
    width: 100%;
  }
  .output {
    position: absolute;
    right: 0;
    white-space: nowrap;
  }
</style>
