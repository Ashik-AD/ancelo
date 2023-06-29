import { HTMLAttributes, ReactNode } from "react";

type Props = {
  onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  children: ReactNode;
} & HTMLAttributes<HTMLFormElement>;

function Form({ onSubmit, children, ...rest }: Props) {
  function handleSubmitForm(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(event);
  }
  return (
    <form onSubmit={handleSubmitForm} {...rest}>
      {children}
    </form>
  );
}
export default Form;
