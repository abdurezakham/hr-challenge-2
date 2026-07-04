import { EmployeeFormValues } from "../types";

export function validateEmployeeForm(values: EmployeeFormValues) {
  const errors: Partial<Record<keyof EmployeeFormValues, string>> = {};

  if (!values.employee_id.trim()) {
    errors.employee_id = "Employee ID is required";
  }

  if (!values.first_name.trim()) {
    errors.first_name = "First name is required";
  }

  if (!values.last_name.trim()) {
    errors.last_name = "Last name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // if (values.phone_number && !/^[0-9]{9,15}$/.test(values.phone_number)) {
  //   errors.phone_number = "Phone number must be 9-15 digits";
  // }

  if (!values.department.trim()) {
    errors.department = "Department is required";
  }

  if (!values.role.trim()) {
    errors.role = "Role is required";
  }

  if (!values.status.trim()) {
    errors.status = "Status is required";
  } else if (!["active", "on_leave"].includes(values.status)) {
    errors.status = "Status must be active or on_leave";
  }

  if (!values.join_date.trim()) {
    errors.join_date = "Join date is required";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.join_date)) {
    errors.join_date = "Join date must be YYYY-MM-DD";
  }

  if (!values.employee_number.trim()) {
    errors.employee_number = "Employee number is required";
  }

  return errors;
}
