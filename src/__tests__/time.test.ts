import { getTimeOfTheDay } from "../lib/time";

describe("Times of the day", () => {
  it("Ayo its morning", () => {
    let time = getTimeOfTheDay("6:00 AM");
    expect(time).toBe("morning");
  });

  it("Ayo its afternoon", () => {
    let time = getTimeOfTheDay("12:00 PM");
    expect(time).toBe("afternoon");
  });
  it("Ayo its evening", () => {
    let time = getTimeOfTheDay("5:00 PM");
    expect(time).toBe("evening");
  });

});
