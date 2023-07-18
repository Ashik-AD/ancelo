import Form from "renderer/components/form/Form";
import Input from "renderer/components/form/Input";
import SelectTime from "renderer/components/form/SelectTime";
import TextArea from "renderer/components/form/TextArea";

export default function CreateSession() {
  const handleSubmitForm = () => {
  };
  return (
    <Form
      onSubmit={handleSubmitForm}
    >
      <Input type="text" name="title" placeholder="Saturday Funday" label="Title" />
      <SelectTime />
      <TextArea label="Description" placeholder="Add short description about your session"/>
      <button className="btn btn__primary">Create Session</button>
    </Form>
  );
}

