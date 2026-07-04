// app/dashboard/layout.tsx
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { tokens } from "@/src/shared/constants/landing";
import { useCurrentUser } from "@/src/shared/hooks/useCurrentUser";
import MobileHeader from "@/src/modules/hr/components/dashboard/MobileHeader";
import Sidebar from "@/src/modules/hr/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ backgroundColor: tokens.paper }}
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        collapsed={collapsed}
        onToggleMobile={() => setSidebarOpen(!sidebarOpen)}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        user={user}
        pathname={pathname}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        <MobileHeader onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
