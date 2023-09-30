<script>
  import { page } from "$app/stores";
  import { userData } from "../routes/userStore";

  let showRightMenu = false;
  let showMobileMenu = false;
</script>

<nav>
  <ul class="desktop">
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

  <ul class="mobile">
    <li>
      <a href="/">
        <h4>ReChess</h4>
      </a>
    </li>
    <li class="hamburger">
      <button on:click={() => (showMobileMenu = !showMobileMenu)}>
        <img
          src={`/images/icons/hamburger.svg`}
          alt="menu"
          draggable="false"
        />
      </button>
    </li>
  </ul>

  {#if showMobileMenu}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:click={() => (showMobileMenu = !showMobileMenu)}
      class="menu-background"
    >
      <div class="mobile-menu">
        <ul>
          <li
            aria-current={$page.url.pathname === "/"
              ? "page"
              : undefined}
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
              <a href="/auth/signout">sign out</a>
            </li>
            <li class="user-info">
              <small>
                signed in as {$userData.displayName}
              </small>
            </li>
          {:else}
            <li class="user">
              <a href="/auth/signin">sign In</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  {/if}
</nav>

<style>
  nav {
    height: var(--nav-height);
    background-color: var(--secondary);
    border-bottom: var(--border);
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
  }
  nav > ul li[aria-current="page"],
  nav > ul a:hover {
    text-decoration: underline;
  }
  nav > ul li {
    height: 100%;
    display: flex;
    align-items: center;
  }
  nav > ul li.user {
    margin-left: auto;
    position: relative;
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
  }
  .popup-menu ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2.5rem;
  }
  .mobile {
    display: none;
  }
  .hamburger {
    margin-left: auto;
  }
  .menu-background {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: var(--nav-height);
    background-color: #00000050;
    z-index: -1;
  }
  .mobile-menu {
    border-left: var(--border);
    width: 50%;
    height: 100%;
    background-color: var(--secondary);
    transform: translateX(100%);
    align-items: end;
    text-align: right;
    padding-top: 2rem;
  }
  .mobile-menu ul {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .mobile-menu li {
    padding: 2rem 2rem;
  }
  .mobile-menu .user-info {
    margin-top: auto;
  }

  @media screen and (max-width: 600px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
    }
  }
</style>