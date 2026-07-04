import { tokens } from "@/src/shared/constants/landing";
import { Building2, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CompaniesListEmptyState() {
  return (
    <div className="text-center py-10">
      <Building2
        className="w-12 h-12 mx-auto mb-4"
        style={{ color: tokens.inkSoft }}
      />
      <p
        className="text-lg font-display font-medium"
        style={{ color: tokens.ink }}
      >
        No companies yet
      </p>
      <p className="text-sm mt-1" style={{ color: tokens.inkSoft }}>
        Add your first company to get started.
      </p>
      <Link
        href="/dashboard/companies/new"
        className="inline-flex items-center gap-2 mt-6 rounded-md px-5 py-2.5 font-body font-semibold text-white transition-colors"
        style={{
          backgroundColor: tokens.navy,
          border: `1px solid ${tokens.brass}`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = tokens.brassDeep)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = tokens.navy)
        }
      >
        <Plus className="w-4 h-4" />
        Add Company
      </Link>
    </div>
  );
}
