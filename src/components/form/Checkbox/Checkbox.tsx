import { memo, useId } from "react";
import "./checkbox.scss";
import { Icon } from "../../icons";
import clsx from "clsx";
import { BasicInput, BasicInputProps } from "../BasicInput";

interface CheckboxProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "onChange" | "size" | "ref">,
    Omit<BasicInputProps, "size"> {
  danger?: boolean;
  CheckIconComponent?: JSX.Element;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({
  disabled,
  id,
  checked = false,
  danger = false,
  children,
  CheckIconComponent,
  className,
  onChange,
  hintText,
  errorText,
  ...props
}: CheckboxProps) => {
  const generatedCheckboxId = useId();

  const checkboxId = id || generatedCheckboxId;

  return (
    <BasicInput hintText={hintText} errorText={errorText} disabled={disabled}>
      <label
        htmlFor={checkboxId}
        className={clsx("alt-checkbox", className, {
          "alt-checkbox--danger": danger,
        })}
      >
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...props}
          className="alt-checkbox__input"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="alt-checkbox__control">
          {checked ? (
            <div className="alt-checkbox__icon">
              {CheckIconComponent || <Icon i="check" />}
            </div>
          ) : null}
          {children && <div className="alt-checkbox__label">{children}</div>}
        </div>
      </label>
    </BasicInput>
  );
};

export default memo(Checkbox);
