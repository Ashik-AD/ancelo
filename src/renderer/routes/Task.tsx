import Input from "renderer/components/form/Input";
import TextArea from "renderer/components/form/TextArea";

function Task() {
  return (
    <div>
      <h1>Tasks</h1>
      <Input type="text" name="taskTitle" label="Title" placeholder="Read book.." />
      <TextArea name="description" label="Description" />
    </div>
  );
}
export default Task;
