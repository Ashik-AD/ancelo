import { ComponentPropsWithoutRef } from "react";

import Style from './style.module.scss'

interface Props extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
}
function Input({ name, type, label, error, ...rest }: Props) {
  if (label) {
    return (
      <div className={Style.field__wrapper}>
        <label className={Style.form__label}>{label}</label>
        <input type={type} name={name} {...rest} />
      </div>
    );
  }
  return <input type={type} name={name} {...rest} />;
}
export default Input;
