"use client";

import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/userApi";
import { UserSignupFormValues } from "../types";

export function useSignupUser() {
  const mutation = useMutation({
    mutationFn: (values: UserSignupFormValues) => signupUser(values),
  });

  return {
    signup: mutation.mutateAsync, // trigger signup and return a promise
    isPending: mutation.isPending, // loading state for the button
    error: mutation.error, // optional direct access to the error
    reset: mutation.reset, // reset mutation state if needed
  };
}
