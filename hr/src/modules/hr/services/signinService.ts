import { SigninFormValues } from "../types";

export function validateSigninFields(
  values: SigninFormValues,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password.trim()) errors.password = "Password is required";
  return errors;
}
