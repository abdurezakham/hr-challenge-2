import { tokens } from "@/src/shared/constants/landing";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CompaniesPageHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1
        className="font-display text-3xl font-medium"
        style={{ color: tokens.ink }}
      >
        Companies
      </h1>
      <Link
        href="/dashboard/companies/add"
        className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-body font-semibold text-white transition-colors"
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
