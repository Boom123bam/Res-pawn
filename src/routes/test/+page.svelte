<script>
    import { onMount } from "svelte";
    import "../../components/Board.css";
    import { Chessground } from "chessground";

    let chessboard;
    let cg;
    onMount(() => {
        cg = Chessground(chessboard, {
            movable: {
                free: false,
            },
        });

        // const resizeBoard = () => {
        //     const mod = boardWrapper.clientWidth % 8;
        //     let boardSize = boardWrapper.clientWidth - mod;
        chessboard.style.height = `300px`;
        chessboard.style.width = `300px`;
        // };

        // window.addEventListener("resize", resizeBoard);
        // resizeBoard();
    });
</script>

<div bind:this={chessboard} class="board" />

<style>
    .board-container {
        --board-size: 300px;
        display: flex;
        justify-content: center;
        width: var(--board-size);
        position: relative;
        flex-grow: 1;
        height: calc(var(--board-size) + var(--shadow-size));
        grid-row: 1/-1;
        padding-bottom: var(--shadow-size);
    }
</style>
