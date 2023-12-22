import { ChangeEvent, useCallback } from "react";

import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, UseControllerReturn } from "react-hook-form";
import { getFormControllerError } from "../../utils/errors";

export type InputWithValidationProps<T extends string = string> = {
  controller: UseControllerReturn<FieldValues, T>,
  helperText?: string,
} & TextFieldProps;

const InputWithValidation = <T extends string>({ controller, helperText, ...rest }: InputWithValidationProps<T>) => {
  const error = getFormControllerError(controller);
  const hasError = !!error;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;

    controller.field.onChange(value);
  }, [controller.field]);

  return (
    <TextField
      variant="outlined"
      onChange={handleChange}
      value={controller.field.value}
      inputRef={controller.field.ref}
      error={hasError}
      helperText={error || helperText}
      {...rest}
    />
  )
}

export default InputWithValidation;
