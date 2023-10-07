// Module containing spaced repetition logic

import { Timestamp } from "firebase/firestore";

// ALL percentages are in decimal (e.g. 25% = 0.25)

const maxEasiness = 12;
const minsLimit = 5; // mins in the future to look for seqs in
const defaultEasiness = 1.5;
const easinessChangeMultiplier = 1.25;
const randomNextReviewDifference = 0.15; // max % added/subtracted to next Review Time
const gradeShiftPercentage = 0.25; // positive shift % aplpied to grade

const chanceOfRandomSeq = 0.3;

function getSoonestSeq(seqsData) {
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

export function getNextSeq(
  playedSeqsData,
  unplayedSeqsIDs,
  prevSeqID = null
) {
  if (Math.random() < chanceOfRandomSeq) {
    // play random unplayed seq
    return getRandomSeq(unplayedSeqsIDs);
  }
  const soonestSeqID = getSoonestSeq(playedSeqsData);
  if (!soonestSeqID || prevSeqID == soonestSeqID) {
    if (unplayedSeqsIDs.length) return getRandomSeq(unplayedSeqsIDs);
    // no seqs left to play
    return null;
  }
  return soonestSeqID;
}

export function estimateGrade(stats) {
  if (stats.solsUsed || stats.timesFailed) return 0;
  if (stats.hintsUsed > 2) return 0.5;
  if (stats.hintsUsed) return 1;
  return 1.5;
}

export function getTimeToNextReview(easiness) {
  // time in mins
  const time = 5.7 * easiness ** 4.5;
  const percentage =
    1 + (Math.random() * 2 - 1) * randomNextReviewDifference;
  return time * percentage;
}

export function getEasinessChange(grade) {
  // initial grade ranges from 0 to 2
  return (
    (grade - 1 + 2 * gradeShiftPercentage) * easinessChangeMultiplier
  );
}

function clamp(value, max = Infinity, min = 0) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function getNewEasiness(oldEasiness, grade) {
  const change = getEasinessChange(grade);
  return clamp(oldEasiness + change, maxEasiness);
}

export function updateSeqData(grade, seqData = null) {
  if (!seqData) {
    seqData = {
      timesStudied: 0,
      easiness: defaultEasiness,
    };
  }
  seqData.timesStudied++;
  // seqData.easiness = clamp(
  //   seqData.easiness + getEasinessChange(grade),
  //   maxEasiness
  // );
  seqData.easiness = getNewEasiness(seqData.easiness, grade);
  seqData.nextReview =
    // Calculate the next review time
    new Timestamp(
      Timestamp.now().seconds +
        getTimeToNextReview(seqData.easiness) * 60,
      Timestamp.now().nanoseconds
    );
  return seqData;
}
