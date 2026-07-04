// src/components/dashboard/MobileHeader.tsx
import { Menu } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";

type MobileHeaderProps = {
  onToggle: () => void;
};

export default function MobileHeader({ onToggle }: MobileHeaderProps) {
  return (
    <header
      className="md:hidden flex items-center justify-between p-4 border-b shrink-0"
      style={{
        backgroundColor: tokens.paperCard,
        borderColor: tokens.line,
      }}
    >
      <button onClick={onToggle} aria-label="Open sidebar">
        <Menu className="w-6 h-6" style={{ color: tokens.ink }} />
      </button>
      <div className="w-6" /> {/* spacer for symmetry */}
    </header>
  );
}
