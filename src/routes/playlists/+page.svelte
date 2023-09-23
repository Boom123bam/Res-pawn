<script>
  export let data;
  const { playlists } = data;
  console.log(playlists);
</script>

<div class="page-content">
  {#each playlists as playlist}
    <div class="playlist-card">
      <a href={`/playlists/${playlist.id}`}>
        <h2>{playlist.name}</h2>
        <p>{playlist.description}</p>
        <p>{`${playlist.sequences.length} seqs`}</p>
      </a>
    </div>
  {/each}
</div>
