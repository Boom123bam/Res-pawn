<script>
  import { page } from "$app/stores";
  import { userData } from "../routes/userStore";
  import Svg from "./Svg.svelte";
  import {
    getSetting,
    updateSettings,
  } from "../modules/localStorage";
  import { browser } from "$app/environment";
  import logo from "$lib/logo.svg";

  let showRightMenu = false;
  let showMobileMenu = false;
  let theme = "light";

  if (browser) {
    theme = getSetting("theme");
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
    updateSettings({ theme });
  }
</script>

<nav>
  <ul class="desktop">
    <li>
      <a class="link logo" href="/">
        <img src={logo} alt="ResPawn logo" />
        <h4>ResPawn</h4>
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
      <a class="link" href="/playlists">playlists</a>
    </li>
    <!-- <li
      aria-current={$page.url.pathname ===
      "/article/spaced-repetition"
        ? "page"
        : undefined}
    >
      <a class="link" href="/article/spaced-repetition"
        >spaced repetition</a
      >
    </li> -->
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
                  href="/settings">Settings</a
                >
              </li>
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
            <button class="primary sign-in">
              Sign In to save progress</button
            >
          {:else}
            <button class="primary sign-in float"> Sign In </button>
          {/if}
        </a>
      </li>
    {/if}
    <li class="dark-toggle" title="toggle dark mode">
      <button class="float" on:click={toggleDarkmode}>
        {#if theme == "dark"}
          <Svg name="sun" />
        {:else}
          <Svg name="moon_fill" />
        {/if}
      </button>
    </li>
  </ul>

  <ul class="mobile">
    <li>
      <a class="logo" href="/">
        <img src={logo} alt="ResPawn logo" />
        <h4>ResPawn</h4>
      </a>
    </li>
    <li class="hamburger">
      <button on:click={() => (showMobileMenu = !showMobileMenu)}>
        <Svg name="menu" />
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
            <li>
              <a href="/settings">settings</a>
            </li>
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
                <Svg name="moon_fill" />
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
    background-color: var(--background-alt);
    border-bottom: var(--border-light);
  }

  nav > ul {
    width: min(90ch, 100% - 3rem);
    margin: 0 auto;
    height: 100%;
    padding: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 3rem;
  }
  nav > ul li[aria-current="page"] {
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

  .logo {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .logo img {
    transition: transform 0.2s;
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (hover: hover) {
    .logo:hover img {
      transform: translateY(-0.25rem);
    }
    nav > ul a:hover {
      text-decoration: underline;
    }
  }

  .logo h4 {
    font-size: 1.25rem;
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
    border-left: var(--border-dark);
    width: 50%;
    height: 100%;
    background-color: var(--background-alt);
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
  .mobile-menu a,
  .mobile-menu button {
    padding: 1.5rem 2rem;
  }
  .mobile-menu .user-info {
    padding: 0 2rem 1rem;
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
  /* @media screen and (max-width: 1000px) {
    nav > ul {
      justify-content: space-between;
      gap: 0;
    }
    nav > ul li.user {
      margin-left: 0;
    }
  } */
  @media screen and (max-width: 800px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
    }
  }
</style>
