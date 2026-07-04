"use client";

import { validateCompanySignupForm } from "@/src/modules/hr/services/signupServices"; // reuse client validation
import { CompanySignupFormValues } from "@/src/modules/hr/types";
import AddressGroup from "@/src/shared/components/forms/AddressGroup";
import FormFileInput from "@/src/shared/components/forms/FormFileInput";
import FormInput from "@/src/shared/components/forms/FormInput";
import { formTokens } from "@/src/shared/constants/formTokens";
import { tokens } from "@/src/shared/constants/landing";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Building2, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompanyStore } from "../../../store/companyStore";
import { useCurrentUser } from "@/src/shared/hooks/useCurrentUser";
import { updateCompany } from "../../../api/companiesApi";
import { ApiError } from "@/src/shared/utils/ApiError";

export default function EditCompanyForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);
  const setSelectedCompany = useCompanyStore((s) => s.setSelectedCompany);

  const currentUser = useCurrentUser();

  const [form, setForm] = useState<CompanySignupFormValues>({
    user_id: "",
    company_name: selectedCompany?.company_name || "",
    company_email: selectedCompany?.company_email || "",
    license_file: null, // file input won't pre-fill; we'll keep the existing file
    tin_number: selectedCompany?.tin_number || "",
    phone_number: selectedCompany?.phone_number || "",
    region: selectedCompany?.address?.region || "",
    city: selectedCompany?.address?.city || "",
    subcity: selectedCompany?.address?.subcity || "",
    woreda: selectedCompany?.address?.woreda || "",
    house_number: selectedCompany?.address?.house_number || "",
  });

  useEffect(() => {
    if (currentUser?.user_id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({ ...prev, user_id: currentUser.user_id }));
    }
  }, [currentUser]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof CompanySignupFormValues,
    value: string | number | File | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation (same rules as signup)
    const validationErrors = validateCompanySignupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError("");
    setSuccessMessage("");

    try {
      await updateCompany(
        selectedCompany!.company_id,
        currentUser!.user_id,
        form,
      );
      // Update local store to reflect changes
      if (selectedCompany) {
        setSelectedCompany({
          ...selectedCompany,
          company_name: form.company_name,
          company_email: form.company_email,
          tin_number: form.tin_number,
          phone_number: form.phone_number,
          address: {
            region: form.region,
            city: form.city,
            subcity: form.subcity,
            woreda: form.woreda,
            house_number: form.house_number,
          },
        });
      }
      // Invalidate companies list to keep it up-to-date
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setSuccessMessage("Company updated successfully!");
      // Optional: redirect after a moment
      // router.push(`/dashboard/companies/${selectedCompany?.company_id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        if (Object.keys(err.fieldErrors).length > 0) {
          setErrors(err.fieldErrors);
        } else {
          setServerError(err.message);
        }
      } else {
        setServerError("An unexpected error occurred.");
      }
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
        required={false} // not mandatory for update unless you want to force re-upload
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

      {serverError && <ErrorLine message={serverError} />}
      {successMessage && <SuccessLine message={successMessage} />}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md px-6 py-3 font-body font-semibold text-white flex items-center justify-center gap-2 cta-primary"
        style={{ backgroundColor: tokens.navy }}
      >
        {submitting ? "Saving..." : "Update Company"}
        {submitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
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

function SuccessLine({ message }: { message: string }) {
  return (
    <p
      className="flex items-center gap-1.5 mt-1 text-xs font-mono"
      style={{ color: tokens.sage }}
    >
      <span
        className="inline-block w-1 h-1 rounded-full"
        style={{ backgroundColor: tokens.sage }}
      />
      {message}
    </p>
  );
}
