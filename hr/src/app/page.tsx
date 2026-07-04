"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Building2,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  CircleDot,
} from "lucide-react";
import { tokens, departments } from "../shared/constants/landing";
import { redirect } from "next/navigation";

function OrgGraphic() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 150);
    return () => clearTimeout(t);
  }, []);

  const hub = { x: 210, y: 120 };

  return (
    <svg
      viewBox="0 0 420 260"
      className="w-full h-auto"
      role="img"
      aria-label="Organization network diagram"
    >
      <style>{`
        .og-line {
          stroke: ${tokens.brass};
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 220;
          stroke-dashoffset: ${drawn ? 0 : 220};
          transition: stroke-dashoffset 1.1s ease;
        }
        .og-node {
          opacity: ${drawn ? 1 : 0};
          transform: ${drawn ? "scale(1)" : "scale(0.6)"};
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .og-node-0 { transition-delay: 0.3s; }
        .og-node-1 { transition-delay: 0.45s; }
        .og-node-2 { transition-delay: 0.6s; }
        .og-node-3 { transition-delay: 0.75s; }
        .og-dot {
          opacity: ${drawn ? 1 : 0};
          transition: opacity 0.4s ease;
        }
      `}</style>

      {departments.map((d, i) => (
        <path
          key={d.key}
          className="og-line"
          d={`M ${hub.x} ${hub.y} Q ${(hub.x + d.x) / 2} ${(hub.y + d.y) / 2 - 10} ${d.x} ${d.y}`}
        />
      ))}

      {/* hub */}
      <circle
        cx={hub.x}
        cy={hub.y}
        r="22"
        fill={tokens.navy}
        stroke={tokens.brass}
        strokeWidth="2"
      />
      <text
        x={hub.x}
        y={hub.y + 4}
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        fill={tokens.paper}
        letterSpacing="0.5"
      >
        HQ
      </text>

      {departments.map((d, i) => (
        <g key={d.key} className={`og-node og-node-${i}`}>
          <rect
            x={d.x - 44}
            y={d.y - 20}
            width="88"
            height="40"
            rx="4"
            fill={tokens.paperCard}
            stroke={tokens.line}
          />
          <circle cx={d.x - 32} cy={d.y - 8} r="2.5" fill={tokens.sage} />
          <text
            x={d.x - 24}
            y={d.y - 4}
            fontFamily="Inter, sans-serif"
            fontSize="10.5"
            fontWeight="600"
            fill={tokens.ink}
          >
            {d.label}
          </text>
          <text
            x={d.x - 24}
            y={d.y + 10}
            fontFamily="IBM Plex Mono, monospace"
            fontSize="9"
            fill={tokens.inkSoft}
          >
            {d.count} people
          </text>
        </g>
      ))}
    </svg>
  );
}

function IdCard() {
  return (
    <div
      className="relative rounded-md p-8 w-full"
      style={{
        backgroundColor: tokens.navy,
        border: `1px solid ${tokens.brassDeep}`,
      }}
    >
      <div
        className="absolute top-4 left-4 w-3 h-3 rounded-full"
        style={{
          backgroundColor: tokens.navyDeep,
          border: `1px solid ${tokens.brass}`,
        }}
      />
      <div className="flex items-start justify-between mb-8 pl-2">
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            color: tokens.brass,
          }}
        >
          Personnel Record
        </span>
        <span
          className="text-xs"
          style={{ fontFamily: "IBM Plex Mono, monospace", color: "#8B95A3" }}
        >
          #A-0248
        </span>
      </div>
      <div className="pl-2 space-y-4">
        {[
          ["Name", "M. Okafor"],
          ["Department", "Engineering"],
          ["Role", "Staff Engineer"],
          ["Status", "Active"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between border-b pb-2"
            style={{ borderColor: "#243349" }}
          >
            <span
              className="text-xs uppercase tracking-wide"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                color: "#7C889A",
              }}
            >
              {label}
            </span>
            <span
              className="text-sm"
              style={{ fontFamily: "Inter, sans-serif", color: tokens.paper }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Employee Registry",
      desc: "Add, search, and update employee records with a clean, structured directory.",
    },
    {
      icon: Building2,
      title: "Department Mapping",
      desc: "Organize people into departments and teams that mirror how you actually work.",
    },
    {
      icon: BarChart3,
      title: "Reports & Insights",
      desc: "See headcount, tenure, and org trends at a glance, without spreadsheets.",
    },
  ];

  return (
    <div
      style={{ backgroundColor: tokens.paper, color: tokens.ink }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(16,27,42,0.18); }
        .cta-primary { transition: background-color 0.2s ease, transform 0.2s ease; }
        .cta-primary:hover { background-color: ${tokens.brassDeep}; transform: translateY(-1px); }
        .cta-outline { transition: background-color 0.2s ease, color 0.2s ease; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px;
          background-color: ${tokens.brass}; transition: width 0.2s ease;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      {/* Nav */}
      <header
        className="sticky top-0 z-30 backdrop-blur border-b"
        style={{
          backgroundColor: "rgba(238,240,233,0.9)",
          borderColor: tokens.line,
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: tokens.navy }}
            >
              <CircleDot className="w-4 h-4" style={{ color: tokens.brass }} />
            </div>
            <span className="font-display text-lg font-medium tracking-tight">
              Registry
            </span>
          </div>
          <nav
            className="hidden md:flex items-center gap-8 font-body text-sm"
            style={{ color: tokens.inkSoft }}
          >
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </nav>
          <div className="hidden md:block">
            <button
              className="rounded px-5 py-2 text-sm font-medium font-body text-white cta-primary"
              style={{ backgroundColor: tokens.navy }}
              onClick={() => redirect("/auth/login")}
            >
              Sign in
            </button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-4 flex flex-col gap-3 font-body text-sm"
            style={{ color: tokens.inkSoft }}
          >
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block font-mono text-xs tracking-widest uppercase mb-6 px-3 py-1 rounded-full"
              style={{
                color: tokens.brassDeep,
                border: `1px solid ${tokens.brass}`,
              }}
            >
              Workforce OS
            </span>
            <h1
              className="font-display text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight"
              style={{ color: tokens.ink }}
            >
              Every person, every department, one clear picture.
            </h1>
            <p
              className="mt-6 max-w-md font-body text-base leading-7"
              style={{ color: tokens.inkSoft }}
            >
              A structured registry for your organization — built for teams
              who'd rather manage people than spreadsheets.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                className="rounded px-6 py-3 font-body font-semibold text-white flex items-center gap-2 cta-primary"
                style={{ backgroundColor: tokens.navy }}
                onClick={() => redirect("/auth/login")}
              >
                Get started <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="rounded px-6 py-3 font-body font-semibold cta-outline"
                style={{ border: `1px solid ${tokens.ink}`, color: tokens.ink }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.ink;
                  e.currentTarget.style.color = tokens.paper;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = tokens.ink;
                }}
              >
                Learn more
              </button>
            </div>
          </div>
          <div>
            <OrgGraphic />
          </div>
        </div>

        {/* Stat strip */}
        <div
          className="mt-16 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-wide pt-6 border-t"
          style={{ color: tokens.inkSoft, borderColor: tokens.line }}
        >
          <span>248 employees</span>
          <span>12 departments</span>
          <span>99.9% uptime</span>
          <span>4 regions</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: tokens.brassDeep }}
        >
          Capabilities
        </span>
        <h2
          className="font-display text-3xl md:text-4xl font-medium mt-3 tracking-tight"
          style={{ color: tokens.ink }}
        >
          Built to run the whole roster.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative rounded-md p-7 card-hover"
              style={{
                backgroundColor: tokens.paperCard,
                border: `1px solid ${tokens.line}`,
              }}
            >
              <div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                style={{ border: `1px solid ${tokens.line}` }}
              />
              <div
                className="w-11 h-11 rounded-md flex items-center justify-center mb-6"
                style={{ backgroundColor: tokens.navy }}
              >
                <Icon className="w-5 h-5" style={{ color: tokens.brass }} />
              </div>
              <h3
                className="font-body font-semibold text-lg"
                style={{ color: tokens.ink }}
              >
                {title}
              </h3>
              <p
                className="mt-3 font-body text-sm leading-6"
                style={{ color: tokens.inkSoft }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        style={{ backgroundColor: tokens.paperCard }}
        className="border-y"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: tokens.brassDeep }}
              >
                About
              </span>
              <h2
                className="font-display text-3xl font-medium mt-3 tracking-tight"
                style={{ color: tokens.ink }}
              >
                Built for modern organizations.
              </h2>
              <p
                className="mt-6 font-body leading-7"
                style={{ color: tokens.inkSoft }}
              >
                Registry keeps employee and department data in one structured
                place — clear enough for HR, simple enough for everyone else. No
                clutter, no learning curve, just an organized system that
                reflects how your teams actually work.
              </p>
            </div>
            <IdCard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: tokens.navy,
          borderTop: `2px solid ${tokens.brass}`,
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CircleDot className="w-4 h-4" style={{ color: tokens.brass }} />
            <span
              className="font-display text-sm"
              style={{ color: tokens.paper }}
            >
              © 2026 Registry
            </span>
          </div>
          <div
            className="flex gap-6 font-body text-sm"
            style={{ color: "#8B95A3" }}
          >
            <a href="#" className="hover:text-white transition">
              Home
            </a>
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
