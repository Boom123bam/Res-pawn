<script>
  import { page } from "$app/stores";
  import { userData } from "./userStore";

  let showRightMenu = false;
</script>

<nav>
  <ul>
    <li>
      <a href="/">
        <h4>ReChess</h4>
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
    {#if $userData}
      <li class="user">
        <button
          on:click={() => {
            showRightMenu = !showRightMenu;
          }}>{$userData.displayName}</button
        >
        {#if showRightMenu}
          <div class="popup-menu popup">
            <ul>
              <li>
                <a
                  on:click={() => {
                    showRightMenu = !showRightMenu;
                  }}
                  href="/auth/signout">Sign out</a
                >
              </li>
            </ul>
          </div>
        {/if}
      </li>
    {:else}
      <li class="user">
        <a href="/auth/signin">Sign In</a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    height: var(--nav-height);
    background-color: var(--secondary);
    border-bottom: 1px solid var(--text);
  }

  nav > ul {
    width: min(95ch, 100% - 3rem);
    margin: 0 auto;
    height: 100%;
    padding: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 4rem;

    & li.user {
      margin-left: auto;
      position: relative;
    }

    & li {
      height: 100%;
      display: flex;
      align-items: center;
    }

    & li[aria-current="page"],
    a:hover {
      text-decoration: underline;
    }
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
    right: 0;
    /* transform: translateX(-50%); */
    top: calc(var(--nav-height) + 0.5rem);
    width: 10rem;
    & ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 2.5rem;
    }
  }
</style>
