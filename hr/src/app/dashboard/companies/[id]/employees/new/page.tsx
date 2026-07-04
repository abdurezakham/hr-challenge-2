"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { tokens } from "@/src/shared/constants/landing";
import CreateEmployeeForm from "@/src/modules/hr/components/dashboard/employees/CreateEmployeeForm";

export default function NewEmployeePage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href=".." // goes back to the employee list (or you can specify /dashboard/companies/[id]/employees)
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide hover:opacity-80"
          style={{ color: tokens.inkSoft }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Employees
        </Link>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <div
          className="rounded-md p-6"
          style={{
            backgroundColor: tokens.paperCard,
            border: `1px solid ${tokens.line}`,
          }}
        >
          <h2
            className="font-display text-2xl font-medium mb-6"
            style={{ color: tokens.ink }}
          >
            Add New Employee
          </h2>
          <CreateEmployeeForm />
        </div>
      </div>
    </div>
  );
}
