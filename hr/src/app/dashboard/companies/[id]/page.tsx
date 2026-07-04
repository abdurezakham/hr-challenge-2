"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Building2, Mail } from "lucide-react";
import Link from "next/link";
import { tokens } from "@/src/shared/constants/landing";
import { useCompanyStore } from "@/src/modules/hr/store/companyStore";
import EditCompanyForm from "@/src/modules/hr/components/dashboard/companies/EditCompanyForm";

export default function CompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);

  if (!selectedCompany) {
    return (
      <div className="text-center py-20">
        <p className="text-brassDeep font-mono text-sm">No company selected.</p>
        <Link
          href="/dashboard/companies"
          className="mt-4 inline-block text-sm underline"
          style={{ color: tokens.brassDeep }}
        >
          Back to companies
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back navigation */}
      <div className="mb-6">
        <Link
          href="/dashboard/companies"
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide hover:opacity-80"
          style={{ color: tokens.inkSoft }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>
      </div>

      {/* Read-only header (optional) */}
      <div className="max-w-2xl mx-auto mb-8">
        <div
          className="rounded-md p-6"
          style={{
            backgroundColor: tokens.paperCard,
            border: `1px solid ${tokens.line}`,
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center"
                style={{ backgroundColor: tokens.navy, color: tokens.brass }}
              >
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1
                  className="font-display text-2xl font-medium"
                  style={{ color: tokens.ink }}
                >
                  {selectedCompany.company_name}
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <Mail className="w-4 h-4" style={{ color: tokens.inkSoft }} />
                  <span className="text-sm" style={{ color: tokens.inkSoft }}>
                    {selectedCompany.company_email}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href={`/dashboard/companies/${selectedCompany.company_id}/employees`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-body font-semibold text-white transition-colors"
              style={{
                backgroundColor: tokens.navy,
                border: `1px solid ${tokens.brass}`,
              }}
            >
              View Employees
            </Link>
            <Link
              href={`/dashboard/companies/${selectedCompany.company_id}/employees/new`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-body font-semibold text-white transition-colors"
              style={{
                backgroundColor: tokens.navy,
                border: `1px solid ${tokens.brass}`,
              }}
            >
              Add Employee
            </Link>
          </div>
          <p
            className="text-xs font-mono uppercase"
            style={{ color: tokens.inkSoft }}
          >
            Company ID: {selectedCompany.company_id}
          </p>
        </div>
      </div>

      {/* Edit form */}
      <div className="max-w-2xl mx-auto">
        <h2
          className="font-display text-xl font-medium mb-4"
          style={{ color: tokens.ink }}
        >
          Edit Company Details
        </h2>
        <div
          className="rounded-md p-6"
          style={{
            backgroundColor: tokens.paperCard,
            border: `1px solid ${tokens.line}`,
          }}
        >
          <EditCompanyForm />
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useCompanyStore } from "@/src/modules/hr/store/companyStore";
// import { useParams } from "next/navigation";

// export default function CompanyDetailPage() {
//   const params = useParams<{ id: string }>();
//   const selectedCompany = useCompanyStore((s) => s.selectedCompany);

//   // If for some reason the store is empty (direct link), you can fallback to an API fetch.
//   // For the demo, you can assume it's always set from the list.

//   return (
//     <div
//       className="p-4 text-gray-950"
//       style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}
//     >
//       {selectedCompany ? (
//         <div>
//           <h1>{selectedCompany.company_name}</h1>
//           <p>{selectedCompany.company_email}</p>
//           {/* ... display other fields ... */}
//         </div>
//       ) : (
//         <p>No company selected. Go back to the list.</p>
//       )}
//     </div>
//   );
// }
