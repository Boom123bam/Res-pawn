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
    <h3>buttons</h3>
    <button class="primary">button</button>
    <button class="primary shadow">button</button>
    <button class="secondary">button</button>
    <button class="secondary shadow">button</button>
    <button class="outline">button</button>
    <button class="outline shadow">button</button>
</div>
