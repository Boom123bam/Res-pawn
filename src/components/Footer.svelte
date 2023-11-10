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
      <Svg name="github" color="var(--text)" size="1.75rem" />
    </a>
    <a
      class="float"
      href="https://discord.gg/b83Mkaghtb"
      target="_blank"
    >
      <Svg name="discord" color="var(--text)" size="1.75rem" />
    </a>
  </div>
  <div class="links">
    <h4>Links</h4>
    <a class="link" href="/">
      <h6>home</h6>
    </a>
    <a class="link" href="/playlists">
      <h6>browse</h6>
    </a>
    <a class="link" href="/article/spaced-repetition">
      <h6>about spaced repetition</h6>
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
    gap: 1.5rem;
    padding: 2.5rem 0 3rem;
    border-top: var(--border-dark);
    border-top-style: dashed;
  }
  .logos {
    display: flex;
    gap: 1.75rem;
  }
  .links {
    gap: 0.75rem;
  }
  .links h4 {
    margin-bottom: 0.25rem;
  }
  .contact {
    font-size: 0.75rem;
  }
  .contact a {
    font-weight: 700;
  }
</style>
