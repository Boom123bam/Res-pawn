<script>
  import Board from "/src/components/Board.svelte";
  import {
    getSeqData,
    updateUserSeqData,
  } from "../../../../modules/firebase";
  import { sequenceData } from "../../../../components/boardStore";
  import {
    estimateGrade,
    getNextSeq,
    updateSeqData,
  } from "../../../../modules/spacedRep";
  import GradeMenu from "../../../../components/GradeMenu.svelte";
  import { storeUserSeqData } from "../../../../modules/localStorage";

  export let data; // data from layout.js

  const { localPlaylistData, localUserSeqData } = data;
  console.log(data);

  // get user data
  import { userData } from "../../../userStore";
  console.log($userData);

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
  let showBottomNextButton = false;
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
    if ($userData)
      updateUserSeqData(
        $userData.uid,
        currentSeqID,
        playedSeqsData[currentSeqID]
      ); // update data in db
    if (e.detail.goNext) {
      // GO NEXT
      handleNext();
    } else {
      showBottomNextButton = true;
    }
  }

  function handleSeqFinish(e) {
    grade = estimateGrade(e.detail);
    showGradeMenu = true;
  }

  function handleNext() {
    showBottomNextButton = false;
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
    <div class="seq-info">
      <h3>{localPlaylistData.name}</h3>
      <h5>puzzle: {currentSeqID}</h5>
    </div>
    <div class="board-container">
      <Board on:finish={handleSeqFinish}>
        <button
          slot="after"
          class={`next cta${showBottomNextButton ? "" : " hide"}`}
          on:click={handleNext}
          ><img
            src={`/images/icons/right-double-white.svg`}
            alt="next puzzle"
            draggable="false"
          /></button
        >
      </Board>
      {#if showGradeMenu}
        <div class="menu-wrapper">
          <GradeMenu value={grade} on:submit={handleGradeSubmit} />
        </div>
      {/if}
    </div>
  {:else}
    <h2>no puzzles left</h2>
    <button>return to ???</button>
  {/if}
</div>

<style>
  .seq-info {
    width: 100%;
    margin-bottom: 1rem;
  }
  .page-content {
    height: 100svh;
    max-height: 100svh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }
  .board-container {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: min(100svh - 20rem, 90ch);
    position: relative;
    & .menu-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .menu-wrapper {
    z-index: 20;
  }
  button.next {
    border-radius: var(--br);
    padding-inline: 1rem;
    & img {
      width: var(--button-icon-size);
      height: var(--button-icon-size);
    }
  }
</style>
