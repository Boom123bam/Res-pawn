<script>
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import { auth } from "../firebase";
  import { onAuthStateChanged } from "@firebase/auth";

  let showRightMenu = false;
  let user = auth.currentUser;

  onAuthStateChanged(auth, (newUser) => {
    user = newUser;
  });
</script>

<nav>
  <ul>
    <li>
      <a href="/">
        <img src={logo} alt="SvelteKit" />
      </a>
    </li>
    <li
      aria-current={$page.url.pathname === "/home"
        ? "page"
        : undefined}
    >
      <a href="/home">home</a>
    </li>
    <li
      aria-current={$page.url.pathname === "/decks"
        ? "page"
        : undefined}
    >
      <a href="/decks">my decks</a>
    </li>
    <li
      aria-current={$page.url.pathname.startsWith("/play")
        ? "page"
        : undefined}
    >
      <a href="/play">play</a>
    </li>
    {#if user}
      <li>
        <button
          on:click={() => {
            showRightMenu = !showRightMenu;
          }}>menu</button
        >
      </li>
    {:else}
      <li>
        <a href="/signin">Sign In</a>
      </li>
    {/if}
  </ul>
  {#if showRightMenu}
    <div class="popup-menu">
      <ul>
        <li><a href="/profile">My profile</a></li>
        <li><a href="/collections">My collections</a></li>
        <li><a href="/auth/signout">Sign out</a></li>
      </ul>
    </div>
  {/if}
</nav>

<style>
  nav {
    height: 3rem;
    position: relative;
    background-color: var(--secondary);
    border-bottom: 1px solid var(--text);
  }

  ul {
    width: min(65ch, 100% - 3rem);
    margin: 0 auto;
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  li:first-child {
    margin-right: auto;
  }
  li:last-child {
    margin-left: auto;
  }

  li {
    height: 100%;
    display: flex;
    align-items: center;
  }

  li[aria-current="page"] {
    border-bottom: 1px solid black;
  }

  a {
    text-decoration: none;
    color: black;
    display: block;
  }

  a:has(img) {
    height: 100%;
  }

  .popup-menu {
    position: absolute;
    right: 1rem;
    background-color: var(--background);
    & ul {
      display: flex;
      flex-direction: column;
    }
  }
</style>
