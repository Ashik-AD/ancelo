

import { thumbnailNameByTime } from "../lib/thumbnail";

describe("Thumbnail name by times of the day", () => {
  it("Ayo its morning", () => {
    let morning = thumbnailNameByTime("6:00 AM");
    expect(morning).toBe("morning");
  });

  it("Ayo its afternoon", () => {
    let afternoon = thumbnailNameByTime("12:00 PM");
    expect(afternoon).toBe("afternoon");
  });

  it("Ayo its evening", () => {
    let evening = thumbnailNameByTime("18:00 PM");
    expect(evening).toBe("evening");
  });

  it("Ayo its night", () => {
    let night = thumbnailNameByTime("21:00 PM");
    expect(night).toBe("night");
  });
});
