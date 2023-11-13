<script>
  export let seqInfo;
  let { playlistName, timesStudied, seqData } = seqInfo;
</script>

<div class="seq-info">
  <div class="playlist-name">
    <small class="landscape">playing:</small>
    <h4>{playlistName}</h4>
    <h6>
      played {timesStudied} times
    </h6>
    <small class="portrait">rating: {seqData.rating}</small>
  </div>
  <div class="puzzle-info landscape">
    <small>puzzle: {seqData.puzzleId}</small>
    <h5>rating: {seqData.rating}</h5>
  </div>
  <div class="to-play">
    {#if seqData.fen.split(" ")[1] === "w"}
      <img src="/images/pieces/set3/k-b.svg" alt="black king" />
    {:else}
      <img src="/images/pieces/set3/k-w.svg" alt="white king" />
    {/if}
    <span class="landscape">to play</span>
  </div>
</div>
