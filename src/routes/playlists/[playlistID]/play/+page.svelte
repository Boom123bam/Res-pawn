<script>
    import {
        getSeqData,
        updateUserSeqData,
    } from "../../../../modules/firestore";
    import {
        defaultEasiness,
        estimateGrade,
        getNextSeq,
        updateSeqData,
    } from "../../../../modules/spacedRep";
    import { storeSessionSeqData } from "../../../../modules/sessionStorage";

    import { userData } from "../../../userStore";
    import { sequenceData } from "../../../../stores/boardStore";

    import Popup from "../../../../components/Popup.svelte";
    import GradeMenu from "../../../../components/GradeMenu.svelte";
    import BoardInterface from "../../../../components/BoardInterface.svelte";

    export let data; // data from layout.js

    const { localPlaylistData, localUserSeqData } = data;

    // store an object containing data of the played seqs in the current playlist
    const playedSeqsData = localUserSeqData
        ? filterObject(localUserSeqData, localPlaylistData.sequences)
        : {};

    // store a list the seqIDs the user has not played (in localPlaylistData.seqs and not in localUserSeqData)
    const unplayedSeqIDs = localUserSeqData
        ? localPlaylistData.sequences.filter(
              (item) => !Object.keys(localUserSeqData).includes(item),
          )
        : localPlaylistData.sequences;

    let closedEmailPopup = false;
    let showSeqInfoPopup = false;
    let showGradeMenu = false;
    let grade = 1;
    let seqsPlayedInSession = 0;
    let currentEasiness = defaultEasiness;

    let seqInfo = null;

    let currentSeqID = null;
    let enableNextButton = false;
    handleNext();

    async function loadSeq(id) {
        const data = await getSeqData(id);
        $sequenceData = data;
        seqInfo = {
            playlistName: localPlaylistData.name,
            timesStudied: Object.keys(playedSeqsData).includes(currentSeqID)
                ? playedSeqsData[currentSeqID].timesStudied
                : 0,
            seqData: $sequenceData,
        };
        if (playedSeqsData[currentSeqID] === undefined)
            currentEasiness = defaultEasiness;
        else currentEasiness = playedSeqsData[currentSeqID].easiness;
        console.log(currentEasiness);
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
                playedSeqsData[currentSeqID],
            );
        }
        storeSessionSeqData(playedSeqsData);
        if ($userData && $userData.emailVerified)
            updateUserSeqData(
                $userData.uid,
                currentSeqID,
                playedSeqsData[currentSeqID],
            ); // update data in db
        if (e.detail.goNext) {
            // GO NEXT
            handleNext();
        } else {
            enableNextButton = true;
        }
    }

    function handleSeqFinish(e) {
        grade = estimateGrade(e.detail);
        showGradeMenu = true;
    }

    function handleNext() {
        enableNextButton = false;
        currentSeqID = getNextSeq(playedSeqsData, unplayedSeqIDs, currentSeqID);
        if (currentSeqID) loadSeq(currentSeqID);
    }
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

<section class="main">
    {#if !closedEmailPopup && $userData && !$userData.emailVerified}
        <div class="popup-wrapper">
            <Popup on:close={() => (closedEmailPopup = true)}>
                <h5>Verify email to save progress</h5>
                <a href="/auth/verify">
                    <button class="primary">verify</button>
                </a>
            </Popup>
        </div>
    {/if}
    {#if showSeqInfoPopup}
        <div class="popup-wrapper">
            <Popup on:close={() => (showSeqInfoPopup = false)}>
                <div class="info-popup-data">
                    <p>
                        <b>id</b>: {$sequenceData.puzzleId}
                    </p>
                    <p>
                        <b>themes</b>: {$sequenceData.themes}
                    </p>
                    <p>
                        <b>rating</b>: {$sequenceData.rating}
                    </p>
                    <p>
                        <b>rating deviation</b>: {$sequenceData.ratingDeviation}
                    </p>
                    <p>
                        <b>game URL</b>: {$sequenceData.gameUrl}
                    </p>
                    {#if $sequenceData.openingTags}
                        <p>
                            <b>opening tags</b>: {$sequenceData.openingTags}
                        </p>
                    {/if}
                </div>
            </Popup>
        </div>
    {/if}
    <div
        class="popup-wrapper"
        style={`display: ${showGradeMenu ? "block" : "none"};`}
    >
        <GradeMenu
            value={grade}
            easiness={currentEasiness}
            on:submit={handleGradeSubmit}
        />
    </div>

    {#if $sequenceData && currentSeqID}
        <BoardInterface
            on:finish={handleSeqFinish}
            on:next={handleNext}
            on:morePressed={() => (showSeqInfoPopup = !showSeqInfoPopup)}
            {seqInfo}
            {enableNextButton}
        />
    {:else if !currentSeqID}
        <h2>no puzzles left</h2>
        <!-- <button>return to ???</button> -->
        <!-- {:else}
        <h3>loading...</h3> -->
    {/if}
</section>

<style>
    .info-popup-data {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    section.main {
        /* height: calc(100vh - var(--nav-height)); */
        height: calc(100svh - var(--nav-height));
        /* width: min(75ch, 100% - 0.5rem); */
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
    }
    .popup-wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
        width: min(100% - 2rem, 35rem);
    }
    @media screen and (max-height: 600px) {
        section.main {
            padding: 0.25rem 0;
        }
    }

    @media screen and (orientation: portrait) {
        section.main {
            padding: 0.5rem 0;
        }
    }
</style>
