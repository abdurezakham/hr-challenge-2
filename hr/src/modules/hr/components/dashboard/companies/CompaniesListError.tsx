import { tokens } from "@/src/shared/constants/landing";
type Props = {
  error: string;
};
export default function CompaniesListError({ error }: Props) {
  return (
    <div className="text-center py-10">
      <p
        className="text-xs font-mono uppercase tracking-wide"
        style={{ color: tokens.brassDeep }}
      >
        Failed to load companies
      </p>
      <p className="text-sm mt-2" style={{ color: tokens.inkSoft }}>
        {error}
      </p>
    </div>
  );
}
