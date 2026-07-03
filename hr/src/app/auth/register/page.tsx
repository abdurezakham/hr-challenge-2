"use client";

import { useState } from "react";
import { Building2, CircleDot, User } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import Link from "next/link";
import UserSignupForm from "@/src/modules/hr/components/UserSignupForm";
import CompanySignupForm from "@/src/modules/hr/components/CompanySignupForm";

type SignupType = "user" | "company";

export default function SignupPage() {
  const [signupType, setSignupType] = useState<SignupType>("user");

  return (
    <div
      style={{ backgroundColor: tokens.paper, color: tokens.ink }}
      className="min-h-screen font-body"
    >
      <style>{`
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }

        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -8px rgba(16,27,42,0.15); }

        .cta-primary { transition: background-color 0.2s ease, transform 0.2s ease; }
        .cta-primary:hover { background-color: ${tokens.brassDeep}; transform: translateY(-1px); }

        .input-focus { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .input-focus:focus { border-color: ${tokens.brass}; box-shadow: 0 0 0 2px ${tokens.brass}20; outline: none; }

        .link-underline { position: relative; }
        .link-underline::after {
          content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px;
          background-color: ${tokens.brass}; transition: width 0.2s ease;
        }
        .link-underline:hover::after { width: 100%; }
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

        {/* Signup card */}
        <div
          className="w-full max-w-md relative rounded-md p-8 card-hover"
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

          <div className="mb-8">
            <h1
              className="mt-2 font-display text-2xl font-medium tracking-tight"
              style={{ color: tokens.ink }}
            >
              Create your account
            </h1>
            <p className="mt-2 text-sm" style={{ color: tokens.inkSoft }}>
              Choose your account type to get started.
            </p>
          </div>

          {/* Slider */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative flex items-center w-full max-w-xs">
              <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: tokens.line }}
              />
              <div
                className={`absolute top-0 bottom-0 w-1/2 rounded-full transition-transform duration-300 ${
                  signupType === "user" ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ backgroundColor: tokens.navy }}
              />
              <button
                type="button"
                onClick={() => setSignupType("user")}
                className={`relative z-10 flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition ${
                  signupType === "user" ? "text-white" : ""
                }`}
                style={{
                  color: signupType === "user" ? tokens.paper : tokens.inkSoft,
                }}
              >
                <User className="w-4 h-4" />
                User
              </button>
              <button
                type="button"
                onClick={() => setSignupType("company")}
                className={`relative z-10 flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition ${
                  signupType === "company" ? "text-white" : ""
                }`}
                style={{
                  color:
                    signupType === "company" ? tokens.paper : tokens.inkSoft,
                }}
              >
                <Building2 className="w-4 h-4" />
                Company
              </button>
            </div>
          </div>

          {/* Render active form */}
          {signupType === "user" ? <UserSignupForm /> : <CompanySignupForm />}
        </div>

        <p className="mt-6 text-sm" style={{ color: tokens.inkSoft }}>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium link-underline"
            style={{ color: tokens.brassDeep }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
