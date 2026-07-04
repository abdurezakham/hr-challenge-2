import React from "react";
import { tokens } from "@/src/shared/constants/landing";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
};

export default function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-md font-body text-sm input-focus appearance-none"
        style={{
          backgroundColor: tokens.paper,
          border: `1px solid ${tokens.line}`,
          color: tokens.ink,
          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%234B5049'%3E%3Cpath d='M4.293 5.293a1 1 0 011.414 0L8 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1rem",
        }}
        // autoComplete="off"
        // required={required}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <ErrorLine message={error} />}
    </div>
  );
}

function ErrorLine({ message }: { message: string }) {
  return (
    <p
      className="flex items-center gap-1.5 mt-1 text-xs font-mono"
      style={{ color: tokens.brassDeep }}
    >
      <span
        className="inline-block w-1 h-1 rounded-full"
        style={{ backgroundColor: tokens.brassDeep }}
      />
      {message}
    </p>
  );
}
