<script>
    import { page } from "$app/stores";
    import { userData } from "../routes/userStore";
    import Svg from "./Svg.svelte";
    import { getSetting, updateSettings } from "../modules/localStorage";
    import { browser } from "$app/environment";
    import logo from "$lib/logo.svg";
    import { fly, scale } from "svelte/transition";

    let showDesktopPopupMenu = false;
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

    function toggleMobileMenu() {
        showMobileMenu = !showMobileMenu;
        if (browser && showMobileMenu) {
            setTimeout(() => {
                document.addEventListener(
                    "click",
                    () => (showMobileMenu = false),
                    {
                        once: true,
                    },
                );
            }, 0);
        }
    }
    function toggleDesktopPopup() {
        showDesktopPopupMenu = !showDesktopPopupMenu;
        if (browser && showDesktopPopupMenu) {
            setTimeout(() => {
                document.addEventListener(
                    "click",
                    () => (showDesktopPopupMenu = false),
                    {
                        once: true,
                    },
                );
            }, 0);
        }
    }
</script>

<nav>
    <a class="respawn" href="/">
        <img src={logo} alt="ResPawn logo" />
        <h4>ResPawn</h4>
    </a>
    <ul class={`links${showMobileMenu ? " show-mobile" : ""}`}>
        <li
            aria-current={$page.url.pathname === "/playlists"
                ? "page"
                : undefined}
        >
            <a class="link" href="/playlists">playlists</a>
        </li>
        <li
            aria-current={$page.url.pathname === "/settings"
                ? "page"
                : undefined}
        >
            <a href="/settings">settings</a>
        </li>
        {#if $userData}
            <li class="mobile-sign-out">
                <a href="/auth/signout">sign out</a>
            </li>
            <!-- {:else}
      <li class="mobile-sign-in">
        <a href="/auth/signin">sign in</a>
      </li> -->
        {/if}

        {#if $userData}
            <li class="username">
                <button on:click={toggleDesktopPopup}
                    >{$userData.displayName}</button
                >
                {#if showDesktopPopupMenu}
                    <div
                        in:scale
                        out:fly={{ y: 20 }}
                        class={`desktop-popup-menu popup${
                            showDesktopPopupMenu ? "" : " hidden"
                        }`}
                    >
                        <ul>
                            <li>
                                <a href="/auth/signout">Sign out</a>
                            </li>
                        </ul>
                    </div>
                {/if}
            </li>
        {:else}
            <li class="sign-in">
                <a href="/auth/signin" class="button-like primary">
                    <span>Sign In </span>
                    {#if $page.url.pathname.endsWith("/play")}
                        <span>to save progress</span>
                    {/if}
                </a>
            </li>
        {/if}
        <li class="dark-toggle">
            <button class="float" on:click={toggleDarkmode}>
                <span class="mobile-dark-toggle-text"
                    >{theme == "dark" ? "light" : "dark"}</span
                >
                {#if theme == "dark"}
                    <Svg name="sun" />
                {:else}
                    <Svg name="moon_fill" />
                {/if}
            </button>
        </li>

        {#if $userData}
            <li class="mobile-user-info">
                <small>signed in as</small>{$userData.displayName}
            </li>
        {/if}
    </ul>
    <button class="mobile-nav-toggle" on:click={toggleMobileMenu}
        ><Svg name="menu" /> <span class="sr-only">menu</span></button
    >
</nav>

<style>
    nav,
    nav > .respawn,
    nav > .links {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    nav {
        height: var(--nav-height);
        background: var(--background-alt);
        padding: 1rem 3rem;
        gap: 1rem;
        border-bottom: 1px solid var(--border-light);
        padding-inline: max(calc(40vw - 20rem), 1.5rem);
    }
    nav > .respawn {
        height: 100%;
        gap: 0.75rem;
    }
    nav > .respawn img {
        transition: 0.1s;
    }

    nav > .links {
        flex-grow: 1;
        justify-content: start;
        gap: 3rem;
        margin-left: 3rem;
    }

    nav > ul > .username,
    nav > ul > .sign-in {
        margin-left: auto;
        margin-right: -1.5rem;
    }
    nav > ul > .username {
        position: relative;
    }
    nav > ul > .username .desktop-popup-menu {
        position: absolute;
        top: 50%;
        padding: 1rem 2rem;
        width: max-content;
        right: 0;
        left: 50%;
        translate: -50% calc(var(--nav-height) / 2 + 0.5rem);
        transition: 0.1s;
        z-index: -1;
    }
    nav > ul > .username .desktop-popup-menu.hidden {
        translate: -50% 0;
    }

    nav > .mobile-nav-toggle,
    nav > ul > .mobile-sign-out,
    nav > ul > .mobile-user-info,
    nav > ul .mobile-dark-toggle-text {
        display: none;
    }

    @media (hover: hover) {
        nav > .respawn:hover img {
            transform: translateY(-0.25rem);
        }
        nav > ul a:hover {
            text-decoration: underline;
        }
    }

    @media (max-width: 47.5rem) {
        nav {
            position: relative;
        }
        nav > .respawn {
            margin-right: auto;
        }
        nav > .links {
            position: absolute;
            top: var(--nav-height);
            right: 0;
            background-color: var(--background-alt);
            flex-direction: column;
            padding: 3rem 0rem 3rem 1rem;
            width: max(50%, 15rem);
            border-left: 1px solid var(--border-light);
            height: calc(100svh - var(--nav-height));
            align-items: end;
            translate: 100%;
            transition: translate 0.5s;
            gap: 7.5%;
        }
        nav > .links > li > * {
            padding: 1rem 2rem;
            width: 100%;
            display: flex;
            justify-content: end;
        }
        nav > .links.show-mobile {
            translate: 0;
        }
        nav > .mobile-nav-toggle,
        nav > ul > .mobile-sign-out,
        nav > ul > .mobile-user-info,
        nav > ul .mobile-dark-toggle-text {
            display: block;
        }
        nav > ul > .username {
            display: none;
        }
        nav > ul > .sign-in {
            margin-right: 1rem;
            text-align: right;
        }
        nav > ul > .sign-in > a {
            flex-direction: column;
            align-items: end;
        }

        nav > ul > .dark-toggle {
            margin-top: auto;
            transform: none;
        }
        nav > ul .mobile-dark-toggle-text {
            margin-right: 0.5rem;
        }
    }
</style>
