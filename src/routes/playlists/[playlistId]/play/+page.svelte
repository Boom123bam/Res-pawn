<script>
  import Board from "/src/components/Board.svelte";
  import { getSeqData } from "../../../../modules/firebase";
  import { sequenceData } from "../../../../components/boardStore";
  import { getSoonestSeq } from "../../../../modules/firebase";
  import { getUserID } from "../../../../modules/localStorage";

  async function loadSeq(id) {
    const data = await getSeqData(id);
    $sequenceData = data;
  }

  /*
  repeat:
    get next seq
    play next seq
    store int data
  */
</script>

<Board />

<button
  on:click={() => {
    loadSeq("00J1t");
  }}>load</button
>

<button
  on:click={async () => {
    const userID = await getUserID();
    if (userID) {
      console.log(
        await getSoonestSeq(userID, "qWVckrPxsjQiByFsEFLz", 20000000)
      );
    }
  }}>getseq</button
>
