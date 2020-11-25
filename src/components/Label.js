import React from "react";
import cn from "classnames";
import useFormWithValidation from '../hooks/useFormWithValidation';

function Label({ name, placeholder, isBlack, values, ...props }) {
  const {  errors, handleChange } = useFormWithValidation();

  return (
    <label className="modal__field">
      <input
        name={name}
        className={cn("input", {
          input_type_error: errors[name],
          input_theme_black: isBlack,

        })}
        value={values[name] || ""}
        onChange={handleChange}
        {...props}
      />
      <span
        className={cn("modal__placeholder", {
          "modal__placeholder_is-fixed": values[name],
        })}
      >
        {placeholder}
      </span>
      <span
        className={cn("modal__input-error", {
          "modal__input-error_active": errors[name],
        })}
      >
        {errors[name] || ""}
      </span>
    </label>
  );
}

export default Label;
