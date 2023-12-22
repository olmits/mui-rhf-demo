import { FieldValues, UseControllerReturn } from "react-hook-form";

export function getFormControllerError<T extends string>(controller: UseControllerReturn<FieldValues, T>, strict = false) {
  const { fieldState: { error, isTouched }, formState: { isSubmitted } } = controller;

  if (error && strict) return error.message;
  if (error && (isTouched || isSubmitted)) return error.message;
  return '';
}