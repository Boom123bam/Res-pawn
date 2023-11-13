<script>
  export let id,
    squareColor,
    square,
    handlePieceClick,
    highlighted,
    hint,
    solution,
    lastMove,
    order,
    flipped,
    moveTo,
    showIndicatorOnHover;

  // let style = "tranform: translate(50%, 50%)";
  let transformStyle = "";
  $: {
    if (moveTo) {
      const [x, y] = getTranslatePercent(moveTo);
      transformStyle = `transform: translate(${x}%, ${y}%);`;
    }
  }

  const pieces = ["p", "r", "n", "b", "q", "k"];
  function getTranslatePercent(moveTo) {
    // returns x, y % movement of piece
    const letters = "abcdefgh";
    const y = id[1] - moveTo[1];
    const x = letters.indexOf(moveTo[0]) - letters.indexOf(id[0]);
    return flipped ? [-x * 100, -y * 100] : [x * 100, y * 100];
  }
</script>

<svelte:head>
  {#each pieces as piece}
    <link
      rel="preload"
      as="image"
      href={`/images/pieces/set3/${piece}-b.svg`}
    />
    <link
      rel="preload"
      as="image"
      href={`/images/pieces/set3/${piece}-w.svg`}
    />
  {/each}
</svelte:head>

<button
  class={`square ${squareColor}${hint ? " hint" : ""}${
    solution ? " solution" : ""
  }${lastMove ? " last-move" : ""}`}
  style={`order: ${order};`}
  tabIndex="-1"
  on:click={() => handlePieceClick(id)}
>
  {#if square != undefined}
    <div
      class="piece-container"
      style={moveTo
        ? `${transformStyle} + z-index: 20;`
        : "transform: none; z-index:10"}
    >
      <img
        src={`/images/pieces/set3/${square.type}-${square.color}.svg`}
        alt={`piece: ${square.type}-${square.color}`}
        draggable="false"
      />
    </div>
  {/if}
  {#if highlighted}
    <div class="highlight-circle" />
  {/if}
  {#if showIndicatorOnHover}
    <div class="row indicator">
      {id}
    </div>
  {:else if !flipped}
    {#if id[1] == "1"}
      <div class="col indicator">
        {id[0]}
      </div>
    {/if}
    {#if id[0] == "a"}
      <div class="row indicator">{id[1]}</div>
    {/if}
  {:else}
    {#if id[1] == "8"}
      <div class="col indicator">
        {id[0]}
      </div>
    {/if}
    {#if id[0] == "h"}
      <div class="row indicator">{id[1]}</div>
    {/if}
  {/if}
</button>

{#if showIndicatorOnHover}
  <style>
    .indicator {
      display: none;
    }
    .square:hover .indicator {
      display: block;
    }
  </style>
{/if}

<style>
  .square {
    cursor: unset;
    background-color: var(--light-square);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    border-radius: 0;
  }
  .square .indicator.col {
    bottom: 0.25em;
    right: 0.25em;
  }
  .square .indicator.row {
    top: 0.25em;
    left: 0.25em;
  }
  .square.dark .indicator {
    color: var(--light-square);
  }
  .square .indicator {
    position: absolute;
    font-size: 1em;
    font-weight: 700;
    line-height: 75%;
    color: var(--dark-square);
  }
  .square .highlight-circle {
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    top: 0;
    left: 0;
    transform: translate(50%, 50%);
  }
  .square.last-move::before {
    background-color: lightblue;
  }
  .square.hint::before,
  .square.solution::before {
    background-color: yellow;
  }
  .square.last-move::before,
  .square.hint::before,
  .square.solution::before {
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0.5;
    position: absolute;
  }
  .square.dark {
    background-color: var(--dark-square);
    /* border: 1px solid var(--border-dark); */
  }

  .square .piece-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s linear;
    z-index: 10;
  }
  .square img {
    width: var(--piece-size);
    height: var(--piece-size);
  }
  @media screen and (max-width: 600px),
    screen and (max-height: 600px) {
    .square .indicator {
      font-size: 0.75em;
    }
  }
</style>
