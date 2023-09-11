<script>
  import Board from "/src/components/Board.svelte";
  let currentSequence = {
    start:
      "rnbqkbnr/1ppppppp/p7/8/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 0 1",
    moves: [
      { from: "e2", to: "e4" },
      { from: "e7", to: "e5" },
      { from: "f2", to: "f4" },
      { from: "f7", to: "f5" },
    ],
    step: 0,
    failed: false,
    finished: false,
    deductedPoints: 0, // deduct points for each hint, move-reveal, fail
    hint: false,
    solution: false,
  };
</script>

<Board {currentSequence} />

<button on:click={() => {}}>asdf</button>
