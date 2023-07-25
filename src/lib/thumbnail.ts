type DayTimes = "morning" | "afternoon" | "evening" | "night";

export const thumbnailNameByTime = (time: string): DayTimes => {
  const splitTime = time.replace(" ", ":").split(":");

  let hours = +splitTime[0];
  const meridiem = splitTime[2] as "AM" | "PM";

  if (hours >= 5 && hours < 12 && meridiem == "AM") {
    return "morning";
  } else if (hours >= 12 && hours < 18 && meridiem == "PM") {
    return "afternoon";
  }
  if (hours >= 18 && hours < 21 && meridiem == "PM") {
    return "evening";
  }
  return "night";
};
