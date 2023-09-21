<script>
  import Board from "/src/components/Board.svelte";
  import {
    getSeqData,
    updateUserSeqData,
  } from "../../../../modules/firebase";
  import { sequenceData } from "../../../../components/boardStore";
  import {
    getLocalUserData,
    storeUserSeqData,
  } from "../../../../modules/localStorage";
  import {
    estimateGrade,
    getNextSeq,
    updateSeqData,
  } from "../../../../modules/spacedRep";
  import GradeMenu from "../../../../components/GradeMenu.svelte";

  export let data; // data from layout.js

  const { localPlaylistData, localUserSeqData } = data;

  // get user data
  let userData;
  (async () => {
    userData = await getLocalUserData();
  })();

  // store an object containing data of the seqs played in the current playlist
  const playedSeqsData = filterObject(
    localUserSeqData,
    localPlaylistData.sequences
  );

  // store a list the seqIDs the user has not played (in localPlaylistData.seqs and not in localUserSeqData)
  const unplayedSeqIDs = localPlaylistData.sequences.filter(
    (item) => !Object.keys(localUserSeqData).includes(item)
  );

  let showGradeMenu = false;
  let grade = 1;
  let seqsPlayedInSession = 0;

  let currentSeqID = null;
  handleNext();

  async function loadSeq(id) {
    console.log("loading", id);
    const data = await getSeqData(id);
    console.log("loaded", data);
    $sequenceData = data;
  }

  function filterObject(obj, keysToKeep) {
    return Object.keys(obj).reduce((result, key) => {
      if (keysToKeep.includes(key)) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }

  function handleGradeSubmit(e) {
    showGradeMenu = false;
    seqsPlayedInSession++;
    grade = e.detail.value;

    // if seq is new
    if (unplayedSeqIDs.includes(currentSeqID)) {
      // remove seq from unplayed
      unplayedSeqIDs.splice(unplayedSeqIDs.indexOf(currentSeqID), 1);
      // update and add to played
      playedSeqsData[currentSeqID] = updateSeqData(grade);
    } else {
      // not new
      playedSeqsData[currentSeqID] = updateSeqData(
        grade,
        playedSeqsData[currentSeqID]
      );
    }
    storeUserSeqData(playedSeqsData);
    console.log(
      `updating user db ${currentSeqID} with:`,
      playedSeqsData[currentSeqID]
    );
    updateUserSeqData(
      userData.id,
      currentSeqID,
      playedSeqsData[currentSeqID]
    ); // update data in db
    if (e.detail.goNext) {
      // GO NEXT
      handleNext();
    }
  }

  function handleSeqFinish(e) {
    grade = estimateGrade(e.detail);
    showGradeMenu = true;
  }

  function handleNext() {
    currentSeqID = getNextSeq(
      playedSeqsData,
      unplayedSeqIDs,
      currentSeqID
    );
    if (currentSeqID) loadSeq(currentSeqID);
  }

  /*
      repeat:
      get next seq
      play next seq
      store int data
      */
</script>

<div class="page-content">
  {#if currentSeqID}
    <h1>{currentSeqID}</h1>
    <div class="board-wrapper">
      <Board on:finish={handleSeqFinish} />
      {#if showGradeMenu}
        <div class="menu-wrapper">
          <GradeMenu value={grade} on:submit={handleGradeSubmit} />
        </div>
      {/if}
    </div>
  {:else}
    <h1>no seqs left</h1>
  {/if}
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
