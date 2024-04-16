<script>
    import { signOut } from '@firebase/auth';
    import { auth } from '../../../firebase';
    import { goto } from '$app/navigation';
    let errorMessage = '';

    async function handleSignOut() {
        try {
            await signOut(auth);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
            goto('/auth/signin'); // Redirect to the login page
        } catch (error) {
            console.error('error signing out', error);
            errorMessage = error.message;
        }
    }
    handleSignOut();
</script>

<svelte:head>
    <title>Sign out | Res-pawn</title>
    <meta name="description" content="Sign out of Res-pawn" />
    <meta
        name="keywords"
        content="sign out, res-pawn, res pawn, pattern recognition, chess puzzles, practice chess"
    />
</svelte:head>

<h3>{errorMessage}</h3>
