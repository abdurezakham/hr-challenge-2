"use client";
import { user } from "@/src/modules/hr/types";
import { tokens } from "@/src/shared/constants/landing";
import { useCurrentUser } from "@/src/shared/hooks/useCurrentUser";
import {
  Building2,
  ChevronLeft,
  CircleDot,
  Menu,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  const user = useCurrentUser();

  const toggleMobile = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const sidebarWidth = collapsed ? "w-20" : "w-64";
  const mobileSidebar = sidebarOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ backgroundColor: tokens.paper }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-full shrink-0 flex flex-col transition-all duration-300 ease-in-out
          ${mobileSidebar} md:translate-x-0 ${sidebarWidth}
          border-r overflow-y-auto`}
        style={{
          backgroundColor: tokens.navy,
          borderColor: tokens.brassDeep,
          color: tokens.paper,
        }}
      >
        {/* Brand & collapse */}
        <div className="flex items-center justify-between p-4 border-b border-[#243349]">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center bg-[#B9863E]">
              <CircleDot className="w-4 h-4 text-navy" />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-medium tracking-tight text-paper">
                Registry
              </span>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden md:block p-1 rounded hover:bg-white/10"
            aria-label="Toggle sidebar width"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-200 ${
                collapsed ? "rotate-180" : ""
              }`}
              style={{ color: tokens.brass }}
            />
          </button>
          <button
            onClick={toggleMobile}
            className="md:hidden p-1 rounded hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" style={{ color: tokens.brass }} />
          </button>
        </div>

        {/* Mini profile */}
        <div className="p-4 border-b border-[#243349]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#B9863E]/20 border border-brass">
              {user?.profile_image ? (
                <Image
                  src={user.profile_image}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <CircleDot className="w-6 h-6 text-brass" />
              )}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                {user ? (
                  <>
                    <p className="font-body font-medium text-sm truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#8B95A3] truncate">
                      {user.email}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-[#8B95A3]">User</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink
            href="/dashboard/companies"
            icon={<Building2 className="w-5 h-5" />}
            label="Company"
            active={pathname.startsWith("/dashboard/companies")}
            collapsed={collapsed}
          />
          <SidebarLink
            href="/dashboard/employees"
            icon={<Users className="w-5 h-5" />}
            label="Employees"
            active={pathname.startsWith("/dashboard/employees")}
            collapsed={collapsed}
          />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        <header
          className="md:hidden flex items-center justify-between p-4 border-b shrink-0"
          style={{
            backgroundColor: tokens.paperCard,
            borderColor: tokens.line,
          }}
        >
          <button onClick={toggleMobile} aria-label="Open sidebar">
            <Menu className="w-6 h-6" style={{ color: tokens.ink }} />
          </button>
          <span
            className="font-display text-lg font-medium"
            style={{ color: tokens.ink }}
          >
            Registry
          </span>
          <div className="w-6" />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
        active
          ? "bg-[#B9863E]/20 text-brass font-medium"
          : "text-paper/80 hover:bg-white/10 hover:text-paper"
      }`}
      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="font-body text-sm">{label}</span>}
    </Link>
  );
}
