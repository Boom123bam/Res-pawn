<script>
  import { page } from "$app/stores";
  import { getLocalUserData } from "../modules/localStorage";

  let showRightMenu = false;
  let user = null;
  (async function getUser() {
    user = await getLocalUserData();
  })();
</script>

<nav>
  <ul>
    <li>
      <a href="/">
        <h2>RC</h2>
      </a>
    </li>
    <li
      aria-current={$page.url.pathname === "/" ? "page" : undefined}
    >
      <a href="/">home</a>
    </li>
    <li
      aria-current={$page.url.pathname === "/playlists"
        ? "page"
        : undefined}
    >
      <a href="/playlists">playlists</a>
    </li>
    {#if user}
      <li>
        <button
          on:click={() => {
            showRightMenu = !showRightMenu;
          }}>{user.username}</button
        >
      </li>
    {:else}
      <li>
        <a href="/auth/signin">Sign In</a>
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
    height: var(--nav-height);
    position: relative;
    background-color: var(--secondary);
    border-bottom: 1px solid var(--text);
  }

  ul {
    width: min(95ch, 100% - 5rem);
    margin: 0 auto;
    height: 100%;
    padding: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 4rem;
  }

  li:last-child {
    margin-left: auto;
  }

  li {
    height: 100%;
    display: flex;
    align-items: center;
  }

  li[aria-current="page"],
  a:hover {
    text-decoration: underline;
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
