// src/components/dashboard/MiniProfile.tsx
import Image from "next/image";
import { User } from "lucide-react";

export type MiniProfileProps = {
  user: {
    name: string;
    email: string;
    profile_image: string | null;
  } | null;
  collapsed: boolean;
};

export default function MiniProfile({ user, collapsed }: MiniProfileProps) {
  return (
    <div className="p-4 border-b border-[#243349]">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#B9863E]/20 border border-brass">
          {user?.profile_image ? (
            <Image
              src={user.profile_image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-brass" />
          )}
        </div>

        {/* Name/email or placeholder */}
        {!collapsed && (
          <div className="overflow-hidden">
            {user ? (
              <>
                <p className="font-body font-medium text-sm truncate">
                  {user.name}
                </p>
                <p className="text-xs text-[#8B95A3] truncate">{user.email}</p>
              </>
            ) : (
              <p className="text-sm text-[#8B95A3]">User</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
