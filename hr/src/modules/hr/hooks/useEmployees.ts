"use client";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employeeApi";

export function useEmployees(
  companyId: string,
  search: string,
  department: string,
) {
  return useQuery({
    queryKey: ["employees", companyId, { search, department }],
    queryFn: () => getEmployees({ companyId, search, department }),
    enabled: !!companyId,
    staleTime: 10 * 60 * 1000,
  });
}
