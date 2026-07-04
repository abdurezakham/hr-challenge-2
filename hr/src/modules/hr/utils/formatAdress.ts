import { CompanyListItem } from "../types";

export default function formatAddress(
  address: CompanyListItem["address"],
): string {
  const parts = [
    address.region,
    address.city,
    address.subcity,
    address.woreda,
    address.house_number,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "No address provided";
}
