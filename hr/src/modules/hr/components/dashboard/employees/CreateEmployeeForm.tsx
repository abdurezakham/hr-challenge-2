"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  Mail,
  Phone,
  User,
  Briefcase,
  Calendar,
} from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import { formTokens } from "@/src/shared/constants/formTokens";
import FormInput from "@/src/shared/components/forms/FormInput";
import { useCreateEmployee } from "@/src/modules/hr/hooks/useCreateEmployee";
import { EmployeeFormValues } from "@/src/modules/hr/types";
import { useCurrentUser } from "@/src/shared/hooks/useCurrentUser";
import { useCompanyStore } from "../../../store/companyStore";
import { ApiError } from "@/src/shared/utils/ApiError";
import FormSelect from "../../../../../shared/components/forms/FormSelect";
import { validateEmployeeForm } from "../../../services/employeeService";

const DEPARTMENTS = [
  { value: "HR", label: "HR" },
  { value: "Engineering", label: "Engineering" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Operations", label: "Operations" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "on_leave", label: "On Leave" },
];

const initialForm: EmployeeFormValues = {
  employee_number: "",
  employee_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  department: "",
  role: "",
  status: "active",
  join_date: new Date().toISOString().split("T")[0], // default today
};

export default function CreateEmployeeForm() {
  const router = useRouter();
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);
  const user = useCurrentUser();
  const { mutateAsync: create, isPending } = useCreateEmployee();

  const [form, setForm] = useState<EmployeeFormValues>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  if (!selectedCompany || !user) {
    return (
      <p className="text-sm text-brassDeep">
        Missing company or user context. Please navigate from a company.
      </p>
    );
  }

  const handleChange = (field: keyof EmployeeFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // if (errors[field]) {
    //   setErrors((prev) => {
    //     const next = { ...prev };
    //     delete next[field];
    //     return next;
    //   });
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateEmployeeForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    setServerError("");

    try {
      await create({
        companyId: selectedCompany.company_id,
        userId: user.user_id,
        values: form,
      });
      // Navigate back to the employees list for this company
      router.push(
        `/dashboard/companies/${selectedCompany.company_id}/employees`,
      );
    } catch (err) {
      if (err instanceof ApiError) {
        if (Object.keys(err.fieldErrors).length > 0) {
          setErrors(err.fieldErrors);
        } else {
          setServerError(err.message);
        }
      } else {
        console.log(err);
        setServerError("An unexpected error occurredddddd.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          id="employeeId"
          label="Employee ID"
          placeholder="e.g., EMP001"
          value={form.employee_id}
          onChange={(e) => handleChange("employee_id", e.target.value)}
          error={errors.employee_id}
          icon={
            <User
              className="w-4 h-4"
              style={{ color: formTokens.inputPlaceholder }}
            />
          }
          required
        />
        <FormInput
          id="employeeNumber"
          label="Employee Number"
          placeholder="e.g., 001"
          value={form.employee_number}
          onChange={(e) => handleChange("employee_number", e.target.value)}
          error={errors.employee_number}
          icon={
            <User
              className="w-4 h-4"
              style={{ color: formTokens.inputPlaceholder }}
            />
          }
          required
        />
        <FormInput
          id="firstName"
          label="First Name"
          placeholder="John"
          value={form.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
          error={errors.first_name}
          required
        />
        <FormInput
          id="lastName"
          label="Last Name"
          placeholder="Doe"
          value={form.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          error={errors.last_name}
          required
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="john@company.com"
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
          id="phoneNumber"
          label="Phone Number"
          placeholder="09... (optional)"
          value={form.phone_number || ""}
          onChange={(e) => handleChange("phone_number", e.target.value)}
          error={errors.phone_number}
          icon={
            <Phone
              className="w-4 h-4"
              style={{ color: formTokens.inputPlaceholder }}
            />
          }
        />
        <FormSelect
          id="department"
          label="Department"
          value={form.department}
          onChange={(e) => handleChange("department", e.target.value)}
          options={DEPARTMENTS}
          error={errors.department}
          required
        />
        <FormInput
          id="role"
          label="Role"
          placeholder="Software Engineer"
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value)}
          error={errors.role}
          icon={
            <Briefcase
              className="w-4 h-4"
              style={{ color: formTokens.inputPlaceholder }}
            />
          }
          required
        />
        <FormSelect
          id="status"
          label="Status"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={STATUS_OPTIONS}
          error={errors.status}
          required
        />
        <FormInput
          id="joinDate"
          label="Join Date"
          type="date"
          value={form.join_date}
          onChange={(e) => handleChange("join_date", e.target.value)}
          error={errors.join_date}
          icon={
            <Calendar
              className="w-4 h-4"
              style={{ color: formTokens.inputPlaceholder }}
            />
          }
          required
        />
      </div>

      {serverError && <ErrorLine message={serverError} />}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md px-6 py-3 font-body font-semibold text-white flex items-center justify-center gap-2 cta-primary"
        style={{ backgroundColor: tokens.navy }}
      >
        {isPending ? "Creating employee..." : "Create Employee"}
        {isPending ? (
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
