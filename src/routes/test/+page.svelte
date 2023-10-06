<script>
  import { browser } from "$app/environment";

  function play(audioBuffer) {
    if (browser) {
      let source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }
  }

  let captureBuffer;
  let context;

  if (browser) {
    let URL = "/sound/capture.mp3";
    let AudioContext =
      window.AudioContext || window.webkitAudioContext;
    context = new AudioContext(); // Make it crossbrowser
    window
      .fetch(URL)
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
  }
</script>

<div class="page-content">
  <button on:click={() => play(captureBuffer)}>sound</button>
</div>
