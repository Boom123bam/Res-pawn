<script>
  export let playlistData;
</script>

<a
  data-sveltekit-preload-data="tap"
  href={`/playlists/${playlistData.id}`}
>
  <div class="card">
    <div
      class="top-banner"
      style={`background-color: ${playlistData.color};`}
    >
      rating: {`${playlistData.rating[0]}-${playlistData.rating[1]}`}
    </div>
    <div class="content">
      <h2 class="name">{playlistData.name}</h2>
      <p class="length">{playlistData.sequences.length} puzzles</p>
      <p class="description">{playlistData.description}</p>
    </div>
  </div>
</a>

<style>
  .card {
    border: var(--border);
    border-radius: var(--br);
    background-color: var(--secondary);
    padding: 2px;
    height: 18rem;
    /* width: 18rem; */
    transition: box-shadow 0.25s, transform 0.25s;

    &:hover {
      box-shadow: 0.5rem 0.5rem 0;
      transform: translate(-0.25rem, -0.25rem);
    }
  }
  .top-banner {
    border-top-right-radius: var(--br);
    border-top-left-radius: var(--br);
    padding: 0.75rem 1.75rem;
  }
  .content {
    padding: 1.5rem 1.75rem;
  }
  h2.name {
    font-weight: 700;
  }
  p.length {
    font-family: var(--font-big);
    font-size: 1rem;
    margin-bottom: 1rem;
  }
</style>
