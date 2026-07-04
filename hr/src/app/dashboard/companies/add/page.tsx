"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import CreateCompany from "@/src/modules/hr/components/CreateCompany";

export default function NewCompanyPage() {
  return (
    <div>
      {/* Back navigation */}
      <div className="mb-6">
        <Link
          href="/dashboard/companies"
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide transition-colors hover:opacity-80"
          style={{ color: tokens.inkSoft }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>
      </div>

      {/* Form card */}
      <div className="w-full max-w-2xl mx-auto">
        <div
          className="rounded-md p-6"
          style={{
            backgroundColor: tokens.paperCard,
            border: `1px solid ${tokens.line}`,
          }}
        >
          <h2
            className="font-display text-2xl font-medium mb-6"
            style={{ color: tokens.ink }}
          >
            Register a new company
          </h2>
          <CreateCompany />
        </div>
      </div>
    </div>
  );
}
