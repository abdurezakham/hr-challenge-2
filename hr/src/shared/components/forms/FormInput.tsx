import React from "react";
import { tokens } from "@/src/shared/constants/landing";

type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
};

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  required = false,
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-mono uppercase tracking-wide mb-2"
        style={{ color: tokens.inkSoft }}
      >
        {label} {required ? "*" : ""}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 rounded-md font-body text-sm input-focus"
          style={{
            backgroundColor: tokens.paper,
            border: `1px solid ${tokens.line}`,
            color: tokens.ink,
          }}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p
          className="flex items-center gap-1.5 mt-1 text-xs font-mono"
          style={{ color: tokens.brassDeep }}
        >
          <span
            className="inline-block w-1 h-1 rounded-full"
            style={{ backgroundColor: tokens.brassDeep }}
          />
          {error}
        </p>
      )}
    </div>
  );
}
