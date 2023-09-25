<script>
  import { signOut } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";
  let errorMessage = "";

  async function handleSignOut() {
    try {
      await signOut(auth);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("user");
      }
      console.log("signed out");
      goto("/auth/signin"); // Redirect to the login page
    } catch (error) {
      errorMessage = error.message;
    }
  }
  handleSignOut();
</script>

<h1>{errorMessage}</h1>
