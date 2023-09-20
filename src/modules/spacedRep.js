import { Timestamp } from "firebase/firestore";

function getSoonestSeq(seqsData, minsLimit = 20) {
  // gets the seq object with the soonest nextReview
  // returns the seqID if it is before (minsLimit) mins after the current time

  let soonestTimestamp = null; // Start with a high value
  let soonestSeqID = null;

  const currentTimestamp = Timestamp.now();

  // Calculate the timestamp x minutes later
  const latestTime = new Timestamp(
    currentTimestamp.seconds + minsLimit * 60,
    currentTimestamp.nanoseconds
  );

  for (const seqID in seqsData) {
    if (seqsData.hasOwnProperty(seqID)) {
      const timestamp = seqsData[seqID].nextReview;
      console.log(timestamp, latestTime);
      if (
        !soonestTimestamp ||
        timestamp.seconds < soonestTimestamp.seconds
      ) {
        soonestTimestamp = timestamp;
        if (timestamp.seconds < latestTime.seconds) {
          soonestSeqID = seqID;
        }
      }
    }
  }

  return soonestSeqID;
}

function getRandomSeq(seqIDs) {
  return seqIDs[Math.floor(Math.random() * seqIDs.length)];
}

export function getNextSeq(playedSeqsData, unplayedSeqsIDs) {
  const soonestSeqID = getSoonestSeq(playedSeqsData);
  if (!soonestSeqID) {
    return getRandomSeq(unplayedSeqsIDs);
  }
}

export function estimateGrade(stats) {
  console.log(stats);
  if (stats.solsUsed || stats.timesFailed) return 0;
  if (stats.hintsUsed > 2) return 0.5;
  if (stats.hintsUsed) return 1;
  return 1.5;
}
