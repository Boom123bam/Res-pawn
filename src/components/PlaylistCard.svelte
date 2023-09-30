<script>
  export let playlistData;
  console.log(playlistData);
</script>

<a
  data-sveltekit-preload-data="tap"
  href={`/playlists/${playlistData?.id}`}
>
  <div class="card">
    <div
      class="top-banner"
      style={`background-color: ${playlistData?.color};`}
    >
      rating: {`${playlistData?.rating[0]}-${playlistData?.rating[1]}`}
    </div>
    <div class="content">
      <h3 class="name desktop">{playlistData?.name}</h3>
      <h4 class="mobile">{playlistData?.name}</h4>
      <p class="length">{playlistData?.sequences?.length} puzzles</p>
      <p class="description">
        {playlistData?.description
          ? playlistData.description
          : "no description"}
      </p>
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
  }
  .card:hover {
    box-shadow: 0.5rem 0.5rem 0;
    transform: translate(-0.25rem, -0.25rem);
  }
  .top-banner {
    border-top-right-radius: var(--br);
    border-top-left-radius: var(--br);
    padding: 0.75rem 1.75rem;
  }
  .content {
    padding: 1.5rem 1.75rem;
  }
  .content h3 {
    margin-bottom: 0.25rem;
  }
  p.length {
    font-family: var(--font-big);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 600px) {
    .card {
      height: 15rem;
    }
    .content {
      /* display: flex; */
      gap: 1rem;
      padding: 1rem;
    }
    .top-banner {
      padding: 0.5rem 1rem;
    }
    p.length {
      margin-bottom: 0.25rem;
    }
  }
</style>
