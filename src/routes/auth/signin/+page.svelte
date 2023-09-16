<script>
  import { signInWithEmailAndPassword } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";
  import { storeUserData } from "../../../modules/localStorage";

  let email = "";
  let password = "";
  let errorMessage = "";

  const user = auth.currentUser;

  if (user) {
    // already signed in
    console.log("already signed in");
    goto("/home");
  }

  async function handleSignIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      storeUserData(userCredential.user);
      console.log("signed in");
      goto("/home"); // Redirect to the home page
    } catch (error) {
      errorMessage = error.message;
    }
  }
</script>

<h1>Login</h1>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<form>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} />

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} />

  <button type="button" on:click={handleSignIn}>Sign In</button>
</form>
