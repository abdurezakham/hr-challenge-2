"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employeeApi";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      // Invalidate employees list after successful creation
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}
