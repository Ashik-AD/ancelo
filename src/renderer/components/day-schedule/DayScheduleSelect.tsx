import { MouseEventHandler, useEffect, useState } from "react";
import style from "./style.module.scss";
const day = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export type DaySchedule = typeof day;
export interface DayScheduleSelectProps {
  onSelect: (selected: DaySchedule) => void;
  selected?: DaySchedule;
  label?: string;
}
export default function DayScheduleSelect(
  { onSelect, selected, label }: DayScheduleSelectProps,
) {
  const [selectedDays, setSelectedDays] = useState<DaySchedule>([]);

  const handleSelectDay = (evt: React.MouseEvent<HTMLButtonElement>) => {
    var value = evt.currentTarget.value;
    var indexOfDay = selectedDays.findIndex((day) => day == value);
    var days = [...selectedDays];
    if (indexOfDay >= 0) {
      days.splice(indexOfDay, 1);
      setSelectedDays(days);
      return;
    }
    days.push(value);
    setSelectedDays(days);
  };

  useEffect(() => {
    onSelect && onSelect(selectedDays)
  }, [selectedDays])

  const renderDay = day.map((d) => (
    <button
      key={d}
      aria-selected={selectedDays.findIndex((day) => day == d) != -1 }
      aria-label={d}
      className={style.option}
      value={d}
      onClick={handleSelectDay}
    >
      {d[0]}
    </button>
  ));
  return (
    <div className={style.day__selection}>
      {
        label && <label className="input__label">{label}</label>
      }
      <div className={style.selection__btn__wrapper}>
      {renderDay}
      </div>
    </div>
  );
}
