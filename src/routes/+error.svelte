<script>
  import { page } from "$app/stores";
</script>

<div class="page-content">
  <section class="error">
    <h3>{$page.status} {$page.error.message}</h3>
    <a href="/">
      <button class="cta">back to home</button>
    </a>
  </section>
</div>

<style>
  section.error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
