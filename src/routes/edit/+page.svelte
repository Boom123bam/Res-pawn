<script>
    import { createPlaylist } from "../../modules/firestore";
</script>

<button
    class="primary"
    on:click={() => {
        createPlaylist(
            "test",
            "#112233",
            [0, 6969],
            ["06scF", "0GIYq", "0IPAb"]
        );
    }}>add</button
>
