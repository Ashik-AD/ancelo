import { useState } from "react";
import { useModal } from "renderer/hooks/useModal";
import fetcher from "main/lib/fetch";
import Form from "../form/Form";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import Modal from "../modal/Modal";
import { shallow } from "zustand/shallow";
import style from "./style.module.scss";
import { toast } from "react-hot-toast";
import { useTaskStore } from "renderer/store";
type State = {
  title: string;
  duration: number;
  description?: string;
};

function AddTask() {
  const addTask = useTaskStore((state) => state.addTask, shallow);
  const [input, setInput] = useState<State>({
    title: "",
    duration: 25,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { showModal, onToggle } = useModal();
  function handleMutateInput(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  }
  async function handleSubmitForm(
    event: React.SyntheticEvent<HTMLFormElement>,
  ) {
    const { title, duration, description } = input;
    if (!title.trim() || !duration) {
      return setError("Empty field founds");
    }

    try {
      const res = await fetcher(`/tasks`, {
        method: "POST",
        body: JSON.stringify({ title, duration, description }),
      });
      addTask(res);
      toast.success("One task created");
      onToggle();
    } catch (error) {
      console.log(error);
      setError(`Can't create task`);
      toast.error("Can't create task");
    }
  }
  return (
    <div>
      <button onClick={onToggle}>Add Task</button>
      {showModal && (
        <Modal onClose={onToggle}>
          <div className={style.add__task}>
            <h2>Create New Task</h2>
            <Form onSubmit={handleSubmitForm} className={style.task__form}>
              {error}
              <Input
                type="text"
                name="title"
                label="Title"
                placeholder="Read book.."
                onBlur={handleMutateInput}
              />
              <Input
                type="number"
                name="duration"
                label="Duration"
                placeholder="25"
                defaultValue={input.duration}
                onBlur={handleMutateInput}
              />
              <TextArea
                name="description"
                label="Description"
                defaultValue={input.description}
                onBlur={handleMutateInput}
              />
              <button className="btn btn__primary">Create Task</button>
            </Form>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default AddTask;
