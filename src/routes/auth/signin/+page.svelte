<script>
    import { signInWithEmailAndPassword } from "@firebase/auth";
    import { auth } from "../../../firebase";
    import { storeAllUserSeqData } from "../../../modules/firestore";
    import {
        getLocalSeqData,
        updateLocalSeqData,
    } from "../../../modules/localStorage";

    let email = "";
    let password = "";
    let errorMessage = "";
    let signedIn = false;
    let savedProgress = false;

    async function handleSignIn() {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            // const userData = await getUserData(userCredential.user.uid);
            // userData.id = userCredential.user.uid;
            const uid = userCredential.user.uid;
            signedIn = true;
            const seqData = await getLocalSeqData();
            if (seqData) {
                await storeAllUserSeqData(uid, seqData);
                savedProgress = true;
            }
            updateLocalSeqData(uid);
        } catch (error) {
            errorMessage = error.message;
        }
    }
</script>

<svelte:head>
    <title>Sign in | Res-pawn</title>
    <meta name="description" content="Sign in to Res-pawn" />
    <meta
        name="keywords"
        content="sign in, res-pawn, res pawn, pattern recognition, chess puzzles, practice chess"
    />
</svelte:head>

<section>
    {#if !signedIn}
        <h3>Sign In</h3>

        <form>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} />

            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} />

            <button
                type="button"
                class="primary sign-in"
                on:click={handleSignIn}>Sign In</button
            >

            {#if errorMessage}
                <h5 class="error">{errorMessage}</h5>
            {/if}
        </form>
        <h4>Not registered?</h4>
        <a href="/auth/signup" class="link color">Sign Up</a>
    {:else}
        <h3>Signed In</h3>
        {#if savedProgress}
            <h5>Progress has been saved</h5>
        {/if}
        <a href="/"> <button class="primary home">back to home </button></a>
    {/if}
</section>

<style>
    h3 {
        margin-top: 1rem;
    }
    button.sign-in {
        width: 10rem;
        text-align: center;
        border-radius: var(--br);
        align-self: center;
    }
    button.home {
        margin-top: 1rem;
    }
    .error {
        align-self: center;
        --text: red;
    }
    h4 {
        margin-top: 3rem;
    }
    h5 {
        margin-top: 0.5rem;
    }
</style>
