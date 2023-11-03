const { Timestamp } = require("firebase/firestore");
const {
  getEasinessChange,
  getTimeToNextReview,
  updateSeqData,
  getNextSeq,
} = require("../src/modules/spacedRep");

describe(getEasinessChange, () => {
  it("impacts easiness negatively when grade is lowest", () => {
    const change = getEasinessChange(0);
    expect(change).toBeLessThan(0);
  });
  it("impacts easiness positively when grade is highest", () => {
    const change = getEasinessChange(2);
    expect(change).toBeGreaterThan(0);
  });
});

describe(getTimeToNextReview, () => {
  it("returns a larger number (interval in mins) if easiness is more", () => {
    expect(getTimeToNextReview(1.5)).toBeGreaterThan(
      getTimeToNextReview(0.5)
    );
  });
});

describe(updateSeqData, () => {
  const seqData = {
    timesStudied: 1,
    easiness: 2.125,
    nextReview: Timestamp.now(),
  };

  it("will increase easiness if grade is high", () => {
    const newSeqData = updateSeqData(2, { ...seqData });
    expect(newSeqData.easiness).toBeGreaterThan(seqData.easiness);
  });

  it("will set nextReview as a future timestamp", () => {
    const newSeqData = updateSeqData(2, { ...seqData });
    expect(newSeqData.nextReview.seconds).toBeGreaterThan(
      seqData.nextReview.seconds
    );
  });

  it("will decrease easiness if grade is low", () => {
    const newSeqData = updateSeqData(0, { ...seqData });
    expect(newSeqData.easiness).toBeLessThan(seqData.easiness);
  });
});

describe(getNextSeq, () => {
  const playedSeqsData = {
    Nbx8S: {
      timesStudied: 1,
      easiness: 2.75,
      nextReview: {
        seconds: 1698529953.7909,
        nanoseconds: 462000000,
      },
    },
    wgJQk: {
      timesStudied: 1,
      easiness: 2.125,
      nextReview: {
        seconds: 1697906452.2437947,
        nanoseconds: 128000000,
      },
    },
  };

  const unplayedSeqsIDs = [
    "04NEC",
    "04Q6b",
    "0GcoK",
    "0HEko",
    "0Hd99",
    "0LG18",
    "0LZqn",
    "0MP31",
  ];

  it("will return a random seq ID if math.random < chanceOfRandomSeq", () => {
    Math.random = () => 0;
    expect(unplayedSeqsIDs).toContain(
      getNextSeq(playedSeqsData, unplayedSeqsIDs)
    );
  });

  it("will return a played seq ID if math.random > chanceOfRandomSeq", () => {
    Math.random = () => 1;
    expect(Object.keys(playedSeqsData)).toContain(
      getNextSeq(playedSeqsData, unplayedSeqsIDs)
    );
  });
});
