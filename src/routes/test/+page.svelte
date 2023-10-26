<script>
  import { sendEmailVerification } from "firebase/auth";
  import { auth } from "../../firebase";

  function verify(user) {
    sendEmailVerification(user);
  }
</script>

<div class="page-content">
  <button on:click={() => verify(auth.currentUser)}>send</button>
  <button on:click={() => console.log(auth.currentUser.emailVerified)}
    >ver</button
  >
</div>
