<script>
  import PlaylistCard from "../../../components/PlaylistCard.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  let { localPlaylistData, playlists } = data;
  $: {
    localPlaylistData = data.localPlaylistData;
    playlists = data.playlists;
  }
</script>

<div class="hero-wrapper">
  <div class="hero-background">
    <div class="hero-content-container">
      <p>Playlist</p>
      <h1 class="title">{localPlaylistData.name}</h1>
      {#if localPlaylistData.description}
        <p class="description">{localPlaylistData.description}</p>
      {/if}
      <h3 class="length">
        {localPlaylistData.sequences.length} puzzles
      </h3>
    </div>
  </div>
  <a class="play" href={`/playlists/${localPlaylistData.id}/play`}>
    <button class="cta">play</button>
  </a>
</div>
<div class="page-content">
  <h2>Other playlists</h2>
  <div class="card-grid">
    {#each playlists as playlist}
      <PlaylistCard playlistData={playlist} />
    {/each}
  </div>
</div>

<style>
  .hero-wrapper {
    position: relative;
    width: 100%;
  }
  .hero-background {
    width: 100%;
    /* height: 20rem; */
    margin-top: var(--nav-height);
    position: relative;
    overflow: hidden;
    background-color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 0;

    &:before {
      content: "";
      background-color: black;
      position: absolute;
      width: 100rem;
      height: 100rem;
      top: 50%;
      left: 50%;
      background: url(/src/lib/images/tiles-white.png);
      background-size: 20rem;
      opacity: 0.1;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  .hero-content-container {
    border: 1px solid var(--secondary);
    background-color: var(--text);
    z-index: 5;
    color: var(--secondary);
    padding: 3rem 2.5rem;
    width: min(80%, 60rem);
  }
  h1.title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  p.description {
    margin-bottom: 1.5rem;
  }
  h3.length {
    font-size: 1.5rem;
  }
  a.play {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    z-index: 10;
    & button {
      padding: 1.25rem 5rem;
      border-radius: var(--br-small);
      font-size: 2.5rem;
      font-family: var(--font-big);
    }
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-top: 0.5rem;
  }
</style>
