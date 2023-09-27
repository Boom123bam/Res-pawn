<script>
  import PlaylistCard from "../../components/PlaylistCard.svelte";

  export let data;
  const { playlists } = data;
  console.log(playlists);
</script>

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
