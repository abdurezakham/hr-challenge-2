import { ApiError } from "@/src/shared/utils/ApiError";
import { CompanyListItem } from "../types";
import { objectToFormData } from "@/src/shared/utils/objectToformData";

type CompaniesResponse = {
  success: boolean;
  message: string;
  companies: CompanyListItem[];
};

export async function getCompanies(userId: string): Promise<CompaniesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configured");

  const response = await fetch(`${baseUrl}/company/all/${userId}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new ApiError(data.message || "Failed to fetch companies");
  }
  console.log("companies list", data);

  return data;
}

export async function updateCompany(
  companyId: string,
  user_id: string,
  payload: Partial<CompanyListItem>,
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) throw new ApiError("API base URL not configured");

  const formData = objectToFormData(payload);
  //  /company/update/{user_id}/{company_uuid}/
  const response = await fetch(
    `${baseUrl}/company/update/${user_id}/${companyId}/`,
    {
      method: "PATCH",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    },
  );

  const data = await response.json();
  console.log("responsessss", data);

  if (!response.ok || !data.success) {
    const fieldErrors: Record<string, string> = {};
    if (data.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(messages)
          ? messages.join(" ")
          : String(messages);
      }
    }
    throw new ApiError(data.message || "Update failed", fieldErrors);
  }
}
