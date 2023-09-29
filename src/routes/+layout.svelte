<script>
  import { auth } from "../firebase";
  import Navbar from "../components/Navbar.svelte";
  import "./reset.css";
  import "./styles.css";
  import { userData } from "./userStore";
  import Footer from "../components/Footer.svelte";
  import { page } from "$app/stores";

  auth.onAuthStateChanged(function (user) {
    if (user) {
      const { uid, displayName } = user;
      const data = { uid, displayName };
      userData.set(data);
    } else {
      userData.set(null);
    }
  });
</script>

<div class="app">
  <header>
    <Navbar />
  </header>

  <main>
    <slot />
  </main>

  {#if !$page.url.pathname.endsWith("play")}
    <footer>
      <Footer />
    </footer>
  {/if}
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
    margin-inline: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
