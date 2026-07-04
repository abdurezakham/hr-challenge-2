import { ApiError } from "@/src/shared/utils/ApiError";
import { CompanyListItem } from "../types";

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
