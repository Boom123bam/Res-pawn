<script>
  import { createPlaylist } from "../../modules/firebase";
</script>

<div class="page-content">
  <button
    class="cta"
    on:click={() => {
      createPlaylist("test2", [1, 2, 3]);
    }}>add</button
  >
</div>
