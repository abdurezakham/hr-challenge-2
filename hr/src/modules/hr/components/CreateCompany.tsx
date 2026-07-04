"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Loader2, Mail } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import { formTokens } from "@/src/shared/constants/formTokens";
import FormInput from "@/src/shared/components/forms/FormInput";
import FormFileInput from "@/src/shared/components/forms/FormFileInput";
import AddressGroup from "@/src/shared/components/forms/AddressGroup";
import { signupCompany } from "@/src/modules/hr/api/userApi";
import { validateCompanySignupForm } from "@/src/modules/hr/services/signupServices";
import { CompanySignupFormValues } from "@/src/modules/hr/types";

export default function CreateCompany() {
  const router = useRouter();

  // getting user id
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [form, setForm] = useState<CompanySignupFormValues>({
    user_id: user?.user_id || "",
    company_name: "",
    company_email: "",
    license_file: null,
    tin_number: "",
    phone_number: "",
    region: "",
    city: "",
    subcity: "",
    woreda: "",
    house_number: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof CompanySignupFormValues,
    value: string | number | File | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateCompanySignupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    setSubmitting(true);
    setServerError("");

    try {
      await signupCompany(form);
      router.push("/auth/login"); // or "/companies" as per requirement
    } catch (err) {
      console.log(err);
      setServerError("Company registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        id="companyName"
        label="Company Name"
        placeholder="Acme Inc."
        value={form.company_name}
        onChange={(e) => handleChange("company_name", e.target.value)}
        error={errors.company_name}
        icon={
          <Building2
            className="w-4 h-4"
            style={{ color: formTokens.inputPlaceholder }}
          />
        }
        required
      />
      <FormInput
        id="companyEmail"
        label="Company Email"
        type="email"
        placeholder="admin@acme.com"
        value={form.company_email}
        onChange={(e) => handleChange("company_email", e.target.value)}
        error={errors.company_email}
        icon={
          <Mail
            className="w-4 h-4"
            style={{ color: formTokens.inputPlaceholder }}
          />
        }
        required
      />
      <FormFileInput
        id="licenseFile"
        label="Business License"
        accept="application/pdf,image/jpeg,image/png"
        file={form.license_file}
        onChange={(file) => handleChange("license_file", file)}
        error={errors.license_file}
        required
      />
      <FormInput
        id="tinNumber"
        label="TIN Number"
        placeholder="10-digit TIN"
        value={form.tin_number}
        onChange={(e) => handleChange("tin_number", e.target.value)}
        error={errors.tin_number}
        required
      />
      <FormInput
        id="phoneNumber"
        label="Phone Number"
        placeholder="09..."
        value={form.phone_number}
        onChange={(e) => handleChange("phone_number", e.target.value)}
        error={errors.phone_number}
        required
      />

      <AddressGroup
        values={{
          region: form.region,
          city: form.city,
          subcity: form.subcity,
          woreda: form.woreda,
          houseNumber: form.house_number,
        }}
        onChange={(field, value) => {
          // Map AddressGroup field names to CompanySignupFormValues keys
          const mapping: Record<string, keyof CompanySignupFormValues> = {
            region: "region",
            city: "city",
            subcity: "subcity",
            woreda: "woreda",
            houseNumber: "house_number",
          };
          handleChange(mapping[field], value);
        }}
        errors={{
          region: errors.region,
          city: errors.city,
          subcity: errors.subcity,
          woreda: errors.woreda,
          houseNumber: errors.house_number,
        }}
      />

      {errors.server && <ErrorLine message={errors.server} />}

      {serverError && <ErrorLine message={serverError} />}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md px-6 py-3 font-body font-semibold text-white flex items-center justify-center gap-2 cta-primary"
        style={{ backgroundColor: tokens.navy }}
      >
        {submitting ? "Registering company..." : "Register company"}
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
