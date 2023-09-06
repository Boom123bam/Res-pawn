<script>
  import Board from "./Board.svelte";
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="wrapper">
  <Board />
  <div class="playlist-controls">
    <div>add to playlist</div>
    <div>edit</div>
    <div>skip</div>
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 8fr 4fr;
    gap: 2rem;
  }
  .playlist-controls {
    display: flex;
    flex-direction: column; /* remove later */
    margin-top: 3rem;
    & div {
      height: 3rem;
    }
  }
</style>
