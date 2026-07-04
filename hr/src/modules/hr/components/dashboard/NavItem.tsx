// src/components/dashboard/NavItem.tsx
import Link from "next/link";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
};

export default function NavItem({
  href,
  icon,
  label,
  active,
  collapsed,
}: NavItemProps) {
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
