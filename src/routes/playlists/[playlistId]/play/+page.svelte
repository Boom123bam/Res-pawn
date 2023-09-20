<script>
  import Board from "/src/components/Board.svelte";
  import {
    getAllUserSeqs,
    getSeqData,
  } from "../../../../modules/firebase";
  import { sequenceData } from "../../../../components/boardStore";
  import { getLocalUserData } from "../../../../modules/localStorage";
  import { getNextSeq } from "../../../../modules/spacedRep";

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
</script>

<Board />

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
