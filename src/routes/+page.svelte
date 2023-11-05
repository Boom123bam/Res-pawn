<script>
  let howSection; // binds to html of 'how this works section'
  import Saos from "saos";
  import ChessBoard3d from "../components/ChessBoard3d.svelte";
  import ExpandableCard from "../components/ExpandableCard.svelte";
</script>

<svelte:head>
  <!-- HTML Meta Tags -->
  <title>ResPawn - Practice Chess Pattern Recognition</title>
  <meta
    name="description"
    content="Play puzzles and improve your chess skills by practicing pattern recognition with spaced repetition."
  />
  <meta
    name="keywords"
    content="ResPawn, res-pawn, res pawn, pattern recognition, chess puzzles, practice chess"
  />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://res-pawn.com" />
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="ResPawn - Practice Chess Pattern Recognition"
  />
  <meta
    property="og:description"
    content="Play puzzles and improve your chess skills by practicing pattern recognition with spaced repetition."
  />
  <meta property="og:image" content="/images/thumbnail.png" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="res-pawn.com" />
  <meta property="twitter:url" content="https://res-pawn.com" />
  <meta
    name="twitter:title"
    content="ResPawn - Practice Chess Pattern Recognition"
  />
  <meta
    name="twitter:description"
    content="Play puzzles and improve your chess skills by practicing pattern recognition with spaced repetition."
  />
  <meta name="twitter:image" content="/images/thumbnail.png" />
</svelte:head>

<section class="hero">
  <div class="content">
    <Saos animation={"slide-left 0.25s"}>
      <h1>Recognise Patterns, Fast</h1>
    </Saos>
    <Saos
      animation={"slide-left 0.25s 0.1s forwards"}
      css_animation={"opacity:0;"}
    >
      <h5 class="subheading">
        <!-- Practice pattern recognition with <a
          class="link color"
          href="/article/spaced-repetition">spaced repetition</a
        > by playing puzzles! -->
        Practice pattern recognition with spaced repetition by playing
        puzzles!
      </h5>
    </Saos>
    <div class="buttons">
      <a href="/playlists">
        <button class="cta float play-now"> play puzzles </button>
      </a>
      <button
        on:click={() =>
          howSection.scrollIntoView({
            block: "nearest",
          })}
        class="ghost float learn-more">learn more</button
      >
    </div>
  </div>
  <img
    src={`/images/hero.png`}
    class="bg"
    alt="hero"
    draggable="false"
  />
  <!-- <h2>The Science of Spaced Repetition</h2>
    <p>
      At the core of ResPawn is the concept of spaced repetition—a
      scientifically proven technique for optimizing memory retention.
      We've tailored this technique specifically for chess enthusiasts
      like you. By systematically revisiting and reinforcing chess
      patterns, you'll sharpen your tactical skills and gain a deeper
      understanding of the game.
    </p> -->
</section>
<section class="features tiles-bg invert">
  <div class="features-container">
    <Saos
      animation={"slide-left 0.25s 0s both"}
      animation_out={"fade-out-down 0.25s both"}
      top={100}
    >
      <div class="feature">
        <h3>Quality over Quantity</h3>
        <p>
          Repeating and mastering a select few puzzles is more
          beneficial than skimming through countless variations.
        </p>
      </div>
    </Saos>
    <Saos
      animation={"slide-left 0.25s 0.1s both"}
      animation_out={"fade-out-down 0.25s both"}
      top={100}
    >
      <div class="feature">
        <h3>Spaced Repetition</h3>
        <p>
          A spaced repetition algorithm is used to determine when the
          optimal time to present you with each puzzle is.
        </p>
      </div>
    </Saos>
    <Saos
      animation={"slide-left 0.25s 0.2s both"}
      animation_out={"fade-out-down 0.25s both"}
      top={100}
    >
      <div class="feature">
        <h3>20k+ Puzzles</h3>
        <p>
          Whether you're a novice or an experienced player, there's
          always a challenge that matches your skill level. Puzzles
          are from the Lichess puzzles database.
        </p>
      </div>
    </Saos>
  </div>
</section>

<section class="how-it-works" bind:this={howSection}>
  <h2>How it works</h2>
  <div class="cards-container">
    <Saos
      animation={"scale 0.25s 0s both"}
      animation_out={"fade-out-down 0.25s 0.1s both"}
      top={100}
    >
      <div class="card first">
        <div class="black invert">
          <h1>1</h1>
          <h5>Choose Your Challenge</h5>
        </div>
        <div class="white">
          <p>
            Choose from a diverse range of playlists, with various
            difficulties and themes.
          </p>
        </div>
      </div>
    </Saos>
    <Saos
      animation={"scale 0.25s 0.1s both"}
      animation_out={"fade-out-down 0.25s both"}
      top={100}
    >
      <div class="card second">
        <div class="black invert">
          <h1>2</h1>
          <h5>Solve Puzzles</h5>
        </div>
        <div class="white">
          <p>
            Dive into the chess puzzles and put your skills to the
            test.
          </p>
        </div>
      </div>
    </Saos>
    <Saos
      animation={"scale 0.25s 0s both"}
      animation_out={"fade-out-down 0.25s 0.1s both"}
      top={100}
    >
      <div class="card third">
        <div class="black invert">
          <h1>3</h1>
          <h5>Rate Your Experience</h5>
        </div>
        <div class="white">
          <p>
            After each puzzle, provide feedback on its difficulty
            level.
          </p>
        </div>
      </div>
    </Saos>
    <Saos
      animation={"scale 0.25s 0.1s both"}
      animation_out={"fade-out-down 0.25s both"}
      top={100}
    >
      <div class="card fourth">
        <div class="black invert">
          <h1>4</h1>
          <h5>Spaced Repetition</h5>
        </div>
        <div class="white">
          <p>
            The algorithm determines when to reintroduce puzzles
            you've solved to enhance your pattern recognition skills.
          </p>
        </div>
      </div>
    </Saos>
  </div>
  <ExpandableCard title="What is Spaced Repetition?">
    <div class="dropdown-content">
      <img src="/images/SRgraph.png" alt="spaced repetition graph" />
      <span><i>graph of spaced repetition</i></span>

      <p>
        Spaced Repetition is a learning technique that enhances memory
        retention through review and repetition of material over
        increasing intervals of time (shown by the graph above). This
        makes learning more effective and efficient. It is widely used
        in various educational contexts to maximize the efficiency of
        study and training.
      </p>
      <p>
        <a class="link color" href="/article/spaced-repetition"
          >learn more about Spaced Repetition</a
        >
      </p>
    </div>
  </ExpandableCard>
  <ExpandableCard title="How does ResPawn use Spaced Repetition?">
    <div class="dropdown-content">
      <img
        src="/images/feedback-system.png"
        alt="spaced repetition graph"
      />
      <span><i>ResPawn feedback system</i></span>
      <p>
        After a puzzle is played, you will provide a rating on how
        challenging the puzzle was (as shown by the image above).
        ResPawn uses this rating and runs a spaced repetition
        algorithm to determine when the puzzle appears next. A higher
        difficulty rating will result in sooner review time, vice
        versa.
      </p>
    </div>
  </ExpandableCard>
</section>

<section class="bottom-cta">
  <h1>Start playing now</h1>

  <Saos
    animation={"fade-in-up 0.25s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0.1s both"}
  >
    <div class="chess-board-container">
      <ChessBoard3d />
    </div>
  </Saos>

  <Saos
    animation={"fade-in-up 0.25s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"}
    animation_out={"fade-out-down 0.25s both"}
    top={100}
  >
    <a href="/playlists">
      <button class="float"><h3>Browse puzzles</h3></button>
    </a>
  </Saos>
</section>

<style>
  .dropdown-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .dropdown-content span {
    font-size: 0.75rem;
    margin: 0.25rem 0;
  }
  .dropdown-content p {
    margin: 2rem 0 1rem;
    line-height: 150%;
  }
  .dropdown-content img {
    width: min(100%, 30rem);
    border: var(--border-light);
    border-radius: var(--br-small);
  }
  @keyframes -global-slide-left {
    0% {
      transform: translateX(-5rem) skewX(-5deg);
      opacity: 0;
    }
    100% {
      transform: translateX(0) skewX(0deg);
      opacity: 100;
    }
  }
  @keyframes -global-scale {
    0% {
      transform: scale(0.7) rotate(5deg);
      opacity: 0;
    }
    100% {
      transform: none;
      opacity: 100;
    }
  }
  @keyframes -global-fade-in-up {
    0% {
      opacity: 0;
      -webkit-transform: translateY(5rem);
      transform: translateY(5rem) scale(0.5);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes -global-fade-out-down {
    0% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(5rem);
      transform: translateY(5rem);
    }
  }

  section.hero {
    width: min(75ch, 100% - 3rem);
    position: relative;
    min-height: calc(100vh - var(--nav-height));
    min-height: calc(100svh - var(--nav-height));
    /* min-height: 35rem; */
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  section.hero img.bg {
    position: absolute;
    right: 0;
    top: calc(45% - 14rem);
    max-width: none;
    width: min(110vw + 15rem, 65rem);
    height: auto;
    object-fit: cover;
    object-position: top;
    z-index: -1;
  }
  :global(body.dark) section.hero img.bg {
    opacity: 0.75;
  }
  section.hero > .content {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.5rem;
    padding-right: 15rem;
    margin-bottom: 3rem;
  }
  section.hero > .content .buttons {
    display: flex;
    gap: 0.5rem;
  }
  section.hero > .content .buttons button {
    border-radius: var(--br-small);
  }
  section.bottom-cta {
    margin-bottom: 0;
  }
  @media screen and (max-width: 700px) {
    section.hero img.bg {
      position: unset;
      width: 150%;
      object-fit: cover;
      align-self: flex-end;
      margin-bottom: 0.5rem;
    }

    section.hero > .content {
      padding-right: 0;
      top: 2.5rem;
      transform: none;
      margin-bottom: -7.5rem;
      margin-top: 1.5rem;
    }
    section.hero > .content .buttons {
      flex-direction: column;
      margin-top: 2rem;
    }
  }

  /* section.features */
  section.features {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 7.5rem 0;
  }
  .features-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    width: min(90ch, 100% - 5rem);
    gap: 3rem;
    z-index: 1;
  }

  .features-container .feature {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 25rem;
    margin-inline: auto;
  }

  /* section.how-it-works */
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
    margin-bottom: 2rem;
  }

  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: var(--br-small);
    overflow: hidden;
    aspect-ratio: 2;
    text-align: center;
    transition: transform 0.1s, box-shadow 0.1s, opacity 0.5s;
  }
  .card .black,
  .card .white {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
  .card .black {
    flex-direction: column;
    gap: 0.5rem;
  }
  .card .white {
    background-color: var(--secondary);
  }
  :global(body.dark) .card .black {
    background-color: var(--secondary);
    color: var(--text);
  }
  :global(body.dark) .card .white {
    background-color: var(--text);
    color: var(--secondary);
  }
  .third.card .black,
  .fourth.card .black {
    order: 1;
  }
  @media screen and (max-width: 850px) {
    .features-container {
      grid-template-columns: 1fr;
    }

    .cards-container {
      max-width: 25rem;
      grid-template-columns: 1fr;
    }

    .second.card .black {
      order: 1;
    }
    .third.card .black {
      order: 0;
    }
  }
  @media screen and (max-width: 400px) {
    .cards-container {
      padding: 0.5rem;
      gap: 0.5rem;
    }
  }

  section.bottom-cta {
    background-color: var(--accent);
    color: var(--secondary);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 6rem 0;
    align-items: center;
    border-top: var(--border);
    text-align: center;
    padding-inline: 1.5rem;
    overflow: hidden;
  }

  section.bottom-cta h1 {
    margin-bottom: 1.5rem;
  }

  section.bottom-cta button {
    background-color: var(--text);
    padding: 1.3rem 2.5rem;
    border-radius: var(--br-small);
  }

  :global(body.dark) section.bottom-cta button {
    background-color: var(--secondary);
    color: var(--text);
  }

  @media (hover: hover) {
    .cards-container:hover .card {
      opacity: 0.25;
    }

    .card:hover {
      transform: translateY(-0.25rem) scale(1.02);
      box-shadow: var(--shadow-down);
      opacity: 1 !important;
    }
    section.bottom-cta button:hover {
      background-color: var(--dark-gray);
    }
    :global(body.dark) section.bottom-cta button:hover {
      background-color: var(--dark-gray);
    }
  }
</style>
