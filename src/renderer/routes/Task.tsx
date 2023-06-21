import fetcher from "main/lib/fetch";
import { useState } from "react";
import Form from "renderer/components/form/Form";
import Input from "renderer/components/form/Input";
import TextArea from "renderer/components/form/TextArea";

type State = {
  title: string;
  duration?: string;
  description?: string;
};
function Task() {
  const [input, setInput] = useState<State>({
    title: "",
    duration: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState<string | null>(null);
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
    if (!title.trim() || !duration?.trim()) {
      return setError("Empty field founds");
    }

    try {
      const req = await fetcher(`/tasks`, {
        method: "POST",
        body: JSON.stringify({title, duration, description})
      });
      console.log(req);
      setSuccess("One task created");
    } catch (error) {
      console.log(error);
      setError(`Can't create task`);
    }
  }
  return (
    <div>
      <h1>Tasks</h1>
      {sucess || error}
      <Form onSubmit={handleSubmitForm}>
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
          defaultValue={input.duration || 25}
          onBlur={handleMutateInput}
        />
        <TextArea
          name="description"
          label="Description"
          defaultValue={input.description}
          onBlur={handleMutateInput}
        />
        <button>Create Task</button>
      </Form>
    </div>
  );
}
export default Task;
