import { tokens } from "@/src/shared/constants/landing";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 animate-pulse">
      {/* Avatar skeleton */}
      <div
        className="w-24 h-24 rounded-full"
        style={{ backgroundColor: tokens.line }}
      />

      {/* Info rows */}
      <div className="w-full space-y-4 mt-2">
        {/* Name row */}
        <div className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded mt-0.5"
            style={{ backgroundColor: tokens.line }}
          />
          <div className="flex-1 space-y-2">
            <div
              className="h-3 w-10 rounded"
              style={{ backgroundColor: tokens.line }}
            />
            <div
              className="h-4 w-3/4 rounded"
              style={{ backgroundColor: tokens.line }}
            />
          </div>
        </div>

        {/* Email row */}
        <div className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded mt-0.5"
            style={{ backgroundColor: tokens.line }}
          />
          <div className="flex-1 space-y-2">
            <div
              className="h-3 w-12 rounded"
              style={{ backgroundColor: tokens.line }}
            />
            <div
              className="h-4 w-full rounded"
              style={{ backgroundColor: tokens.line }}
            />
          </div>
        </div>

        {/* User ID row (optional) */}
        <div className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded mt-0.5"
            style={{ backgroundColor: tokens.line }}
          />
          <div className="flex-1 space-y-2">
            <div
              className="h-3 w-16 rounded"
              style={{ backgroundColor: tokens.line }}
            />
            <div
              className="h-4 w-2/3 rounded"
              style={{ backgroundColor: tokens.line }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
