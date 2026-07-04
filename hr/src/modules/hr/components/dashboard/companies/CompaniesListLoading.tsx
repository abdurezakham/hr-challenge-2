import { tokens } from "@/src/shared/constants/landing";

export default function CompanyListCardSkeleton() {
  return (
    <div
      className="rounded-md p-4"
      style={{
        backgroundColor: tokens.paper,
        border: `1px solid ${tokens.line}`,
      }}
    >
      <div className="flex flex-col gap-3 animate-pulse">
        {/* Top row: icon + name/email + license button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Icon placeholder */}
            <div
              className="w-9 h-9 rounded-md shrink-0"
              style={{ backgroundColor: tokens.line }}
            />

            <div className="min-w-0 flex-1 space-y-1.5">
              {/* Company name */}
              <div
                className="h-4 rounded w-3/4"
                style={{ backgroundColor: tokens.line }}
              />
              {/* Email */}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: tokens.line }}
                />
                <div
                  className="h-3 rounded w-full"
                  style={{ backgroundColor: tokens.line }}
                />
              </div>
            </div>
          </div>

          {/* License button placeholder */}
          <div
            className="h-6 w-16 rounded shrink-0"
            style={{ backgroundColor: tokens.line }}
          />
        </div>

        {/* Bottom details: TIN, Phone, Address */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {/* TIN */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: tokens.line }}
            />
            <div
              className="h-3 rounded w-20"
              style={{ backgroundColor: tokens.line }}
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: tokens.line }}
            />
            <div
              className="h-3 rounded w-24"
              style={{ backgroundColor: tokens.line }}
            />
          </div>

          {/* Address */}
          <div className="flex items-start gap-1.5 w-full sm:w-auto sm:flex-1 min-w-0">
            <div
              className="w-3.5 h-3.5 mt-0.5 rounded-full shrink-0"
              style={{ backgroundColor: tokens.line }}
            />
            <div
              className="h-3 rounded w-full"
              style={{ backgroundColor: tokens.line }}
            />
          </div>
        </div>

        {/* View details indicator placeholder */}
        <div className="flex justify-end">
          <div
            className="h-3 rounded w-20"
            style={{ backgroundColor: tokens.line }}
          />
        </div>
      </div>
    </div>
  );
}
