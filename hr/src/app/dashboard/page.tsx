"use client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  router.push("/dashboard/companies");
}
