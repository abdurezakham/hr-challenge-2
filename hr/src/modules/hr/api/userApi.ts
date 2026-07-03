import {
  CompanySignupFormValues,
  SigninFormValues,
  UserSignupFormValues,
} from "../types";

export async function signinUser(values: SigninFormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  console.log("user signin: ", values);
  //   try {
  //     const response = await fetch("/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to sign in");
  //     }
  //   } catch (error) {
  //     throw new Error("Failed to sign in");
  //   }
}

export async function signupUser(values: UserSignupFormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("user signup: ", values);
  //   try {
  //     const response = await fetch("/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to sign in");
  //     }
  //   } catch (error) {
  //     throw new Error("Failed to sign in");
  //   }
}

export async function signupCompany(
  values: CompanySignupFormValues,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("company signup: ", values);
  //   try {
  //     const response = await fetch("/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to sign in");
  //     }
  //   } catch (error) {
  //     throw new Error("Failed to sign in");
  //   }
}
