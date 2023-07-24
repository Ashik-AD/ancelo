import { ComponentPropsWithoutRef } from "react";

import Style from "./style.module.scss";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
}
function Input({ name, type, label, error, ...rest }: Props) {
  return (
    <div
      className={`${Style.field__wrapper} ${error && Style.field__wrapper__error}`}
    >
      {label && <label className={Style.input__label}>{label}</label>}
      <input type={type} name={name} {...rest} />
    </div>
  );
}
export default Input;
