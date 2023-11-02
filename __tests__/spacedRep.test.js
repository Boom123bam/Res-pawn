const getEasinessChange =
  require("../src/modules/spacedRep").getEasinessChange;

describe("getEasinessChange", () => {
  it("impacts easiness negatively when grade is lowest", () => {
    const change = getEasinessChange(0);
    expect(change).toBeLessThan(0);
  });
  it("impacts easiness positively when grade is highest", () => {
    const change = getEasinessChange(2);
    expect(change).toBeGreaterThan(0);
  });
});
