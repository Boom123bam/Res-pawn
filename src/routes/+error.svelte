<script>
    import { page } from "$app/stores";
</script>

<section class="error">
    <h3>{$page.status} {$page.error.message}</h3>
    <a href="/">
        <button class="primary">back to home</button>
    </a>
</section>

<style>
    section.error {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
</style>
