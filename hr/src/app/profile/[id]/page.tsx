"use client";

import { useParams } from "next/navigation";
import { useProfile } from "@/src/modules/hr/hooks/useProfile";
import { CircleDot, Loader2, User as UserIcon, Mail, Hash } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import Image from "next/image";
import Link from "next/link";
import { formTokens } from "@/src/shared/constants/formTokens";
import ProfileSkeleton from "@/src/modules/hr/components/ProfileSkeleton";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const { user, isLoading, isError, error } = useProfile(params.id);

  return (
    <div
      style={{ backgroundColor: tokens.paper, color: tokens.ink }}
      className="min-h-screen font-body"
    >
      <style>{`
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Brandmark */}
        <div className="mb-10 flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: tokens.navy }}
          >
            <CircleDot className="w-4 h-4" style={{ color: tokens.brass }} />
          </div>
          <span
            className="font-display text-lg font-medium tracking-tight"
            style={{ color: tokens.ink }}
          >
            Registry
          </span>
        </div>

        {/* Profile card */}
        <div
          className="w-full max-w-md relative rounded-md p-8"
          style={{
            backgroundColor: tokens.paperCard,
            border: `1px solid ${tokens.line}`,
          }}
        >
          {/* Decorative dot */}
          <div
            className="absolute top-4 left-4 w-3 h-3 rounded-full"
            style={{
              backgroundColor: tokens.navyDeep,
              border: `1px solid ${tokens.brass}`,
            }}
          />

          <h1
            className="font-display text-2xl font-medium tracking-tight mb-6"
            style={{ color: tokens.ink }}
          >
            Your Profile
          </h1>

          {/* Loading state */}
          {isLoading && <ProfileSkeleton />}

          {/* Error state */}
          {isError && (
            <div className="flex flex-col items-center gap-4 py-10">
              <p
                className="text-xs font-mono uppercase tracking-wide"
                style={{ color: tokens.brassDeep }}
              >
                Failed to load profile
              </p>
              <p className="text-sm" style={{ color: tokens.inkSoft }}>
                {error?.message || "An unexpected error occurred."}
              </p>
            </div>
          )}

          {/* Profile data */}
          {user && (
            <div className="flex flex-col items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: tokens.navy,
                    border: `2px solid ${tokens.brass}`,
                  }}
                >
                  {user.profile_image ? (
                    <Image
                      src={user.profile_image}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <UserIcon
                      className="w-10 h-10"
                      style={{ color: tokens.brass }}
                    />
                  )}
                </div>
              </div>

              {/* Info rows */}
              <div className="w-full space-y-4 mt-2">
                {/* Name */}
                <div className="flex items-start gap-3">
                  <UserIcon
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: tokens.brass }}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-xs font-mono uppercase tracking-wide mb-0.5"
                      style={{ color: tokens.inkSoft }}
                    >
                      Name
                    </p>
                    <p
                      className="font-body font-medium text-base truncate"
                      style={{ color: tokens.ink }}
                    >
                      {user.name}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: tokens.brass }}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-xs font-mono uppercase tracking-wide mb-0.5"
                      style={{ color: tokens.inkSoft }}
                    >
                      Email
                    </p>
                    <p
                      className="font-body text-sm truncate"
                      style={{ color: tokens.inkSoft }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* User ID */}
                <div className="flex items-start gap-3">
                  <Hash
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: tokens.brass }}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-xs font-mono uppercase tracking-wide mb-0.5"
                      style={{ color: tokens.inkSoft }}
                    >
                      User ID
                    </p>
                    <p
                      className="font-mono text-xs truncate"
                      style={{ color: tokens.inkSoft }}
                    >
                      {user.user_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/"
          className="mt-8 text-sm font-mono uppercase tracking-wide link-underline"
          style={{ color: formTokens.inputLabel }}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
