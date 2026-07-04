"use client";

import { FormEvent, useState } from "react";
import { Mail, Lock, ArrowRight, CircleDot, Loader2 } from "lucide-react";
import { formTokens } from "@/src/shared/constants/formTokens"; // new form tokens
import Link from "next/link";
import { SigninFormValues } from "@/src/modules/hr/types";
import { validateSigninFields } from "@/src/modules/hr/services/signinService";
import { signinUser } from "@/src/modules/hr/api/userApi";
import { useRouter } from "next/navigation";
import FormInput from "@/src/shared/components/forms/FormInput";
import { ApiError } from "@/src/shared/utils/ApiError";

const EMPTY_VALUES: SigninFormValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();

  const [values, setValues] = useState<SigninFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(field: keyof SigninFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validateSigninFields(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const data = await signinUser(values);
      localStorage.setItem("user", JSON.stringify(data.user));
      // router.push(`/profile/${data.user.user_id}`);
      router.push("/dashboard/companies");
    } catch (err) {
      if (err instanceof ApiError) {
        // Use the exact message from the API
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        backgroundColor: formTokens.inputBg,
        color: formTokens.inputText,
      }}
      className="min-h-screen font-body"
    >
      <style>{`
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }

        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -8px rgba(16,27,42,0.15); }

        .cta-primary { transition: background-color 0.2s ease, transform 0.2s ease; }
        .cta-primary:hover { background-color: ${formTokens.buttonPrimaryHoverBg}; transform: translateY(-1px); }

        .input-focus { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .input-focus:focus { border-color: ${formTokens.inputFocusBorder}; box-shadow: 0 0 0 2px ${formTokens.inputFocusRing}; outline: none; }

        .link-underline { position: relative; }
        .link-underline::after {
          content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px;
          background-color: ${formTokens.inputFocusBorder}; transition: width 0.2s ease;
        }
        .link-underline:hover::after { width: 100%; }
      `}</style>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Brandmark */}
        <div className="mb-10 flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: formTokens.dotBg }}
          >
            <CircleDot
              className="w-4 h-4"
              style={{ color: formTokens.dotBorder }}
            />
          </div>
          <span
            className="font-display text-lg font-medium tracking-tight"
            style={{ color: formTokens.inputText }}
          >
            Registry
          </span>
        </div>

        {/* Login card */}
        <div
          className="w-full max-w-md relative rounded-md p-8 card-hover"
          style={{
            backgroundColor: formTokens.cardBg,
            border: `1px solid ${formTokens.cardBorder}`,
          }}
        >
          {/* Decorative dot */}
          <div
            className="absolute top-4 left-4 w-3 h-3 rounded-full"
            style={{
              backgroundColor: formTokens.dotBg,
              border: `1px solid ${formTokens.dotBorder}`,
            }}
          />

          <div className="mb-8">
            <h1
              className="mt-2 font-display text-2xl font-medium tracking-tight"
              style={{ color: formTokens.inputText }}
            >
              Sign in to your account
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: formTokens.inputPlaceholder }}
            >
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <FormInput
              id="email"
              label="Email"
              placeholder="you@organization.com"
              value={values.email}
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

            {/* Password */}
            <FormInput
              id="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              value={values.password}
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

            {/* Forgot password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs font-mono uppercase tracking-wide link-underline"
                style={{ color: formTokens.inputLabel }}
              >
                Forgot password?
              </a>
            </div>

            {serverError && (
              <p
                className="flex items-center gap-1.5 mt-1 text-xs font-mono"
                style={{ color: formTokens.inputErrorText }}
              >
                <span
                  className="inline-block w-1 h-1 rounded-full"
                  style={{ backgroundColor: formTokens.inputErrorText }}
                />
                {serverError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md px-6 py-3 font-body font-semibold flex items-center justify-center gap-2 cta-primary"
              style={{
                backgroundColor: formTokens.buttonPrimaryBg,
                color: formTokens.buttonPrimaryText,
              }}
            >
              {submitting ? "Signing in..." : "Sign in"}
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: formTokens.inputPlaceholder }}
          >
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium link-underline"
              style={{ color: formTokens.inputFocusBorder }}
            >
              Sign up
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 text-sm font-mono uppercase tracking-wide link-underline"
          style={{ color: formTokens.inputLabel }}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
