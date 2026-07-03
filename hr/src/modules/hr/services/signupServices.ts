import { CompanySignupFormValues, UserSignupFormValues } from "../types";

export function validateUserSignupForm(values: UserSignupFormValues) {
  const errors: Partial<Record<keyof UserSignupFormValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (values.profileImage) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(values.profileImage.type)) {
      errors.profileImage = "Only JPG, PNG, GIF, or WebP images are allowed.";
    }
  }
  return errors;
}

export function validateCompanySignupForm(values: CompanySignupFormValues) {
  const errors: Partial<Record<keyof CompanySignupFormValues, string>> = {};

  if (!values.company_name.trim()) {
    errors.company_name = "Company name is required";
  }

  if (!values.company_email.trim()) {
    errors.company_email = "Company email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.company_email)
  ) {
    errors.company_email = "Invalid company email address";
  }

  if (!values.license_file) {
    errors.license_file = "License file is required";
  }

  if (!values.tin_number.trim()) {
    errors.tin_number = "TIN number is required";
  }

  if (!values.phone_number.trim()) {
    errors.phone_number = "Phone number is required";
  }

  if (!values.region.trim()) {
    errors.region = "Region is required";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.subcity.trim()) {
    errors.subcity = "Subcity is required";
  }

  if (!values.woreda.trim()) {
    errors.woreda = "Woreda is required";
  }

  if (!values.house_number.trim()) {
    errors.house_number = "House number is required";
  }

  return errors;
}
