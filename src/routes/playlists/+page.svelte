<script>
  import PlaylistCard from "../../components/PlaylistCard.svelte";

  export let data;
  const { playlists } = data;
</script>

<svelte:head>
  <title>Browse Playlists</title>
  <meta
    name="description"
    content="Chess puzzles playlists for any levels of play. Play puzzles and improve your pattern recognition skills."
  />
</svelte:head>

<div class="page-content">
  <section>
    <h3>Browse Playlists</h3>
    <div class="card-grid">
      {#each playlists as playlist}
        <PlaylistCard playlistData={playlist} />
      {/each}
    </div>
  </section>
</div>

<style>
  h3 {
    margin: 1rem 0;
  }
</style>
