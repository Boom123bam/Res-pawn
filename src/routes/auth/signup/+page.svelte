<script lang="ts">
    import {
        createUserWithEmailAndPassword,
        updateProfile,
    } from "@firebase/auth";
    import { auth } from "../../../firebase";
    import {
        addUserToCollection,
        checkIfUsernameTaken,
    } from "../../../modules/firestore";
    import { userData } from "../../userStore";
    import { goto } from "$app/navigation";

    let username = "";
    let email = "";
    let password = "";
    let errorMessage = "";

    async function register(name, email, password) {
        try {
            // Check if username is long enough
            if (name.length < 5)
                throw new Error("username must be at least 5 characters long");
            // Check if the username is already taken
            const usernameTaken = await checkIfUsernameTaken(name);
            if (usernameTaken) throw new Error("username is taken");

            // Not taken, register user
            const newUserCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const newUser = newUserCredential.user;

            const uid = newUser.uid;
            const displayName = name;

            // update store to show username because username is null
            const data = { uid, displayName };
            userData.set(data);

            // add username to auth
            await updateProfile(newUser, { displayName });
            // add uid and username to database
            await addUserToCollection(newUser.uid, name);

            // redirect to verify page
            goto(`/auth/verify`);
        } catch (err) {
            errorMessage = err.message;
        }
    }
</script>

<svelte:head>
    <title>Sign up | Res-pawn</title>
    <meta name="description" content="Sign up to Res-pawn" />
    <meta
        name="keywords"
        content="sign up, res-pawn, res pawn, pattern recognition, chess puzzles, practice chess"
    />
</svelte:head>

<section>
    <h3>Sign Up</h3>

    {#if errorMessage}
        <h4 style="color: red;">{errorMessage}</h4>
    {/if}

    <form>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />

        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} />

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} />

        <button
            type="button"
            class="primary sign-up"
            on:click={() => {
                register(username, email, password);
            }}>Sign Up</button
        >
    </form>
    <h4>Have an account?</h4>
    <a href="/auth/signin" class="link color">Sign In</a>
</section>

<style>
    h3 {
        margin: 1rem 0;
    }
    button.sign-up {
        width: 10rem;
        text-align: center;
        border-radius: var(--br);
        align-self: center;
    }
</style>
