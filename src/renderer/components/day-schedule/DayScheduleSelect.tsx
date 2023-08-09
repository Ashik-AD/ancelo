import { useEffect, useState } from "react";
import style from "./style.module.scss";
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export type DaySchedule = typeof days;
export interface DayScheduleSelectProps {
  onSelect: (selected: DaySchedule) => void;
  selected?: DaySchedule;
  label?: string;
}
export default function DayScheduleSelect(
  { onSelect, selected, label }: DayScheduleSelectProps,
) {
  const [selectedDays, setSelectedDays] = useState<DaySchedule>(selected || []);

  const handleSelectDay = (value: string) => {
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

  const renderDay = days.map((day) => (
    <span
      key={day}
      tabIndex={0}
      role="button"
      aria-selected={selectedDays.findIndex((selected) => selected == day) != -1 }
      aria-label={day}
      className={style.option}
      onClick={() => handleSelectDay(day)}
    >
      {day[0]}
    </span>
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
