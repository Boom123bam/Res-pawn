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
  import { storeUserSeqData } from "../../../../modules/sessionStorage";

  export let data; // data from layout.js

  const { localPlaylistData, localUserSeqData } = data;

  // get user data
  import { userData } from "../../../userStore";
  import Svg from "../../../../components/Svg.svelte";
  import Popup from "../../../../components/Popup.svelte";

  // store an object containing data of the seqs played in the current playlist
  const playedSeqsData = localUserSeqData
    ? filterObject(localUserSeqData, localPlaylistData.sequences)
    : {};

  // store a list the seqIDs the user has not played (in localPlaylistData.seqs and not in localUserSeqData)
  const unplayedSeqIDs = localUserSeqData
    ? localPlaylistData.sequences.filter(
        (item) => !Object.keys(localUserSeqData).includes(item)
      )
    : localPlaylistData.sequences;

  let showSeqInfoPopup = false;
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

<svelte:head>
  <title>{`Play - ${localPlaylistData.name}`}</title>
  <meta
    name="description"
    content="${localPlaylistData?.description
      ? localPlaylistData.description
      : `Play chess puzzles:  ${localPlaylistData.name}`}"
  />
</svelte:head>

<div class="page-content">
  <section class="main">
    {#if showSeqInfoPopup}
      <div class="popup-wrapper">
        <Popup on:close={() => (showSeqInfoPopup = false)}>
          <p>
            {JSON.stringify($sequenceData, null, 2)}
          </p>
        </Popup>
      </div>
    {/if}
    <div class="grid-container">
      {#if $sequenceData && currentSeqID}
        <div class="seq-info">
          <div class="playlist-name">
            <small class="landscape">playing:</small>
            <h4>{localPlaylistData.name}</h4>
            <h6>
              played {Object.keys(playedSeqsData).includes(
                currentSeqID
              )
                ? playedSeqsData[currentSeqID].timesStudied
                : "0"} times
            </h6>
            <small class="portrait"
              >rating: {$sequenceData.rating}</small
            >
          </div>
          <div class="puzzle-info landscape">
            <small>puzzle: {$sequenceData.puzzleId}</small>
            <h5>rating: {$sequenceData.rating}</h5>
            <!-- <h5>{JSON.stringify(playedSeqsData)} times played</h5> -->
          </div>
          <div class="to-play">
            {#if $sequenceData.fen.split(" ")[1] === "w"}
              <img
                src="/images/pieces/set3/k-b.svg"
                alt="black king"
              />
            {:else}
              <img
                src="/images/pieces/set3/k-w.svg"
                alt="white king"
              />
            {/if}
            <span class="landscape">to play</span>
          </div>
          <button
            class="info"
            on:click={() => (showSeqInfoPopup = true)}
          >
            <Svg name="info" />
          </button>
          <!-- <p>themes: {$sequenceData.themes}</p> -->
        </div>
        <div class="board-container">
          <Board on:finish={handleSeqFinish}>
            <button
              slot="after"
              class={`next cta${showBottomNextButton ? "" : " hide"}`}
              title="next puzzle"
              on:click={handleNext}
            >
              <Svg name="doubleRight" color="var(--secondary)" />
            </button>
          </Board>
          <!-- {#if showGradeMenu} -->
          <div
            class="popup-wrapper"
            style={`display: ${showGradeMenu ? "block" : "none"};`}
          >
            <GradeMenu value={grade} on:submit={handleGradeSubmit} />
          </div>
          <!-- {/if} -->
        </div>
      {:else if !currentSeqID}
        <h2>no puzzles left</h2>
        <button>return to ???</button>
        <!-- {:else}
        <h3>loading...</h3> -->
      {/if}
    </div>
  </section>
</div>

<style>
  .page-content {
    margin-bottom: 0;
  }
  .seq-info {
    /* width: 100%; */
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* align-items: center; */
    position: relative;
  }
  section.main {
    height: calc(100vh - var(--nav-height));
    height: calc(100svh - var(--nav-height));
    width: min(90ch, 100% - 0.5rem);
    /* max-height: 100svh; */
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    padding: 1rem 0;
    /* justify-content: center; */
  }
  .grid-container {
    display: grid;
    grid-template-columns: 2fr 10fr 2fr;
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
    /* align-self: center; */
    /* align-items: center; */
  }
  .popup-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    width: min(100% - 2rem, 35rem);
  }
  button.next {
    border-radius: var(--br);
    padding: 0;
    padding-inline: 1rem;
  }
  .to-play {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .to-play img {
    width: 2rem;
  }
  .landscape {
    display: block;
  }
  .portrait {
    display: none;
  }
  @media screen and (max-height: 600px) {
    section.main {
      padding: 0.25rem 0;
    }
  }

  @media screen and (orientation: portrait) {
    .portrait {
      display: block;
    }
    .landscape {
      display: none;
    }
    .seq-info {
      flex-direction: row;
      justify-content: center;
      margin-inline: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .grid-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .to-play {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(calc(100% + 1rem), -50%);
    }
    button.info {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(calc(-100% - 1rem), -50%);
    }
  }
</style>
