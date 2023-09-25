<script>
  import { signInWithEmailAndPassword } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";
  import { storeUserData } from "../../../modules/localStorage";
  import { getUserData } from "../../../modules/firebase";

  let email = "";
  let password = "";
  let errorMessage = "";
  let signedIn = false;

  const user = auth.currentUser;

  async function handleSignIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = await getUserData(userCredential.user.uid);
      userData.id = userCredential.user.uid;
      storeUserData(userData);
      // signed in
      // goto("/"); // Redirect to the home page
      // location.reload();
      signedIn = true;
    } catch (error) {
      errorMessage = error.message;
    }
  }

  //TODO after sign in show button that refreshes and goes to home page
</script>

<div class="page-content">
  {#if !signedIn}
    <h2>Sign In</h2>

    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}

    <form>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} />

      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} />

      <button
        type="button"
        class="sign-in cta"
        on:click={handleSignIn}>Sign In</button
      >
    </form>
    <h3>Not registered?</h3>
    <a href="/auth/signup" class="sign-up">Sign Up</a>
  {:else}
    <h2>Signed In</h2>
    <button data-sveltekit-reload class="cta home"
      ><a href="/">back to home</a>
    </button>
  {/if}
</div>

<style>
  h2 {
    margin-top: 1rem;
  }
  button.sign-in {
    width: 10rem;
    text-align: center;
    border-radius: var(--br);
    align-self: center;
  }
  .sign-up {
    color: var(--accent);
    &:hover {
      text-decoration: underline;
    }
  }
  button.home {
    margin-top: 1rem;
  }
</style>
