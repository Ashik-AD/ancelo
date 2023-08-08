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
  value?: string;
  label?: string;
  error?: string;
  clear?: boolean;
}

const currentTime = (): Time => {
  let date = new Date();
  const meridiem = date.toLocaleString().split(" ")
    .pop()!! as "AM" | "PM";

  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
    meridiem,
  };
};

function formatHours12Sys(hours: number) {
  if (typeof hours != "number" && Number.isNaN(hours)) {
    throw new Error("Hours is not number");
  }
  return hours > 12 ? hours - 12 : hours;
}

const listFrom = (min: number, max: number) => {
  return Array(max).fill(min, 0, max).map((_, index) => min + index);
};


export default function SelectTime(
  { onSelectTime, label, error, clear, value }: Props,
) {
  const [time, setTime] = useState(() => currentTime());
  const [isPicked, setIsPicked] = useState(false);
  const [isShowPicker, setIsShowPicker] = useState(false);
  const hours12Sys = formatHours12Sys(time.hours);

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const hours = listFrom(1, 12);
  const minutes = listFrom(0, 60);
  
  useEffect(() => {
    if(value){
      const [hours, rest] = value.split(':')
      const [minutes, meridiem] = rest.split(' ')
      setTime({
        hours: +hours,
        minutes: +minutes,
        meridiem: meridiem as Time['meridiem']
      })
    }
  }, [value])

  useEffect(() => {
    if (isPicked || isShowPicker) {
      onSelectTime(time);
    }
  }, [isPicked, isShowPicker, time]);

  useEffect(() => {
    if (clear) {
      setIsPicked(false);
      setIsShowPicker(false);
    }
  }, [clear]);

  useEffect(() => {
    pickerRef.current?.addEventListener("keydown", (evt) => {
      if (evt.key == "Enter") {
        setIsShowPicker((prevState) => !prevState);
      }
    });
  }, []);

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
        tabIndex={0}
        ref={pickerRef}
      >
        {(isPicked || value)
          ? (
            <div className={style.input__value}>
              <span className={style.time}>
                {addZeroLessThanTen(formatHours12Sys(time.hours))}
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
            matchValue={hours12Sys}
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
    <ul className={style.list__wrapper} ref={wrapperRef} tabIndex={0}>
      {list.map((item) => {
        const isMatched = matchValue == item;
        return (
          <li
            key={item}
            className={`${style.item} ${isMatched ? style["item-active"] : ""}`}
            data-value={item}
            onClick={(evt) => onPick(evt.currentTarget.dataset.value!!)}
            ref={isMatched ? activeRef : null}
            tabIndex={0}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
