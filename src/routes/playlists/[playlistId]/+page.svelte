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

<div class="page-content">
  <section class="hero-wrapper">
    <div class="hero tiles-bg">
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
  </section>

  <section class="other-playlists">
    <h4>Other playlists</h4>
    <div class="card-grid">
      {#each playlists as playlist}
        <PlaylistCard playlistData={playlist} />
      {/each}
    </div>
  </section>
</div>

<style>
  .hero-wrapper {
    position: relative;
    width: 100%;
  }
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 0;
  }
  .hero-content-container {
    border: 1px solid var(--secondary);
    background-color: var(--text);
    z-index: 5;
    padding: 3rem 2.5rem;
    width: min(80%, 60rem);
  }
  h1.title {
    font-size: 3rem;
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
  }
  a.play button {
    padding: 1.25rem 5rem;
    border-radius: var(--br-small);
    font-size: 2.5rem;
    font-family: var(--font-big);
  }
  section.other-playlists {
    margin-top: 3rem;
  }
  section.other-playlists h4 {
    margin-bottom: 0.5rem;
  }
</style>
