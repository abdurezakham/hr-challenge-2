export type SigninFormValues = {
  email: string;
  password: string;
};

export type UserSignupFormValues = {
  name: string;
  email: string;
  password: string;
  profileImage: File | null;
};

export type user = {
  user_id: string;
  name: string;
  email: string;
  profile_image: string | null;
};

export type CompanySignupFormValues = {
  user_id?: string;
  company_name: string;
  company_email: string;
  license_file: File | null;
  tin_number: string;
  phone_number: string;
  region: string;
  city: string;
  subcity: string;
  woreda: string;
  house_number: string;
};

export type CompanyListItem = {
  company_id: string;
  company_name: string;
  company_email: string;
  tin_number: string;
  phone_number: string;
  address: {
    region: string;
    city: string;
    subcity: string;
    woreda: string;
    house_number: string;
  };
  license_file: string | File | undefined | null;
};

export type ApiResponse<T = Record<string, unknown>> = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>; // optional, only present on error
} & T; // merges the extra fields directly into the object

export type SigninResponse = ApiResponse<{
  user: {
    user_id: string;
    name: string;
    email: string;
  };
}>;

export type ProfileResponse = ApiResponse<{
  user: {
    user_id: string;
    name: string;
    email: string;
    profile_image: string | null;
  };
}>;

export type EmployeeFormValues = {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string; // optional
  department: string; // constrained to options
  role: string;
  status: string; // defaults to "active"
  join_date: string; // YYYY-MM-DD
  employee_number: string;
};

export type EmployeeListItem = {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  department: string;
  role: string;
  status: string;
  join_date: string;
};
