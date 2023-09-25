<script>
  import { auth } from "../firebase";
  import Navbar from "./Navbar.svelte";
  import "./styles.css";
  import { userData } from "./userStore";

  auth.onAuthStateChanged(function (user) {
    console.log("auth state change", user);
    if (user) {
      userData.set(user);
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
