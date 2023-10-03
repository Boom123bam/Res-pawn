<script>
  import { page } from "$app/stores";
  import { userData } from "../routes/userStore";
  import Svg from "./Svg.svelte";

  let showRightMenu = false;
  let showMobileMenu = false;
  let theme = "light";

  if (typeof window !== "undefined") {
    let theme = localStorage.getItem("theme");
    if (!theme) theme = "light";

    if (theme == "dark") {
      document.body.classList.add("dark");
    } else if (theme == "light") {
      document.body.classList.remove("dark");
    }
  }
  function toggleDarkmode() {
    document.body.classList.toggle("dark");
    theme = theme == "dark" ? "light" : "dark";
  }
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
        <a href="/auth/signin">
          {#if $page.url.pathname.endsWith("/play")}
            <button class="cta sign-in">
              Sign In to save progress</button
            >
          {:else}
            <button class="cta sign-in"> Sign In </button>
          {/if}
        </a>
      </li>
    {/if}
    <li class="dark-toggle" title="toggle dark mode">
      <button on:click={toggleDarkmode}>
        {#if theme == "dark"}
          <Svg name="sun" />
        {:else}
          <Svg name="moon" />
        {/if}
      </button>
    </li>
  </ul>

  <ul class="mobile">
    <li>
      <a href="/">
        <h4>ReChess</h4>
      </a>
    </li>
    <li class="hamburger">
      <button on:click={() => (showMobileMenu = !showMobileMenu)}>
        <Svg name="burger" />
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
              {#if $page.url.pathname.endsWith("/play")}
                <a href="/auth/signin">sign In to save progress</a>
              {:else}
                <a href="/auth/signin">sign In</a>
              {/if}
            </li>
          {/if}
          <li class="dark-toggle">
            <button
              on:click={toggleDarkmode}
              title="toggle dark mode"
            >
              {#if theme == "dark"}
                <span>light</span>
                <Svg name="sun" />
              {:else}
                <span>dark</span>
                <Svg name="moon" />
              {/if}
            </button>
          </li>
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
    color: var(--text);
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
  button.sign-in {
    padding: 0.5rem 1rem;
    border-radius: var(--br-small);
    font-weight: 400;
  }
  .desktop .dark-toggle {
    margin-left: -3rem;
  }
  .desktop .dark-toggle button {
    height: 100%;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
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
    order: 10;
  }
  .mobile-menu .dark-toggle {
    margin-top: auto;
  }
  .mobile-menu .dark-toggle button {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: end;
  }
  @media screen and (max-width: 750px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
    }
  }
</style>
