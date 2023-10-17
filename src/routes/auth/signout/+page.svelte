<script>
  import { signOut } from "@firebase/auth";
  import { auth } from "../../../firebase";
  import { goto } from "$app/navigation";
  import { storeSessionSeqData } from "../../../modules/sessionStorage";
  let errorMessage = "";

  async function handleSignOut() {
    try {
      await signOut(auth);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("user");
      }
      storeSessionSeqData(null);
      goto("/auth/signin"); // Redirect to the login page
    } catch (error) {
      console.error("error signing out", error);
      errorMessage = error.message;
    }
  }
  handleSignOut();
</script>

<h3>{errorMessage}</h3>
