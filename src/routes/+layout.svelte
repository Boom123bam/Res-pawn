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

  <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn
      SvelteKit
    </p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    position: fixed;
    z-index: 100;
    width: 100%;
  }
  main {
    /* position: absolute; */
    /* top: 3rem; */
    width: min(85ch, 100% - 3rem);
    height: 100%;
    margin-inline: auto;
    padding-top: 5rem;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }
</style>
