import { useState } from "react";
import fetcher from "lib/fetch";
import { toast } from "react-hot-toast";
import { useAppStore } from "renderer/store";
import Form from "renderer/components/form/Form";
import Input from "renderer/components/form/Input";
import SelectTime from "renderer/components/form/SelectTime";
import type { Time } from "renderer/components/form/SelectTime";
import TextArea from "renderer/components/form/TextArea";
import { useNavigate } from "react-router-dom";

type SessionState = {
  title: string;
  description?: string;
  schedule: string;
};

type InputError = {
  element: string;
  message: string;
};
export default function CreateSession() {
  const [inputs, setInputs] = useState<SessionState>({
    title: "",
    description: "",
    schedule: "",
  });
  const [error, setError] = useState<InputError | null>(null);

  const router = useNavigate()
  const addSession = useAppStore(({ sessions }) =>
    sessions.getState().addSession
  );

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleSubmitForm = async () => {
    const { title, schedule } = inputs;

    if (!title?.trim()) {
      setError({
        message: `Title can't be empty`,
        element: "title",
      });
      return;
    }

    if (!schedule?.trim()) {
      setError({
        message: `Schedule can't be empty`,
        element: "schedule",
      });
      return;
    }

    const res = await fetcher("/sessions", {
      method: "POST",
      body: JSON.stringify(inputs),
    });

    if (res.error) {
      toast.error(res.error || `Can't create session`, {
        style: { background: "#f97391" },
      });
      return;
    }

    toast.success(`${res.title} session created successfully`);
    addSession(res);
    setInputs({
      title: "",
      schedule: "",
      description: "",
    });
    router('/session/')
  };

  const handleSelectTime = async (time: Time) => {
    const element = "timeSelector";
    if (typeof time != "object" && !Array.isArray(time) && time !== null) {
      setError({
        message: "Invalid time is selected",
        element,
      });
      return;
    }
    if (
      !time.hasOwnProperty("hours") ||
      !time.hasOwnProperty("minutes") ||
      !time.hasOwnProperty("meridiem")
    ) {
      setError({
        message: "Ops! some of the time property missing",
        element,
      });
      return;
    }
    const { hours, minutes, meridiem } = time;
    if (
      (hours < 1 || hours > 12) || (minutes > 59 || minutes < 0) ||
      (meridiem !== "PM" && meridiem !== "AM")
    ) {
      setError({
        message: "Time doesnt exist. Please select correct time",
        element,
      });
      return;
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      schedule: `${hours}:${minutes} ${meridiem}`,
    }));
  };

  return (
    <Form
      onSubmit={handleSubmitForm}
    >
      {error && <p>{error.message}</p>}
      <Input
        type="text"
        name="title"
        value={inputs.title}
        onChange={handleInputChange}
        placeholder="Saturday Funday"
        label="Title"
        error={error?.element == "title" ? error.message : ""}
      />
      <SelectTime onSelectTime={handleSelectTime} />
      <TextArea
        label="Description"
        name="description"
        value={inputs.description}
        onChange={handleInputChange}
        placeholder="Add short description about your session"
      />
      <button className="btn btn__primary">Create Session</button>
    </Form>
  );
}
