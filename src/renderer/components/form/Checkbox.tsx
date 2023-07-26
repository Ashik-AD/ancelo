import style from "./style.module.scss";

export interface CheckboxProps {
  name?: string;
  value?: string | number;
  checked?: boolean;
  label?: string;
  onCheck: (value?: string) => void;
}
export default function Checkbox({
  name,
  value,
  checked,
  label,
  onCheck,
}: CheckboxProps) {
  return (
    <div
      aria-label="checkbox"
      role="checkbox"
      aria-details={name}
      aria-valuetext={value?.toString()}
      tabIndex={0}
      aria-checked={checked || false}
      aria-selected={checked || false}
      className={style.checkbox}
      onClick={() => onCheck(value?.toString())}
    >
      {label && <label htmlFor="checkbox label">{label}</label>}
      <span className={style.checkbox__graphy}></span>
    </div>
  );
}
