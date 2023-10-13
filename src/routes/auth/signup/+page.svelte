<script>
  import {
    createUserWithEmailAndPassword,
    updateProfile,
  } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import {
    addUserToCollection,
    checkIfUsernameTaken,
    storeAllUserSeqData,
  } from "../../../modules/firebase";
  import { userData } from "../../userStore";
  import { getLocalUserSeqData } from "../../../modules/sessionStorage";

  let username = "";
  let email = "";
  let password = "";
  let errorMessage = "";
  let savedProgress = false;

  async function register(name, email, password) {
    try {
      // Check if username is long enough
      if (name.length < 5)
        throw new Error(
          "username must be at least 5 characters long"
        );
      // Check if the username is already taken
      const usernameTaken = await checkIfUsernameTaken(name);
      if (usernameTaken) throw new Error("username is taken");

      // Not taken, register user
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = newUser.user.uid;
      const displayName = name;

      // update store to show username because username is null
      const data = { uid, displayName };
      userData.set(data);

      // add username to auth
      await updateProfile(newUser.user, { displayName });
      // add uid and username to database
      await addUserToCollection(newUser.user.uid, name);
      const seqData = await getLocalUserSeqData();
      if (seqData) {
        await storeAllUserSeqData(newUser.user.uid, seqData);
        savedProgress = true;
      }
    } catch (err) {
      errorMessage = err.message;
    }
  }
</script>

<section>
  {#if !$userData}
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
        class="cta sign-up"
        on:click={() => {
          register(username, email, password);
        }}>Sign Up</button
      >
    </form>
    <h4>Have an account?</h4>
    <a href="/auth/signin" class="link color">Sign In</a>
  {:else}
    <h3>Already signed in</h3>
    {#if savedProgress}
      <h5>Progress has been saved</h5>
    {/if}
    <a href="/playlists">
      <button class="cta">go to playlists</button></a
    >
  {/if}
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
