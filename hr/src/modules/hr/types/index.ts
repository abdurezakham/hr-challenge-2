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

export type CompanySignupFormValues = {
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
