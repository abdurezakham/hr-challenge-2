"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import { formTokens } from "@/src/shared/constants/formTokens";
import FormInput from "@/src/shared/components/forms/FormInput";
import FormFileInput from "@/src/shared/components/forms/FormFileInput";
import { signupUser } from "@/src/modules/hr/api/userApi";
import { validateUserSignupForm } from "@/src/modules/hr/services/signupServices";
import { UserSignupFormValues } from "@/src/modules/hr/types";
import { useSignupUser } from "../hooks/useSignupUser";
import { ApiError } from "@/src/shared/utils/ApiError";

export default function UserSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<UserSignupFormValues>({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof UserSignupFormValues,
    value: string | number | File | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  //   // using reactQuery
  //   const { signup, isPending } = useSignupUser();

  //   const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const validationErrors = validateUserSignupForm(form);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   // Clear previous errors before new attempt
  //   setErrors({});
  //   setServerError("");

  //   try {
  //     await signup(form);            // ← calls the mutation
  //     router.push("/auth/login");    // success → redirect
  //   } catch (err) {
  //     if (err instanceof ApiError) {
  //       // Per‑field errors from the API
  //       if (Object.keys(err.fieldErrors).length > 0) {
  //         setErrors(err.fieldErrors);
  //       } else {
  //         setServerError(err.message);
  //       }
  //     } else {
  //       setServerError("An unexpected error occurred.");
  //     }
  //   }
  //   // No finally block – React Query manages isPending automatically
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateUserSignupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      await signupUser(form);
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
      setServerError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        id="userName"
        label="Full Name"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        icon={
          <User
            className="w-4 h-4"
            style={{ color: formTokens.inputPlaceholder }}
          />
        }
        required
      />
      <FormInput
        id="userEmail"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        icon={
          <Mail
            className="w-4 h-4"
            style={{ color: formTokens.inputPlaceholder }}
          />
        }
        required
      />
      <FormInput
        id="userPassword"
        label="Password"
        type="password"
        placeholder="Create password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={errors.password}
        icon={
          <Lock
            className="w-4 h-4"
            style={{ color: formTokens.inputPlaceholder }}
          />
        }
        required
      />
      <FormFileInput
        id="userImage"
        label="Profile Image"
        accept="image/jpeg,image/png,image/gif,image/webp"
        file={form.profileImage}
        onChange={(file) => handleChange("profileImage", file)}
        error={errors.image}
      />

      {errors.server && <ErrorLine message={errors.server} />}

      {serverError && <ErrorLine message={serverError} />}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md px-6 py-3 font-body font-semibold text-white flex items-center justify-center gap-2 cta-primary"
        style={{ backgroundColor: tokens.navy }}
      >
        {submitting ? "Creating account..." : "Create account"}
        {submitting ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
      </button>
    </form>
  );
}
function ErrorLine({ message }: { message: string }) {
  return (
    <p
      className="flex items-center gap-1.5 mt-1 text-xs font-mono"
      style={{ color: tokens.brassDeep }}
    >
      <span
        className="inline-block w-1 h-1 rounded-full"
        style={{ backgroundColor: tokens.brassDeep }}
      />
      {message}
    </p>
  );
}
