<script>
  import Svg from "./Svg.svelte";
</script>

<section class="footer">
  <div class="logos">
    <a
      class="float"
      href="https://github.com/Boom123bam/ResPawn"
      target="_blank"
    >
      <Svg name="github" color="var(--text)" size="2.5rem" />
    </a>
    <a
      class="float"
      href="https://discord.gg/b83Mkaghtb"
      target="_blank"
    >
      <Svg name="discord" color="var(--text)" size="2.5rem" />
    </a>
  </div>
  <div class="links">
    <h3>Links</h3>
    <a class="link" href="/">
      <h5>home</h5>
    </a>
    <a class="link" href="/playlists">
      <h5>browse</h5>
    </a>
    <a class="link" href="/article/spaced-repetition">
      <h5>about spaced repetition</h5>
    </a>
  </div>
  <div class="contact">
    contact: <a class="link" href="mailto:b.tgchf2@gmail.com"
      >b.tgchf2@gmail.com</a
    >
  </div>
</section>

<style>
  section.footer,
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  section.footer {
    gap: 2.75rem;
    padding: 5rem 0;
    border-top: var(--border);
  }
  .logos {
    display: flex;
    gap: 1.75rem;
  }
  .links {
    gap: 1rem;
  }
  .contact a {
    font-weight: 700;
  }
</style>
