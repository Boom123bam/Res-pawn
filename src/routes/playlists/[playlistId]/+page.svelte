<script>
  /** @type {import('./$types').PageData} */
  export let data;
  const { localPlaylistData } = data;
</script>

<div class="page-content">
  <p>playlist</p>
  <h1>{localPlaylistData.name}</h1>
  {#if localPlaylistData.description}
    <p>{localPlaylistData.description}</p>
  {/if}
  <h3>{localPlaylistData.sequences.length} sequences</h3>
  <button
    on:click={() => {
      console.log(data);
    }}>d</button
  >
</div>
