<script>
    import { sendEmailVerification } from "firebase/auth";
    import { auth } from "../../../firebase";

    const actionCodeSettings = {
        url: "http://localhost:5173/auth/signout",
    };
    // sign out the user redirects them to sign in page, which will save the data after sign in
    // signing out and in refreshes auth token so that email_verified is updated in firestore rules
    // https://stackoverflow.com/questions/68025606/firebase-web-sdk-refreshing-auth-token-so-that-email-verified-is-updated-in-fir

    let disabled = false;
    let verified = false;
    let secsCounter = 5;
    let showSentIndicator = false;

    function sendEmail(user = auth.currentUser) {
        if (!disabled) {
            sendEmailVerification(user, actionCodeSettings);
        }
        disabled = true;
        secsCounter = 20;
        showSentIndicator = true;
        setTimeout(() => {
            showSentIndicator = false;
        }, 2000);
        startCountDown();
    }

    function startCountDown() {
        decrementCount();
    }
    function decrementCount() {
        setTimeout(() => {
            secsCounter--;

            if (secsCounter <= 0) {
                endCountDown();
                return;
            }

            decrementCount();
        }, 1000);
    }
    function endCountDown() {
        disabled = false;
    }

    auth.onAuthStateChanged(function (user) {
        if (user) {
            if (!user.emailVerified) sendEmail(user);
            else verified = true;
        }
    });
</script>

<section>
    <div class="flex-col">
        {#if !verified}
            <h3>Verification sent</h3>
            <h6>Check your email</h6>
            <button
                class={`primary resend${showSentIndicator ? " sent" : ""}`}
                on:click={() => sendEmail()}
                {disabled}
            >
                {#if secsCounter}
                    <p>resend ({secsCounter})</p>
                {:else}
                    resend
                {/if}
            </button>
            <h6>Please sign in again after verification</h6>
        {:else}
            <h3>already verified</h3>
        {/if}
    </div>
</section>

<style>
    section {
        margin-top: 1rem;
    }
    button.resend.sent:disabled {
        opacity: 1;
    }
    button.resend {
        position: relative;
        overflow: hidden;
        transition: 0.5s;
        width: 12rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button.resend::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "sent";
        width: 100%;
        height: 100%;
        background: rgb(85, 141, 0);
        --text: var(--background-alt);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s;
        transform: translateY(-100%);
    }
    button.resend.sent::after {
        transform: none;
    }
</style>
