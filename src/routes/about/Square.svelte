<script>
  export let id,
    squareColor,
    square,
    handlePieceClick,
    highlighted,
    hint,
    solution;
</script>

<button
  class={`square ${squareColor}${hint ? " hint" : ""}${
    solution ? " solution" : ""
  }`}
  on:click={() => handlePieceClick(id)}
>
  {#if square != undefined}
    <img
      src={`src/lib/images/pieces/${square.type}-${square.color}.svg`}
      alt=""
    />
  {/if}
  {#if highlighted}
    <div class="highlight-circle" />
  {/if}
  {#if id[1] == "1"}
    <div class="col indicator">
      {id[0]}
    </div>
  {/if}
  {#if id[0] == "a"}
    <div class="row indicator">{id[1]}</div>
  {/if}
</button>
