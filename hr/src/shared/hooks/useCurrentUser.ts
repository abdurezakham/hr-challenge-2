// src/shared/hooks/useCurrentUser.ts
"use client";

import { useEffect, useState } from "react";

export type DashboardUser = {
  user_id: string;
  name: string;
  email: string;
  profile_image: string | null;
};

export function useCurrentUser(): DashboardUser | null {
  const [user, setUser] = useState<DashboardUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return user;
}
