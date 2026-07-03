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
