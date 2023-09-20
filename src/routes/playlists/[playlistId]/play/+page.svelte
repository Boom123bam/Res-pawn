<script>
  import Board from "/src/components/Board.svelte";
  import {
    getAllUserSeqs,
    getSeqData,
  } from "../../../../modules/firebase";
  import { sequenceData } from "../../../../components/boardStore";
  import { getLocalUserData } from "../../../../modules/localStorage";
  import {
    estimateGrade,
    getNextSeq,
  } from "../../../../modules/spacedRep";
  import GradeMenu from "../../../../components/GradeMenu.svelte";

  async function loadSeq(id) {
    const data = await getSeqData(id);
    console.log(data);
    $sequenceData = data;
  }

  export let data; // data from layout.js
  const { localPlaylistData, localUserSeqData } = data;

  // get user data
  let userData;
  (async () => {
    userData = await getLocalUserData();
  })();

  function filterObject(obj, keysToKeep) {
    return Object.keys(obj).reduce((result, key) => {
      if (keysToKeep.includes(key)) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }

  // store an object containing data of the seqs played in the current playlist
  const playedSeqsData = filterObject(
    localUserSeqData,
    localPlaylistData.sequences
  );

  // store a list the seqIDs the user has not played (in localPlaylistData.seqs and not in localUserSeqData)
  const unplayedSeqIDs = localPlaylistData.sequences.filter(
    (item) => !Object.keys(localUserSeqData).includes(item)
  );

  let showGradeMenu = true;
  let grade = 1;
  /*
      repeat:
      get next seq
      play next seq
      store int data
      */
  getNextSeq(playedSeqsData, unplayedSeqIDs);

  sequenceData.subscribe((newSeqData) => {
    if (newSeqData?.finished) {
      console.log("finished seq");
    }
  });

  function handleGradeSubmit(e) {
    showGradeMenu = false;
    grade = e.detail.value;
    if (e.detail.goNext) {
      // update local data
      // GO NEXT
    }
  }

  function handleSeqFinish(e) {
    grade = estimateGrade(e.detail);
    showGradeMenu = true;
  }
</script>

<div class="page-content">
  <div class="board-wrapper">
    <Board on:finish={handleSeqFinish} />
    {#if showGradeMenu}
      <div class="menu-wrapper">
        <GradeMenu value={grade} on:submit={handleGradeSubmit} />
      </div>
    {/if}
  </div>

  <button
    on:click={() => {
      loadSeq("0aZzt");
    }}>load</button
  >
  <button
    on:click={() => {
      console.log(sequenceData);
    }}>load</button
  >
</div>

<style>
  .page-content {
    height: 100svh;
    max-height: 100svh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .board-wrapper {
    max-width: 70ch;
    position: relative;
    & .menu-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
