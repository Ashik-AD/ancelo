import { ReactNode } from "react";

type Props = {
  onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

function Form({ onSubmit, children }: Props) {
  function handleSubmitForm(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmitForm}>
      {children}
    </form>
  );
}
export default Form;
