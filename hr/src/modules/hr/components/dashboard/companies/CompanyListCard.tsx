import {
  Building2,
  Mail,
  Hash,
  Phone,
  MapPin,
  Download,
  ChevronRight,
} from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import { CompanyListItem } from "@/src/modules/hr/types";
import Link from "next/link";
import formatAddress from "../../../utils/formatAdress";

function getLicenseUrl(relativePath: string): string {
  const base = process.env.NEXT_PUBLIC_BASEURL ?? "";
  const cleanPath = relativePath.replace(/^\//, "");
  return base.endsWith("/") ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

type Props = {
  company: CompanyListItem;
};

export default function CompanyListCard({ company }: Props) {
  const licenseUrl = company.license_file
    ? getLicenseUrl(company.license_file)
    : null;

  const handleLicenseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (licenseUrl) {
      window.open(licenseUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Link
      href={`/dashboard/companies/${company.company_id}`}
      className="block rounded-md p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
      style={{
        backgroundColor: tokens.paper,
        border: `1px solid ${tokens.line}`,
      }}
    >
      {/* Top row: name, email, license */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: tokens.navy, color: tokens.brass }}
          >
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3
              className="font-body font-semibold text-sm truncate"
              style={{ color: tokens.ink }}
            >
              {company.company_name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Mail
                className="w-3 h-3 shrink-0"
                style={{ color: tokens.inkSoft }}
              />
              <span
                className="text-xs truncate"
                style={{ color: tokens.inkSoft }}
              >
                {company.company_email}
              </span>
            </div>
          </div>
        </div>

        {licenseUrl && (
          <button
            type="button"
            onClick={handleLicenseClick}
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer hover:scale-105"
            style={{
              backgroundColor: tokens.navy,
              color: tokens.paper,
              border: `1px solid ${tokens.brass}`,
            }}
            title="Download license"
          >
            <Download className="w-3 h-3" />
            License
          </button>
        )}
      </div>

      {/* Bottom details: TIN, Phone, Address */}
      <div
        className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
        style={{ color: tokens.inkSoft }}
      >
        {/* TIN */}
        <div className="flex items-center gap-1.5">
          <Hash
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: tokens.inkSoft }}
          />
          <span>{company.tin_number || "—"}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-1.5">
          <Phone
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: tokens.inkSoft }}
          />
          <span>{company.phone_number || "—"}</span>
        </div>

        {/* Address – takes remaining space or full width on small screens */}
        <div className="flex items-start gap-1.5 w-full sm:w-auto sm:flex-1 min-w-0">
          <MapPin
            className="w-3.5 h-3.5 mt-0.5 shrink-0"
            style={{ color: tokens.inkSoft }}
          />
          <span className="truncate">{formatAddress(company.address)}</span>
        </div>
      </div>

      {/* View details indicator – only on hover */}
      <div className="flex justify-end mt-2">
        <span
          className="text-xs font-mono uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: tokens.brassDeep }}
        >
          View details
          <ChevronRight className="w-3 h-3 inline ml-0.5" />
        </span>
      </div>
    </Link>
  );
}

// import {
//   Building2,
//   Mail,
//   Hash,
//   Phone,
//   MapPin,
//   Download,
//   ChevronRight,
// } from "lucide-react";
// import { tokens } from "@/src/shared/constants/landing";
// import { CompanyListItem } from "@/src/modules/hr/types";
// import Link from "next/link";
// import formatAddress from "../../../utils/formatAdress";

// function getLicenseUrl(relativePath: string): string {
//   const base = process.env.NEXT_PUBLIC_BASEURL ?? "";
//   // Remove leading slash from relative path if base already ends with '/'
//   const cleanPath = relativePath.replace(/^\//, "");
//   return base.endsWith("/") ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
// }

// type Props = {
//   company: CompanyListItem;
// };

// export default function CompanyListCard({ company }: Props) {
//   const licenseUrl = company.license_file
//     ? getLicenseUrl(company.license_file)
//     : null;

//   const handleLicenseClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     e.preventDefault();
//     if (licenseUrl) {
//       window.open(licenseUrl, "_blank", "noopener,noreferrer");
//     }
//   };

//   return (
//     <Link
//       href={`/dashboard/companies/${company.company_id}`}
//       className="block rounded-md p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
//       style={{
//         backgroundColor: tokens.paper,
//         border: `1px solid ${tokens.line}`,
//       }}
//     >
//       <div className="flex flex-col gap-4">
//         {/* Top row: company name, email, and license button */}
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-center gap-3 min-w-0">
//             <div
//               className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
//               style={{ backgroundColor: tokens.navy, color: tokens.brass }}
//             >
//               <Building2 className="w-5 h-5" />
//             </div>
//             <div className="min-w-0">
//               <h3
//                 className="font-body font-semibold text-base truncate"
//                 style={{ color: tokens.ink }}
//               >
//                 {company.company_name}
//               </h3>
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Mail
//                   className="w-3.5 h-3.5 shrink-0"
//                   style={{ color: tokens.inkSoft }}
//                 />
//                 <span
//                   className="text-sm truncate"
//                   style={{ color: tokens.inkSoft }}
//                 >
//                   {company.company_email}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* License download button – avoids nested <a> */}
//           {licenseUrl && (
//             <button
//               type="button"
//               onClick={handleLicenseClick}
//               className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer hover:scale-105"
//               style={{
//                 backgroundColor: tokens.navy,
//                 color: tokens.paper,
//                 border: `1px solid ${tokens.brass}`,
//               }}
//               title="Download license"
//             >
//               <Download className="w-3.5 h-3.5" />
//               License
//             </button>
//           )}
//         </div>

//         {/* Bottom grid: TIN, Phone, Address */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1">
//           <div className="flex items-center gap-2">
//             <Hash
//               className="w-4 h-4 shrink-0"
//               style={{ color: tokens.inkSoft }}
//             />
//             <span className="text-sm" style={{ color: tokens.inkSoft }}>
//               {company.tin_number || "—"}
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <Phone
//               className="w-4 h-4 shrink-0"
//               style={{ color: tokens.inkSoft }}
//             />
//             <span className="text-sm" style={{ color: tokens.inkSoft }}>
//               {company.phone_number || "—"}
//             </span>
//           </div>

//           {/* Address – full width */}
//           <div className="flex items-start gap-2 sm:col-span-2">
//             <MapPin
//               className="w-4 h-4 shrink-0 mt-0.5"
//               style={{ color: tokens.inkSoft }}
//             />
//             <span className="text-sm" style={{ color: tokens.inkSoft }}>
//               {formatAddress(company.address)}
//             </span>
//           </div>
//         </div>

//         {/* Hover “View details” indicator */}
//         <div className="flex justify-end">
//           <span
//             className="text-xs font-mono uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity"
//             style={{ color: tokens.brassDeep }}
//           >
//             View details
//             <ChevronRight className="w-3.5 h-3.5 inline ml-1" />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }
