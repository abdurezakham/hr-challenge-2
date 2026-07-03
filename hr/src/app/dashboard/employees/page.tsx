"use client";
import { tokens } from "@/src/shared/constants/landing";

export default function EmployeePage() {
  return (
    <div>
      <h1
        className="font-display text-3xl font-medium mb-6"
        style={{ color: tokens.ink }}
      >
        Employees
      </h1>
      <div
        className="p-6 rounded-md"
        style={{
          backgroundColor: tokens.paperCard,
          border: `1px solid ${tokens.line}`,
        }}
      >
        <p className="text-sm" style={{ color: tokens.inkSoft }}>
          Employee list and management will go here.
        </p>
      </div>
    </div>
  );
}
