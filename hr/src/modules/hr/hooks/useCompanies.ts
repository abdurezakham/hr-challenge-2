"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../api/companiesApi";

export function useCompanies(userId: string | undefined) {
  return useQuery({
    queryKey: ["companies", userId],
    queryFn: async () => await getCompanies(userId!),
    enabled: !!userId,
  });
}
