"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/userApi";
import { ApiError } from "@/src/shared/utils/ApiError";

export function useProfile(userId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });

  // Extract the user object from the full response
  const user = data?.user;

  return {
    user, // { user_id, name, email, profile_image } or undefined
    isLoading,
    isError,
    error: error instanceof ApiError ? error : null, // keep the ApiError if that matters
  };
}
