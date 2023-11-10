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

<svelte:head>
  <title>{`${localPlaylistData.name}`}</title>
  <meta
    name="description"
    content="${localPlaylistData?.description
      ? localPlaylistData.description
      : `Play chess puzzles:  ${localPlaylistData.name}`}"
  />
</svelte:head>

<section class="hero-wrapper">
  <div class="hero tiles-bg invert">
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
    <button class="primary">play</button>
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
    border: 1px solid var(--background-alt);
    background-color: inherit;
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
    font-size: 2.5rem;
    font-family: var(--font-big);
  }
  section.other-playlists {
    margin-top: 3rem;
  }
  section.other-playlists h4 {
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 600px) {
    section.other-playlists {
      margin-top: 5rem;
    }
  }
</style>
