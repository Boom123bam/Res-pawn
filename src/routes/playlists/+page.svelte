<script>
  import PlaylistCard from "../../components/PlaylistCard.svelte";

  export let data;
  const { playlists } = data;
  console.log(playlists);
</script>

<div class="page-content">
  <h3>Browse Playlists</h3>
  <div class="card-grid">
    {#each playlists as playlist}
      <PlaylistCard playlistData={playlist} />
    {/each}
  </div>
</div>

<style>
  h3 {
    margin: 1rem 0;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
</style>
