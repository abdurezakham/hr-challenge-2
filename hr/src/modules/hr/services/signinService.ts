import { SigninFormValues } from "../types";

export function validateSigninFields(
  values: SigninFormValues,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.email.trim()) errors.email = "Email is required";
  if (!values.password.trim()) errors.password = "Password is required";
  return errors;
}
