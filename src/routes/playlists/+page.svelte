<script>
    import PlaylistCard from '../../components/PlaylistCard.svelte';

    export let data;
    const { playlists } = data;
</script>

<svelte:head>
    <title>Playlists | Res-pawn</title>
    <meta
        name="description"
        content="Chess puzzles playlists for any levels of play. Play puzzles and improve your pattern recognition skills."
    />
    <meta
        name="keywords"
        content="playlists, res-pawn, res pawn, pattern recognition, chess puzzles, practice chess"
    />
</svelte:head>

<section>
    <h3>Browse Playlists</h3>
    <div class="card-grid">
        {#each playlists as playlist}
            <PlaylistCard playlistData={playlist} />
        {/each}
    </div>
</section>

<style>
    h3 {
        margin: 1rem 0;
    }
</style>
