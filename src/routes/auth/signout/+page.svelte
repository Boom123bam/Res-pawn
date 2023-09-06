<script>
  import { signOut } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";

  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("signed out");
      goto("/auth/signin"); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
</script>

<h1>Home</h1>

<button type="button" on:click={handleSignOut}>Sign Out</button>
