type DayTimes = "morning" | "afternoon" | "evening";

export const getTimeOfTheDay = (time: string): DayTimes => {
  const splitTime = time.replace(" ", ":").split(":");

  let hours = +splitTime[0];
  const meridiem = splitTime[2] as "AM" | "PM";

  if (hours >= 5 && hours < 12 && meridiem == "AM") {
    return "morning";
  } else if (hours == 12 || hours < 5 && meridiem == "PM") {
    return "afternoon";
  }
  return "evening";
};
