import { tokens } from "@/src/shared/constants/landing";
import { Loader2 } from "lucide-react";

export default function CompaniesListLoading() {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <Loader2
        className="h-10 w-10 animate-spin"
        style={{ color: tokens.brass }}
      />
      <p className="text-sm font-mono" style={{ color: tokens.inkSoft }}>
        Loading companies...
      </p>
    </div>
  );
}
