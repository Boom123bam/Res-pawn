<script>
  import { createUserWithEmailAndPassword } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";

  const user = auth.currentUser;

  if (user) {
    // already signed in
    console.log("already signed in");
    goto("/home");
  }

  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleSignIn() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signed up");
      goto("/home"); // Redirect to the home page
    } catch (error) {
      errorMessage = error.message;
    }
  }
</script>

<h1>Sign Up</h1>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<form>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} />

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} />

  <button type="button" on:click={handleSignIn}>Sign Up</button>
</form>
