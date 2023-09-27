<div class="page-content">
  <section class="hero">
    <div class="content">
      <h1>Recognise Patterns, Fast</h1>
      <p class="subheading">
        Get better at chess with Spaced Repetition
      </p>
      <div class="buttons">
        <button class="cta play-now">play puzzles</button>
        <button class="ghost learn-more">learn more</button>
      </div>
    </div>
    <img
      src={`/src/lib/images/hero.png`}
      class="bg"
      alt="hero"
      draggable="false"
    />
    <!-- <h2>The Science of Spaced Repetition</h2>
    <p>
      At the core of ReChess is the concept of spaced repetition—a
      scientifically proven technique for optimizing memory retention.
      We've tailored this technique specifically for chess enthusiasts
      like you. By systematically revisiting and reinforcing chess
      patterns, you'll sharpen your tactical skills and gain a deeper
      understanding of the game.
    </p> -->
  </section>
  <section class="features tiles-bg">
    <div class="features-container">
      <div class="feature">
        <h3>20k+ Puzzles</h3>
        <p>
          ReChess uses the top puzzles from the Lichess puzzles
          database, so whether you're a novice or an experienced
          player, there's always a challenge that matches your skill
          level.
        </p>
      </div>
      <div class="feature">
        <h3>Quality over Quantity</h3>
        <p>
          Repeating and mastering a select few puzzles is more
          beneficial than skimming through countless variations.
        </p>
      </div>
      <div class="feature">
        <h3>Spaced Repetition</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Odio impedit culpa adipisci corrupti pariatur mollitia eum
          dignissimos delectus, aperiam suscipit.
        </p>
      </div>
    </div>
  </section>

  <section class="how-it-works">
    <h2>How it works</h2>
    <div class="cards-container">
      <div class="card">
        <div class="left">
          <h1>1</h1>
          <h5>Choose Your Challenge</h5>
        </div>
        <div class="right">
          <p>
            Choose from a diverse range of playlists, with various
            difficulties and themes.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="left">
          <h1>2</h1>
          <h5>Solve Puzzles</h5>
        </div>
        <div class="right">
          <p>
            Dive into the chess puzzles and put your skills to the
            test.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="left">
          <h1>3</h1>
          <h5>Rate Your Experience</h5>
        </div>
        <div class="right">
          <p>
            After each puzzle, provide feedback on its difficulty
            level.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="left">
          <h1>4</h1>
          <h5>Spaced Repetition</h5>
        </div>
        <div class="right">
          <p>
            The algorithm determines when to reintroduce puzzles
            you've solved to enhance your pattern recognition skills.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="bottom-cta">
    <h1>Start playing now</h1>
    <button><h3>Browse puzzles</h3></button>
  </section>
</div>

<style>
  section.hero {
    width: min(80ch, 100% - 3rem);
    position: relative;
    height: calc(100svh - var(--nav-height));
    min-height: 35rem;
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
    & img.bg {
      position: absolute;
      right: 0;
      top: calc(50% - 16rem);
      max-width: none;
      width: min(110vw + 15rem, 65rem);
      height: auto;
      object-fit: cover;
      object-position: top;
      z-index: -1;

      @media screen and (max-width: 600px) {
        position: unset;
        width: 150%;
        object-fit: cover;
        align-self: flex-end;
        transform: translateY(-5rem);
        margin-top: auto;
      }
    }
  }
  section.hero > .content {
    position: relative;
    top: 45%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.5rem;
    padding-right: 15rem;
    & .buttons {
      display: flex;
      gap: 0.5rem;
      & button {
        border-radius: var(--br-small);
      }
    }
    @media screen and (max-width: 600px) {
      padding-right: 0;
      top: 2.5rem;
      transform: none;
      & .buttons {
        flex-direction: column;
        margin-top: 2rem;
      }
    }
  }

  section.features {
    width: 100%;
    /* width: 100svw; */
    /* position: absolute; */
    display: flex;
    justify-content: center;
    padding: 7.5rem 0;
  }
  .features-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    width: min(100ch, 100% - 5rem);
    gap: 3rem;
    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
    }
    & .feature {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  section.how-it-works {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 5rem 0;
  }
  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--primary);
    gap: 1rem;
    padding: 1.25rem;
    border-radius: var(--br);
    @media screen and (max-width: 800px) {
      max-width: 25rem;
      grid-template-columns: 1fr;
    }
  }
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: var(--br-small);
    overflow: hidden;
    aspect-ratio: 2;
    text-align: center;
    & .left,
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
    }
    & .left {
      flex-direction: column;
      gap: 0.5rem;
      background-color: var(--text);
      color: var(--secondary);
    }
    & .right {
      background-color: var(--secondary);
    }
    @media screen and (max-width: 800px) {
      &:nth-child(2n) .left {
        order: 1;
      }
    }
  }
  section.bottom-cta {
    background-color: var(--accent);
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    padding: 6rem 0;
    align-items: center;
    border-top: var(--border);
    text-align: center;
    padding-inline: 1.5rem;

    & button {
      background-color: var(--text);
      padding: 1.3rem 2.5rem;
      border-radius: var(--br-small);
    }
  }
</style>
