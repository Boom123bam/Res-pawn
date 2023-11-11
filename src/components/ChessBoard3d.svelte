<script>
  import { onMount } from "svelte";
  let showBoard = false;

  onMount(() => {
    showBoard = true;
  });
</script>

{#if showBoard}
  <div class="container-container-container">
    <div class="container-container">
      <div class="container">
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
        <div class="tile dark" />
        <div class="tile" />
      </div>
    </div>
  </div>
{/if}

<style>
  .container-container-container {
    width: 30rem;
    height: 15rem;
    perspective: 1000px;
    -webkit-perspective: 1000px;
    perspective-origin: bottom;
  }

  .container-container {
    padding: 15%;
    transform-origin: top;
    transform: rotatex(60deg);
    transition: 1s;
    width: 100%;
    height: 200%;
    transform-style: preserve-3d;
  }

  .container {
    /*   transform: rotate(45deg); */
    animation: rotation 20s linear infinite;
    border: 0.75rem solid var(--text);
    background-color: var(--purple);
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    transform-style: preserve-3d;
  }

  :global(body.dark) .container {
    border-color: var(--background-alt);
  }

  .tile {
    transition: 3s;
    background: var(--background-alt);
  }
  .tile.dark {
    background: var(--text);
  }
  .tile:hover {
    transition: 0.1s;
    transform: translate3d(0, 0, 0.25rem);
    background: lightblue !important;
  }

  @keyframes rotation {
    0% {
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 750px) {
    .container {
      border: 0.5rem solid var(--text);
    }
    .container-container-container {
      width: 24rem;
      height: 12rem;
      perspective: 800px;
      -webkit-perspective: 800px;
    }
  }
  @media screen and (max-width: 600px) {
    .container {
      border: 0.4rem solid var(--text);
    }
    .container-container-container {
      width: 18rem;
      height: 9rem;
      perspective: 600px;
      -webkit-perspective: 600px;
    }
  }
  @media screen and (max-width: 400px) {
    .container {
      border: 0.4rem solid var(--text);
    }
    .container-container-container {
      width: 14rem;
      height: 7rem;
      perspective: 400px;
      -webkit-perspective: 400px;
    }
  }
</style>
