<section class="footer">
  <div class="content-wrapper">
    <a href="/">
      <h3 class="logo">ResPawn</h3>
    </a>
    <a href="/">
      <h5>home</h5>
    </a>
    <a href="/playlists">
      <h5>browse</h5>
    </a>
    <div class="contact">
      <h4>Contact</h4>
      <h5>name@email.com</h5>
    </div>
  </div>
</section>

<style>
  section.footer {
    border-top: var(--border);
    /* display: flex; */
  }
  .content-wrapper {
    width: min(90ch, 100% - 3rem);
    margin-inline: auto;
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 2.5rem 0;
  }
  .contact {
    margin-left: auto;
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  @media (hover: hover) {
    .content-wrapper a:hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 600px) {
    .content-wrapper {
      flex-direction: column;
      gap: 1.5rem;
    }
    .contact {
      text-align: center;
      margin-left: unset;
    }
  }
</style>
