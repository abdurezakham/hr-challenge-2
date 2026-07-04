"use client";
import CompaniesList from "@/src/modules/hr/components/dashboard/companies/CompaniesList";
import CompaniesListEmptyState from "@/src/modules/hr/components/dashboard/companies/CompaniesListEmptyState";
import CompaniesListError from "@/src/modules/hr/components/dashboard/companies/CompaniesListError";
import CompanyListCardSkeleton from "@/src/modules/hr/components/dashboard/companies/CompaniesListLoading";
import CompaniesListLoading from "@/src/modules/hr/components/dashboard/companies/CompaniesListLoading";
import CompaniesPageHeader from "@/src/modules/hr/components/dashboard/companies/CompaniesPageHeader";
import { useCompanies } from "@/src/modules/hr/hooks/useCompanies";
import { tokens } from "@/src/shared/constants/landing";
import { useCurrentUser } from "@/src/shared/hooks/useCurrentUser";

export default function CompanyPage() {
  const user = useCurrentUser();
  const {
    data,
    isLoading: queryLoading,
    isError,
    error,
  } = useCompanies(user?.user_id);

  // true until the user is loaded AND the query has finished
  const isLoading = user === null || queryLoading;
  const companies = data?.companies ?? [];

  return (
    <div>
      <CompaniesPageHeader />

      {/* Content area */}
      <div
        className="rounded-md p-6"
        style={{
          backgroundColor: tokens.paperCard,
          border: `1px solid ${tokens.line}`,
        }}
      >
        {/* Loading state */}
        {/* {isLoading && <CompaniesListLoading />}
        <div className="flex flex-col gap-4">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <CompanyListCardSkeleton key={i} />
            ))}
        </div> */}
        {isLoading && (
          <div className="flex flex-col gap-4">
            <CompaniesListLoading />
            <CompaniesListLoading />
            <CompaniesListLoading />
            <CompaniesListLoading />
          </div>
        )}

        {/* Error state */}
        {!isLoading && isError && (
          <CompaniesListError
            error={
              error instanceof Error
                ? error.message
                : "An unexpected error occurred."
            }
          />
        )}

        {/* Empty state – only when user is loaded, query succeeded, and list is empty */}
        {!isLoading && !isError && companies.length === 0 && (
          <CompaniesListEmptyState />
        )}

        {/* Company list */}
        {!isLoading && !isError && companies.length > 0 && (
          <div className="space-y-4">
            <CompaniesList companies={companies} />
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";
// import { useCompanies } from "@/src/modules/hr/hooks/useCompanies";
// import { CompanyListItem } from "@/src/modules/hr/types";
// import { tokens } from "@/src/shared/constants/landing";
// import { useCurrentUser } from "@/src/shared/hooks/useCurrentUser";
// import {
//   Building2,
//   Hash,
//   Loader2,
//   Mail,
//   MapPin,
//   Phone,
//   Plus,
// } from "lucide-react";
// import Link from "next/link";

// function formatAddress(company: CompanyListItem): string {
//   return [
//     company.region,
//     company.city,
//     company.subcity,
//     company.woreda,
//     company.house_number,
//   ]
//     .filter(Boolean)
//     .join(", ");
// }

// export default function CompanyPage() {
//   const user = useCurrentUser();
//   const { data, isLoading, isError, error } = useCompanies(user?.user_id);

//   const companies = data?.companies ?? [];

//   return (
//     <div>
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-6">
//         <h1
//           className="font-display text-3xl font-medium"
//           style={{ color: tokens.ink }}
//         >
//           Companies
//         </h1>
//         <Link
//           href="/dashboard/companies/new"
//           className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-body font-semibold text-white transition-colors"
//           style={{
//             backgroundColor: tokens.navy,
//             border: `1px solid ${tokens.brass}`,
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = tokens.brassDeep)
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = tokens.navy)
//           }
//         >
//           <Plus className="w-4 h-4" />
//           Add Company
//         </Link>
//       </div>

//       {/* Content area */}
//       <div
//         className="rounded-md p-6"
//         style={{
//           backgroundColor: tokens.paperCard,
//           border: `1px solid ${tokens.line}`,
//         }}
//       >
//         {/* Loading state */}
//         {(user === null || isLoading) && (
//           <div className="flex flex-col items-center gap-4 py-10">
//             <Loader2
//               className="h-10 w-10 animate-spin"
//               style={{ color: tokens.brass }}
//             />
//             <p className="text-sm font-mono" style={{ color: tokens.inkSoft }}>
//               Loading companies...
//             </p>
//           </div>
//         )}

//         {/* Error state */}
//         {isError && (
//           <div className="text-center py-10">
//             <p
//               className="text-xs font-mono uppercase tracking-wide"
//               style={{ color: tokens.brassDeep }}
//             >
//               Failed to load companies
//             </p>
//             <p className="text-sm mt-2" style={{ color: tokens.inkSoft }}>
//               {error instanceof Error
//                 ? error.message
//                 : "An unexpected error occurred."}
//             </p>
//           </div>
//         )}

//         {/* Empty state */}
//         {!isLoading && !isError && companies.length === 0 && (
//           <div className="text-center py-10">
//             <Building2
//               className="w-12 h-12 mx-auto mb-4"
//               style={{ color: tokens.inkSoft }}
//             />
//             <p
//               className="text-lg font-display font-medium"
//               style={{ color: tokens.ink }}
//             >
//               No companies yet
//             </p>
//             <p className="text-sm mt-1" style={{ color: tokens.inkSoft }}>
//               Add your first company to get started.
//             </p>
//             <Link
//               href="/dashboard/companies/new"
//               className="inline-flex items-center gap-2 mt-6 rounded-md px-5 py-2.5 font-body font-semibold text-white transition-colors"
//               style={{
//                 backgroundColor: tokens.navy,
//                 border: `1px solid ${tokens.brass}`,
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = tokens.brassDeep)
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = tokens.navy)
//               }
//             >
//               <Plus className="w-4 h-4" />
//               Add Company
//             </Link>
//           </div>
//         )}

//         {/* Company list */}
//         {!isLoading && !isError && companies.length > 0 && (
//           <div className="space-y-4">
//             {companies.map((company) => (
//               <Link
//                 key={company.company_id}
//                 href={`/dashboard/companies/${company.company_id}`} // carries company_id forward
//                 className="block rounded-md p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
//                 style={{
//                   backgroundColor: tokens.paper,
//                   border: `1px solid ${tokens.line}`,
//                 }}
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="space-y-2">
//                     {/* Company name */}
//                     <div className="flex items-center gap-2">
//                       <Building2
//                         className="w-5 h-5 shrink-0"
//                         style={{ color: tokens.brass }}
//                       />
//                       <h3
//                         className="font-body font-semibold text-base"
//                         style={{ color: tokens.ink }}
//                       >
//                         {company.company_name}
//                       </h3>
//                     </div>

//                     {/* Email */}
//                     <div className="flex items-center gap-2">
//                       <Mail
//                         className="w-4 h-4 shrink-0"
//                         style={{ color: tokens.inkSoft }}
//                       />
//                       <span
//                         className="text-sm"
//                         style={{ color: tokens.inkSoft }}
//                       >
//                         {company.company_email}
//                       </span>
//                     </div>

//                     {/* TIN & Phone */}
//                     <div className="flex flex-wrap gap-4">
//                       <div className="flex items-center gap-2">
//                         <Hash
//                           className="w-4 h-4 shrink-0"
//                           style={{ color: tokens.inkSoft }}
//                         />
//                         <span
//                           className="text-sm"
//                           style={{ color: tokens.inkSoft }}
//                         >
//                           {company.tin_number}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone
//                           className="w-4 h-4 shrink-0"
//                           style={{ color: tokens.inkSoft }}
//                         />
//                         <span
//                           className="text-sm"
//                           style={{ color: tokens.inkSoft }}
//                         >
//                           {company.phone_number}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Full address */}
//                     <div className="flex items-start gap-2">
//                       <MapPin
//                         className="w-4 h-4 shrink-0 mt-0.5"
//                         style={{ color: tokens.inkSoft }}
//                       />
//                       <span
//                         className="text-sm"
//                         style={{ color: tokens.inkSoft }}
//                       >
//                         {formatAddress(company)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Optional arrow indicator for navigation */}
//                   <div className="hidden md:block">
//                     <span
//                       className="text-xs font-mono uppercase tracking-wide"
//                       style={{ color: tokens.brassDeep }}
//                     >
//                       View →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
