import React from "react";
import { FileText, Upload } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";

type Props = {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
};

export default function FormFileInput({
  id,
  label,
  accept,
  file,
  onChange,
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
        {label} {required ? "*" : "(optional)"}
      </label>
      <div className="relative">
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-md font-body text-sm"
          style={{
            backgroundColor: tokens.paper,
            border: `1px solid ${tokens.line}`,
            color: file ? tokens.ink : tokens.inkSoft,
          }}
        >
          {file ? (
            <>
              <FileText className="w-4 h-4" style={{ color: tokens.brass }} />
              <span className="truncate">{file.name}</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" style={{ color: tokens.inkSoft }} />
              <span>{`Choose ${label.toLowerCase()}...`}</span>
            </>
          )}
        </div>
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
