<script>
  import { sendEmailVerification } from "firebase/auth";
  import { auth } from "../../../firebase";

  const actionCodeSettings = {
    url: "http://localhost:5173/auth/signout",
  };
  // sign out the user redirects them to sign in page, which will save the data after sign in
  // signing out and in refreshes auth token so that email_verified is updated in firestore rules
  // https://stackoverflow.com/questions/68025606/firebase-web-sdk-refreshing-auth-token-so-that-email-verified-is-updated-in-fir

  let resendButton;
  let verified = false;

  function sendEmail() {
    resendButton.disabled = true;
    setTimeout(function () {
      resendButton.disabled = false;
    }, 2000);
    if (!resendButton.disabled) {
      sendEmailVerification(auth.currentUser, actionCodeSettings);
    }
  }

  auth.onAuthStateChanged(function (user) {
    if (user) {
      if (!user.emailVerified)
        sendEmailVerification(user, actionCodeSettings);
      else verified = true;
    }
  });
</script>

<div class="flex-col">
  {#if !verified}
    <h3>Verification sent</h3>
    <h6>Check your email</h6>
    <button class="cta" bind:this={resendButton} on:click={sendEmail}>
      resend verification
    </button>
    <h6>Please sign in again after verification</h6>
  {:else}
    <h3>already verified</h3>
  {/if}
</div>
