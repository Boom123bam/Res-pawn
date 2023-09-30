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

  // get user data
  import { userData } from "../../../userStore";

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
    const data = await getSeqData(id);
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
  <section class="main">
    <div class="grid-container">
      {#if currentSeqID}
        <div class="seq-info">
          <h3>{localPlaylistData.name}</h3>
          <small>puzzle: {currentSeqID}</small>
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
              <GradeMenu
                value={grade}
                on:submit={handleGradeSubmit}
              />
            </div>
          {/if}
        </div>
      {:else}
        <h2>no puzzles left</h2>
        <button>return to ???</button>
      {/if}
    </div>
  </section>
</div>

<style>
  .seq-info {
    /* width: 100%; */
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    /* align-items: center; */
  }
  section.main {
    height: calc(100svh - var(--nav-height));
    width: min(90ch, 100% - 1rem);
    /* max-height: 100svh; */
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    padding: 1rem 0;
    /* justify-content: center; */
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    align-items: start;
    width: 100%;
    height: 100%;
  }
  .board-container {
    display: flex;
    justify-content: center;
    width: min(100vh - 10rem, 100%);
    width: 100%;
    /* max-width: min(100svw - 5rem, 60ch); */
    position: relative;
    flex-grow: 1;
    height: 100%;
    align-self: center;
  }
  .board-container .menu-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .menu-wrapper {
    z-index: 20;
    width: min(100% - 2rem, 35rem);
  }
  button.next {
    border-radius: var(--br);
    padding: 0;
    padding-inline: 1rem;
  }
  button.next img {
    width: var(--button-icon-size);
    height: var(--button-icon-size);
  }
  @media screen and (max-height: 600px) {
    .seq-info {
      flex-direction: row;
      align-items: end;
      justify-content: center;
      margin-inline: 0.5rem;
      margin-bottom: 0.25rem;
    }
  }

  @media screen and (max-width: 800px) {
    .grid-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  /* @media screen and (orientation: landscape) and (max-height: 600px) {
    .page-content {
      flex-direction: row;
    }
  } */
</style>
