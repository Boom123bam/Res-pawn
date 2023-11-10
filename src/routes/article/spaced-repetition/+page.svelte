<svelte:head>
  <title
    >What is Spaced Repetition? And how it Improves Pattern
    Recognition</title
  >
  <meta
    name="description"
    content="This article explains what spaced repetition is and how to use it to improve your chess game."
  />
  <meta
    name="keywords"
    content="ResPawn, res-pawn, res pawn, pattern recognition, chess puzzles, practice chess"
  />
</svelte:head>

<section>
  <article>
    <h2>
      What is Spaced Repetition? And how it Improves Pattern
      Recognition
    </h2>
    <h5>
      Ever wonder how grandmasters can look at a puzzle for less than
      half of a second and know the solution? The answer lies in
      pattern recognition, and this article will explore how you can
      recognise more patterns faster with the help of spaced
      repetition.
    </h5>
    <img src="/images/SRgraph.png" alt="spaced repetition graph" />

    <h3>What is Spaced repetition?</h3>
    <p>
      Spaced Repetition is just what the name suggests: reviewing
      material at intervals, where each interval is longer than the
      last (shown by the graph above). This straightforward method has
      a robust scientific backing for its effectiveness, with a <a
        href="https://www.edapp.com/blog/evidence-around-spaced-repetition/"
        target="_blank">wealth of evidence spanning over 30 years.</a
      >
    </p>
    <h3>Why is spaced repetition effective?</h3>
    <p>
      The optimal time to review a piece of information is when we are
      just about to forget it, and each time we review something, we
      retain it for longer. The spaced repetition algorithm is
      effective because it takes into account both of those factors.
      After each review, it tries to predict when to show it to you
      for the best results. This way, you can minimise the amount of
      time spent on studying.
    </p>
    <h3>The power of pattern recognition</h3>
    <p>
      In chess, each move can determine the outcome of the game. At
      its core, chess is about recognizing and capitalizing on
      patterns. Imagine having the uncanny ability to see the best
      move in an instant, as if your mind were a finely tuned chess
      engine.
    </p>
    <p>
      So, how can we significantly enhance our pattern recognition?
      The answer lies in chess puzzles. Puzzles provide an endless
      stream of pattern after pattern, each capable of turning the
      outcome of a game around. But finding the solution once after
      minutes of playing possible scenarios in your head doesn't
      guarantee that you'll spot it again when it comes up in a game.
      So, how can we increase the chances of finding it in a game?
      That is the problem that ResPawn tries to solve. Let's delve
      deeper into how ResPawn can elevate your chess skills.
    </p>
    <h3>Spaced Repetition for Chess</h3>
    <p>
      After each puzzle is played, you have the ability to rate the
      puzzle based on how challenging it was. Based on that rating,
      ResPawn uses a spaced repetition algorithm to determine when the
      best time to review the puzzle is.
    </p>
    <p>
      Through systematic pattern repetition, you'll increase your
      likelihood of recognising it in a real game, giving you a higher
      chance of outplaying your opponent.
    </p>
    <h3>Conclusion</h3>
    <p>
      Spaced repetition is a scientifically proven and effective
      technique for memorisation. ResPawn leverages a spaced
      repetition algorithm to enhance your pattern recognition skills
      and dominate in games.
    </p>
    <p>
      Go and give it a try! Explore the playlists <a
        class="link color"
        href="/playlists">here</a
      >
    </p>
    <p>Good luck and have fun!</p>
  </article>
</section>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 5rem 0;
  }
  h2,
  h5 {
    text-align: center;
  }
  h2 {
    margin-bottom: 1rem;
  }
  h3 {
    margin-top: 1.5rem;
  }
  img {
    border: var(--border-dark);
    border-radius: var(--br);
    width: min(100%, 45rem);
    align-self: center;
    margin-bottom: 3.5rem;
  }
  h5,
  p {
    line-height: 150%;
  }
  p {
    font-size: 1.25rem;
  }

  @media screen and (max-width: 600px) {
    article {
      margin: 3rem 0;
      gap: 1.5rem;
    }
    h2 {
      font-size: 2.75rem;
      margin-bottom: 0;
    }
    img {
      margin-bottom: 1rem;
    }
  }
</style>
