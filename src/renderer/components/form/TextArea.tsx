import { ComponentPropsWithoutRef } from "react";

import Style from "./style.module.scss";

interface Props extends ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  error?: string;
}
function TextArea({ name, label, error, ...rest }: Props) {
  const textArea = <textarea name={name} {...rest} />;
  if (label) {
    return (
      <div className={Style.field__wrapper}>
        <label className={Style.form__label}>{label}</label>
        {textArea}
      </div>
    );
  }
  return textArea;
}
export default TextArea;
