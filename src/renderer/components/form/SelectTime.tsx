import { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { addZeroLessThanTen } from "lib/formatDuration";

export type Time = {
  hours: number;
  minutes: number;
  meridiem: "AM" | "PM";
};

type PickerListProps = {
  list: Array<string | number>;
  onPick: (item: string | number) => void;
  matchValue: string | number;
};

interface Props {
  onSelectTime: (time: Time) => void;
  label?: string;
  error?: string;
}

const currentTime = (): Time => {
  let date = new Date();
  const meridiem = date.toLocaleString().split(" ")
    .pop()!! as "AM" | "PM";
  const hours = +date.getHours() > 12 ? +date.getHours() - 12 : date.getHours();

  return {
    minutes: date.getMinutes(),
    hours,
    meridiem,
  };
};

const listFrom = (min: number, max: number) => {
  return Array(max).fill(min, 0, max).map((_, index) => min + index);
};

export default function SelectTime({ onSelectTime, label, error }: Props) {
  const [time, setTime] = useState(() => currentTime());
  const [isPicked, setIsPicked] = useState(false);
  const [isShowPicker, setIsShowPicker] = useState(false);

  const hours = listFrom(1, 12);
  const minutes = listFrom(0, 60);

  useEffect(() => {
    if (isPicked || isShowPicker) {
      onSelectTime(time);
    }
  }, [isPicked, isShowPicker, time]);

  const handlePick = (id: keyof Time, value: number | string) => {
    setTime((prevTime) => ({ ...prevTime, [id]: value }));
    setIsPicked(true);
  };

  const handleTogglePicker = () => {
    setIsShowPicker((prevPicker) => !prevPicker);
    setIsPicked(true);
  };

  const pickerWrapperCls = isShowPicker
    ? style.show__picker
    : style.hide__picker;
  return (
    <div
      className={`${style.time__picker} 
        ${style.field__wrapper} ${
        error?.trim() && style.field__wrapper__error
      } picker`}
    >
      {label?.trim() && (
        <label htmlFor={label} className={style.input__label}>{label}</label>
      )}
      <div
        className={`${style.input} input`}
        role="textbox"
        aria-label="Time picker"
        onClick={handleTogglePicker}
      >
        {(isPicked)
          ? (
            <div className={style.input__value}>
              <span className={style.time}>
                {addZeroLessThanTen(time.hours)}
              </span>
              <span className={style.colon}>:</span>
              <span className={style.time}>
                {addZeroLessThanTen(time.minutes)}
              </span>
              <span className={style.meridiem}>{time.meridiem}</span>
            </div>
          )
          : (
            <span className={style.picker__label}>
              Select Time
            </span>
          )}
      </div>
      <div className={`${style.picker__wrapper} ${pickerWrapperCls}`}>
        <div className={style.picker__hour}>
          <h5 className={style.time__label}>Hours</h5>
          <PickerList
            list={hours}
            matchValue={time.hours}
            onPick={(hours) => handlePick("hours", hours)}
          />
        </div>
        <div className={style.picker__minute}>
          <h5 className={style.time__label}>Minutes</h5>
          <PickerList
            list={minutes}
            matchValue={time.minutes}
            onPick={(minutes) => handlePick("minutes", minutes)}
          />
        </div>
        <div className={style.picker__meridiem}>
          <h5 className={`${style.time__label} center`}>🌗</h5>
          <PickerList
            list={["AM", "PM"]}
            matchValue={time.meridiem}
            onPick={(meridiem) => handlePick("meridiem", meridiem)}
          />
        </div>
      </div>
      <div className={style.overlay} onClick={handleTogglePicker} />
    </div>
  );
}

function PickerList({ list, matchValue, onPick }: PickerListProps) {
  const activeRef = useRef<HTMLLIElement | null>(null);
  const wrapperRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    if (activeRef.current) {
      const ele = activeRef.current;
      wrapperRef.current?.scrollTo({
        top: ele.offsetTop - ele.clientHeight - 6,
      });
    }
  }, []);

  return (
    <ul className={style.list__wrapper} ref={wrapperRef}>
      {list.map((item) => {
        const isMatched = matchValue == item;
        return (
          <li
            key={item}
            className={`${style.item} ${isMatched ? style["item-active"] : ""}`}
            data-value={item}
            onClick={(evt) => onPick(evt.currentTarget.dataset.value!!)}
            ref={isMatched ? activeRef : null}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
