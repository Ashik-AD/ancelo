import { useState } from "react";
import Form from "../form/Form";
import Input from "../form/Input";
import SelectTime from "../form/SelectTime";
import DayScheduleSelect from "../day-schedule/DayScheduleSelect";

import style from "./style.module.scss";
import ColorPicker from "../form/ColorPicker";

export type RoutineFormState = {
  title: string;
  schedule: string;
  breakDuration: number;
  scheduleDay: string[];
  theme: string;
};
export interface RoutineFormProps {
  onSubmit: (values: RoutineFormState) => void;
  values?: RoutineFormState;
  onCancel?: () => void;
  isUpdate?: boolean;
}

export default function RoutineForm(
  { values, onSubmit, onCancel, isUpdate }: RoutineFormProps,
) {
  const [inputs, setInputs] = useState<RoutineFormState>({
    schedule: values?.schedule || "",
    title: values?.title || "",
    theme: values?.theme || "",
    breakDuration: values?.breakDuration || 5,
    scheduleDay: values?.scheduleDay || [],
  });

  async function handleSubmit() {
  }
  function handleSelectDays() {
  }
  return (
    <Form onSubmit={handleSubmit} className={style.routine__form}>
      <div className={style.span__2}>
        <Input
          name="title"
          type="text"
          label="Title"
          value={inputs.title}
          placeholder="Read commic"
        />
      </div>
      <div className={style.span__2}>
      <DayScheduleSelect
        onSelect={handleSelectDays}
        selected={values?.scheduleDay}
          label="Select Day"
      />
      </div>
      <SelectTime onSelectTime={() => {}} label="Start time" />
      <ColorPicker label="Theme" />
    </Form>
  );
}
