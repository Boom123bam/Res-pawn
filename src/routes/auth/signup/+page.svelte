<script>
  import {
    createUserWithEmailAndPassword,
    updateProfile,
  } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";
  import {
    addUserToCollection,
    checkIfUsernameTaken,
  } from "../../../modules/firebase";

  let username = "";
  let email = "";
  let password = "";
  let errorMessage = "";

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

      // add username to auth
      await updateProfile(newUser.user, { displayName: name });

      // add uid and username to database
      await addUserToCollection(newUser.user.uid, name);

      goto("/home");
    } catch (err) {
      errorMessage = err.message;
    }
  }
</script>

<div class="page-content">
  <section>
    <h1>Sign Up</h1>

    {#if errorMessage}
      <h3 style="color: red;">{errorMessage}</h3>
    {/if}

    <form>
      <label for="username">username:</label>
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
  </section>
</div>

<style>
  button.sign-up {
    width: 10rem;
    text-align: center;
    border-radius: var(--br);
    align-self: center;
  }
</style>
