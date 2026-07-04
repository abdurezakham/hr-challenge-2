import Link from "next/link";
import { ChevronLeft, X, CircleDot, Building2, Users } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import MiniProfile, { MiniProfileProps } from "./MiniProfile";
import NavItem from "./NavItem";

type SidebarProps = {
  sidebarOpen: boolean;
  collapsed: boolean;
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
  user: MiniProfileProps["user"];
  pathname: string;
};

export default function Sidebar({
  sidebarOpen,
  collapsed,
  onToggleMobile,
  onToggleCollapse,
  user,
  pathname,
}: SidebarProps) {
  const sidebarWidth = collapsed ? "w-20" : "w-64";
  const mobileSidebar = sidebarOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onToggleMobile}
        />
      )}

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
            onClick={onToggleCollapse}
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
            onClick={onToggleMobile}
            className="md:hidden p-1 rounded hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" style={{ color: tokens.brass }} />
          </button>
        </div>

        {/* Mini profile */}
        <MiniProfile user={user} collapsed={collapsed} />

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            href="/dashboard/companies"
            icon={<Building2 className="w-5 h-5" />}
            label="Company"
            active={pathname.startsWith("/dashboard/companies")}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/employees"
            icon={<Users className="w-5 h-5" />}
            label="Employees"
            active={pathname.startsWith("/dashboard/employees")}
            collapsed={collapsed}
          />
        </nav>
      </aside>
    </>
  );
}
