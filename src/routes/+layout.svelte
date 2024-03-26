<script>
    import { auth } from "../firebase";
    import Navbar from "../components/Navbar.svelte";
    import "./reset.css";
    import "./styles.css";
    import { userData } from "./userStore";
    import Footer from "../components/Footer.svelte";
    import { page } from "$app/stores";
    import "./layout.css";

    auth.onAuthStateChanged(function (user) {
        if (user) {
            const { uid, displayName, emailVerified } = user;
            const data = { uid, displayName, emailVerified };
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
