import { ChangeEvent, ReactNode, useState } from "react";
import Form from "../form/Form";
import Input from "../form/Input";
import SelectTime, { Time } from "../form/SelectTime";
import DayScheduleSelect, {
  DaySchedule,
} from "../day-schedule/DayScheduleSelect";

import style from "./style.module.scss";
import ColorPicker from "../form/ColorPicker";

export type RoutineFormState = {
  title: string;
  schedule: string;
  breakDuration: number;
  scheduleDays: string[];
  theme: string;
};
export interface RoutineFormProps {
  onSubmit?: (values: RoutineFormState) => void;
  values?: RoutineFormState;
  children?: ReactNode;
}

export default function RoutineForm(
  { values, onSubmit, children }: RoutineFormProps,
) {
  const [inputs, setInputs] = useState<RoutineFormState>({
    schedule: values?.schedule || "",
    title: values?.title || "",
    theme: values?.theme || "",
    breakDuration: values?.breakDuration || 5,
    scheduleDays: values?.scheduleDays || [],
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))

  }

  async function handleSubmit() {
    const { title, schedule, theme, breakDuration, scheduleDays } = inputs;

    if (
      !title?.trim() || !theme?.trim() || !schedule?.trim() || !breakDuration ||
      scheduleDays?.length == 0
    ) {
      setError(`Can't create routine due to insufficient details.`);
      return;
    }
    onSubmit && onSubmit(inputs);
  }
  function handleSelectDays(days: DaySchedule) {
    setInputs((prevInputs) => ({ ...prevInputs, scheduleDays: days }));
  }
  function handlePickColor(color: string) {
    setInputs((prevInputs) => ({ ...prevInputs, theme: color }));
  }

  function handleSelectSchedule(time: Time) {
    setInputs(prevInputs => ({
      ...prevInputs,
      schedule: `${time.hours}:${time.minutes} ${time.meridiem}` 
    }))
  }
  return (
    <>
      {error && <p className="alert__error">{error}</p>}
      <Form onSubmit={handleSubmit} className={style.routine__form}>
        <div className={style.span__2}>
          <Input
            name="title"
            type="text"
            label="Title"
            value={inputs.title}
            placeholder="Read commic"
            onChange={handleChange}
          />
        </div>
        <div className={style.span__2}>
          <DayScheduleSelect
            onSelect={handleSelectDays}
            selected={values?.scheduleDays}
            label="Select Day"
          />
        </div>
        <div className={`flex ${style.span__2}`}>
          <SelectTime
            onSelectTime={handleSelectSchedule}
            label="Start time"
          />
          <Input
            type="number"
            name="breakDuration"
            value={inputs.breakDuration}
            label="Break Duration (minute)"
            onChange={handleChange}
          />
        </div>
        <ColorPicker
          label="Theme"
          onPick={handlePickColor}
          color={inputs.theme}
        />
        <div className={style.span__full}>
          {children ? children : <button className="btn btn__primary">Create Routine</button>}
        </div>
      </Form>
    </>
  );
}
