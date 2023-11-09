<script>
  import Svg from "./Svg.svelte";

  export let playlistData;
  const ratingString = playlistData.rating.length
    ? playlistData.rating.length == 2
      ? `${playlistData?.rating[0]}-${playlistData?.rating[1]}`
      : `${playlistData?.rating[0]}+`
    : "any";
</script>

<a
  data-sveltekit-preload-data="tap"
  href={`/playlists/${playlistData?.id}`}
>
  <div class="card">
    <p
      class="top-banner"
      style={`background-color: ${playlistData?.color};`}
    >
      rating: {ratingString}
    </p>
    <div class="content">
      <h3 class="name desktop">{playlistData?.name}</h3>
      <h4 class="mobile">{playlistData?.name}</h4>
      <p class="length">{playlistData?.sequences?.length} puzzles</p>
      <p class="description">
        {playlistData?.description ? playlistData.description : ""}
      </p>
    </div>
    <div class="play-button-wrapper">
      <a
        data-sveltekit-preload-data="tap"
        href={`/playlists/${playlistData?.id}/play`}
        ><button title="play playlist" class="cta">
          <Svg name="play_fill" color="white" size="2.25rem" />
        </button></a
      >
    </div>
  </div>
</a>

<style>
  .card {
    box-shadow: var(--shadow-down);
    border: var(--border-light);
    border-radius: var(--br);
    background-color: var(--secondary);
    padding: 2px;
    height: 18rem;
    /* width: 18rem; */
    transition: box-shadow 0.25s, transform 0.25s;
    position: relative;
    overflow: hidden;
  }

  .top-banner {
    border-top-right-radius: var(--br);
    border-top-left-radius: var(--br);
    padding: 0.75rem 1.75rem;
  }

  :global(body.dark) .top-banner {
    color: black;
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

  .play-button-wrapper {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .play-button-wrapper button {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (hover: none) {
    .play-button-wrapper button {
      background-color: var(--accent2);
    }
  }

  @media (hover: hover) {
    .card:hover {
      box-shadow: none;
      transform: translateY(0.25rem);
    }

    .play-button-wrapper {
      transition: 0.2s;
      transform: scale(0) rotate(180deg);
    }
    .card:hover .play-button-wrapper {
      transform: scale(1);
    }
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
    .play-button-wrapper {
      transform: none;
      transition: none;
    }
    .play-button-wrapper button {
      background-color: var(--accent2);
    }
  }
</style>
