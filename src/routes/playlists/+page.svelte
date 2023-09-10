<script>
  import { getPlaylistData } from "../../modules/firebase";
</script>

<button
  on:click={async () => {
    const data = await getPlaylistData("qWVckrPxsjQiByFsEFLz");
    console.log(data);
  }}
>
  asdf
</button>
