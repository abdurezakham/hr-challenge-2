import { ApiError } from "@/src/shared/utils/ApiError";
import {
  CompanySignupFormValues,
  ProfileResponse,
  SigninFormValues,
  SigninResponse,
  UserSignupFormValues,
} from "../types";
import { objectToFormData } from "@/src/shared/utils/objectToformData";

export async function signinUser(
  values: SigninFormValues,
): Promise<SigninResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configured");

  const response = await fetch(`${baseUrl}/user/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data: SigninResponse = await response.json();

  if (!response.ok || !data.success) {
    // Build field errors if any (for consistency, even if login rarely has field errors)
    const fieldErrors: Record<string, string> = {};
    if (data.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(messages)
          ? messages.join(" ")
          : String(messages);
      }
    }
    throw new ApiError(data.message || "Login failed", fieldErrors);
  }

  console.log(data);

  return data;
}

// src/modules/hr/api/userApi.ts

export async function signupUser(
  values: UserSignupFormValues,
): Promise<Record<string, unknown>> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configureddddd");

  const formData = objectToFormData(values);

  const response = await fetch(`${baseUrl}/user/register/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    // build field errors simply
    const fieldErrors: Record<string, string> = {};
    if (data.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(messages)
          ? messages.join(" ")
          : String(messages);
      }
    }
    throw new ApiError(data.message || "Registration failed", fieldErrors);
  }
  console.log("signed up: ", data);
  return data; // now returns the success response (e.g., { success: true, message, user })
}

export async function signupCompany(
  values: CompanySignupFormValues,
): Promise<Record<string, unknown>> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configured");

  // Convert all fields (including the File object for license_file) to FormData
  const formData = objectToFormData(values);
  console.log("Company signup form values:", values);

  const response = await fetch(`${baseUrl}/company/register/`, {
    method: "POST",
    body: formData,
    // No Content-Type header – fetch sets it automatically with the correct boundary
  });

  const data = await response.json();
  console.log("Company signup response:", data);

  if (!response.ok || !data.success) {
    const fieldErrors: Record<string, string> = {};
    if (data.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(messages)
          ? messages.join(" ")
          : String(messages);
      }
    }
    throw new ApiError(
      data.message || "Company registration failed",
      fieldErrors,
    );
  }

  console.log("Company registered:", data);
  return data; // contains { success: true, message, ... } – use for navigation
}

export async function getProfile(userId: string): Promise<ProfileResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configured");

  const response = await fetch(`${baseUrl}/user/profile/${userId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}` // if needed
    },
  });

  const data: ProfileResponse = await response.json();

  if (!response.ok || !data.success) {
    const fieldErrors: Record<string, string> = {};
    if (data.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(messages)
          ? messages.join(" ")
          : String(messages);
      }
    }
    throw new ApiError(data.message || "Failed to fetch profile", fieldErrors);
  }

  return data;
}
