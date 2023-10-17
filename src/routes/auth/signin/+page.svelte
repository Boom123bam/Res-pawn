<script>
  import { signInWithEmailAndPassword } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import {
    getUserData,
    storeAllUserSeqData,
  } from "../../../modules/firebase";
  import { getSessionSeqData } from "../../../modules/sessionStorage";

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
      const userData = await getUserData(userCredential.user.uid);
      userData.id = userCredential.user.uid;
      signedIn = true;
      const seqData = await getSessionSeqData();
      if (seqData) {
        await storeAllUserSeqData(userCredential.user.uid, seqData);
        savedProgress = true;
      }
    } catch (error) {
      errorMessage = error.message;
    }
  }
</script>

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
        class="sign-in cta"
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
    <a href="/"> <button class="cta home">back to home </button></a>
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
    color: red;
  }
  h4 {
    margin-top: 3rem;
  }
  h5 {
    margin-top: 0.5rem;
  }
</style>
