<svelte:head>
  <title
    >What is Spaced Repetition? And how it Improves Pattern
    Recognition</title
  >
  <meta
    name="description"
    content="This article explains what spaced repetition is and how to use it to improve your chess game."
  />
</svelte:head>

<section>
  <article>
    <h2>
      What is Spaced Repetition? And how it Improves Pattern
      Recognition
    </h2>
    <h5>
      <!-- Learn how to become a better player by utilising spaced
        repetition to help you memorise and recognise patterns more
        efficiently. -->
      Picture yourself in a chess match, facing a challenging position.
      Suddenly, in a flash of recognition, you realize you've encountered
      a similar puzzle in the past. That's the power of pattern recognition,
      and this article will explore how you can recognise more patterns
      faster with the help of spaced repetition.
    </h5>
    <img src="/images/SRgraph.png" alt="spaced repetition graph" />

    <h3>What is Spaced repetition?</h3>
    <p>
      Spaced Repetition is just what the name suggests: reviewing
      material at intervals, where each interval is longer than the
      last. This straightforward method has a robust scientific
      backing for its effectiveness, with a <a
        href="https://www.edapp.com/blog/evidence-around-spaced-repetition/"
        target="_blank">wealth of evidence spanning over 30 years.</a
      >
    </p>
    <h3>Why is spaced repetition effective?</h3>
    <p>
      The optimal time to review a piece of information is when we are
      just about to forget it, and each time we review something, it
      takes longer to forget it. The spaced repetition algorithm is
      effective because it takes into account both of those factors.
      After each review, it tries to predict when to show it to you
      for the best results. This way you can minimise the amount of
      time spent on studying
    </p>
    <h3>The power of pattern recognition</h3>
    <p>
      In chess, each move can determine the outcome of the game. At
      its core, chess is about recognizing and capitalizing on
      patterns. Imagine having the uncanny ability to see the best
      move in an instant, as if your mind were a finely tuned chess
      engine. This is the power of pattern recognition.
    </p>
    <p>
      So, how can we significantly enhance our pattern recognition?
      The answer lies in puzzles-chess puzzles provide an endless
      stream of pattern after pattern, each capable of turning the
      outcome of a game around. But finding the solution once after
      several minutes of playing possible scenarios your head doesn't
      guarantee that you will spot it again when it comes up in a
      game. So, how can we increase that chances of finding it in game
      drastically? That is the problem that ResPawn tries to solve,
      let's delve deeper into how ResPawn can elevate your chess
      skills.
    </p>
    <h3>Spaced Repetition for Chess</h3>
    <p>
      After each puzzle is played, you have the ability to rate the
      puzzle based on how challenging it was. Based on that rating,
      ResPawn uses a spaced repetition algorithm to determine when the
      best time to review the puzzle.
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
      Go and give it a try! Explore the playlists <a href="/playlists"
        >here</a
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
  img {
    width: min(100%, 45rem);
    align-self: center;
    margin-bottom: 5rem;
  }
  h5,
  p {
    line-height: 150%;
  }
  p {
    font-size: 1.25rem;
  }
  a {
    color: var(--accent);
  }
  a:hover {
    text-decoration: underline;
  }
</style>
