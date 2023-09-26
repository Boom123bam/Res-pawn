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
    flipped;
</script>

<button
  class={`square ${squareColor}${hint ? " hint" : ""}${
    solution ? " solution" : ""
  }${lastMove ? " last-move" : ""}`}
  style={`order: ${order}`}
  on:click={() => handlePieceClick(id)}
>
  {#if square != undefined}
    <img
      src={`/src/lib/images/pieces/set3/${square.type}-${square.color}.svg`}
      alt={`piece: ${square.type}-${square.color}`}
      draggable="false"
    />
  {/if}
  {#if highlighted}
    <div class="highlight-circle" />
  {/if}
  {#if !flipped}
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

<style>
</style>
