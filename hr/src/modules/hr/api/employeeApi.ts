import { ApiError } from "@/src/shared/utils/ApiError";
import { EmployeeFormValues, EmployeeListItem } from "../types";
import { objectToFormData } from "@/src/shared/utils/objectToformData";

type CreateEmployeeParams = {
  companyId: string;
  userId: string;
  values: EmployeeFormValues;
};

export async function createEmployee({
  companyId,
  userId,
  values,
}: CreateEmployeeParams): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configured");

  const response = await fetch(
    `${baseUrl}/employees/?company_id=${companyId}&user_id=${userId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  const data = await response.json();

  console.log("Employee getting created obj: ", JSON.stringify(values));

  console.log("Create Employee response: ", data);

  if (!response.ok || !data.success) {
    const fieldErrors: Record<string, string> = {};
    if (data.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(messages)
          ? messages.join(" ")
          : String(messages);
      }
    }
    throw new ApiError(data.message || "Employee creation failed", fieldErrors);
  }
}

// export async function createEmployee({
//   companyId,
//   userId,
//   values,
// }: CreateEmployeeParams): Promise<void> {
//   const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
//   if (!baseUrl) throw new ApiError("API base URL not configured");

//   const payload = JSON.stringify(values);
//   console.log("Sending employee payload:", payload); // ← logged

//   const response = await fetch(
//     `${baseUrl}/employees/?company_id=${companyId}&user_id=${userId}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: payload,
//     },
//   );

//   // Read as text so we never fail on JSON parse (e.g. HTML error pages)
//   const text = await response.text();
//   // console.log("Server response:", text); // ← always logged

//   let data: any = {};
//   try {
//     data = JSON.parse(text);
//   } catch {
//     throw new Error(`Server returned invalid JSON (status ${response.status})`);
//   }

//   if (!response.ok || !data.success) {
//     const fieldErrors: Record<string, string> = {};
//     if (data.errors) {
//       for (const [field, messages] of Object.entries(data.errors)) {
//         fieldErrors[field] = Array.isArray(messages)
//           ? messages.join(" ")
//           : String(messages);
//       }
//     }
//     throw new ApiError(data.message || "Employee creation failed", fieldErrors);
//   }
// }

type GetEmployeesParams = {
  companyId: string;
  search?: string;
  department?: string;
};

export async function getEmployees({
  companyId,
  search,
  department,
}: GetEmployeesParams): Promise<EmployeeListItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new Error("API base URL not configured");

  const params = new URLSearchParams({ company_id: companyId });
  if (search) params.append("search", search);
  if (department) params.append("department", department);

  const response = await fetch(`${baseUrl}/employees/?${params.toString()}`, {
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch employees");
  }

  return data.employees ?? data.data ?? [];
}
