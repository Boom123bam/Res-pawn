<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<p>playlist</p>
<h1>{data.name}</h1>
{#if data.description}
  <p>{data.description}</p>
{/if}
<h3>{data.sequences.length} sequences</h3>
<button
  on:click={() => {
    console.log(data);
  }}>d</button
>
