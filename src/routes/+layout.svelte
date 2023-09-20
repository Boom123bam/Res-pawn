<script>
  import Navbar from "./Navbar.svelte";
  import "./styles.css";
</script>

<div class="app">
  <header>
    <Navbar />
  </header>

  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
  }

  header {
    position: fixed;
    z-index: 100;
    width: 100%;
  }
  main {
    min-height: 100svh;
    width: min(75ch, 100% - 3rem);
    margin-inline: auto;
  }
</style>
