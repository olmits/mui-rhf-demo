import InputMask from 'react-input-mask';
import { TextField } from "@mui/material";

import { getFormControllerError } from "../../utils/errors";
import { InputWithValidationProps } from "../InputWithValidation";

type InputWithMaskProps<T extends string = string> = { mask: string } & InputWithValidationProps<T>;

const InputWithMask = <T extends string>({ mask, controller, helperText, label }: InputWithMaskProps<T>) => {
  const error = getFormControllerError(controller);
  const hasError = !!error;

  return (
    <InputMask
      mask={mask}
      value={controller.field.value}
      onChange={controller.field.onChange}
      inputRef={controller.field.ref}
    >
      <TextField
        label={label}
        variant="outlined"
        error={hasError}
        helperText={error || helperText}
      />
    </InputMask>
  )
}

export default InputWithMask;