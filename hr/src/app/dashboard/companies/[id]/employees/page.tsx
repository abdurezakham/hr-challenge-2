"use client";

import { useEmployees } from "@/src/modules/hr/hooks/useEmployees";
import { tokens } from "@/src/shared/constants/landing";
import { ArrowLeft, Filter, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const DEPARTMENTS = [
  "HR",
  "Engineering",
  "Sales",
  "Marketing",
  "Finance",
  "Operations",
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function EmployeesPage() {
  const params = useParams<{ id: string }>();
  const companyId = params.id;

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useEmployees(companyId, search, selectedDepartment);

  const clearFilters = () => {
    setSearch("");
    setSelectedDepartment("");
  };

  return (
    <div>
      {/* Header & navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/companies/${companyId}`}
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide hover:opacity-80"
            style={{ color: tokens.inkSoft }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Company
          </Link>
          <h1
            className="font-display text-2xl font-medium"
            style={{ color: tokens.ink }}
          >
            Employees
          </h1>
        </div>
        <Link
          href={`/dashboard/companies/${companyId}/employees/new`}
          className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-body font-semibold text-white transition-colors"
          style={{
            backgroundColor: tokens.navy,
            border: `1px solid ${tokens.brass}`,
          }}
        >
          Add Employee
        </Link>
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: tokens.inkSoft }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-md font-body text-sm input-focus"
            style={{
              backgroundColor: tokens.paper,
              border: `1px solid ${tokens.line}`,
              color: tokens.ink,
            }}
          />
        </div>
        <div className="relative sm:w-48">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: tokens.inkSoft }}
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-md font-body text-sm input-focus appearance-none"
            style={{
              backgroundColor: tokens.paper,
              border: `1px solid ${tokens.line}`,
              color: tokens.ink,
            }}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        {(search || selectedDepartment) && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wide"
            style={{ color: tokens.inkSoft }}
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Content */}
      <div
        className="rounded-md"
        style={{
          backgroundColor: tokens.paperCard,
          border: `1px solid ${tokens.line}`,
        }}
      >
        {isLoading && (
          <div className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: tokens.line }}
                />
                <div className="flex-1 space-y-2">
                  <div
                    className="h-4 w-1/3 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                  <div
                    className="h-3 w-1/2 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-6 text-center">
            <p
              className="text-xs font-mono uppercase tracking-wide"
              style={{ color: tokens.brassDeep }}
            >
              Failed to load employees
            </p>
            <p className="text-sm mt-2" style={{ color: tokens.inkSoft }}>
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          </div>
        )}

        {!isLoading && !isError && employees.length === 0 && (
          <div className="p-10 text-center">
            <User
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: tokens.inkSoft }}
            />
            <p
              className="text-lg font-display font-medium"
              style={{ color: tokens.ink }}
            >
              No employees found
            </p>
            <p className="text-sm mt-1" style={{ color: tokens.inkSoft }}>
              {search || selectedDepartment
                ? "Try adjusting your search or filter."
                : "Add the first employee to this company."}
            </p>
            {!search && !selectedDepartment && (
              <Link
                href={`/dashboard/companies/${companyId}/employees/new`}
                className="inline-flex items-center gap-2 mt-6 rounded-md px-5 py-2.5 font-body font-semibold text-white transition-colors"
                style={{
                  backgroundColor: tokens.navy,
                  border: `1px solid ${tokens.brass}`,
                }}
              >
                Add Employee
              </Link>
            )}
          </div>
        )}

        {!isLoading && !isError && employees.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${tokens.line}` }}>
                  <th
                    className="text-left p-4 font-mono uppercase text-xs tracking-wide"
                    style={{ color: tokens.inkSoft }}
                  >
                    Name
                  </th>
                  <th
                    className="text-left p-4 font-mono uppercase text-xs tracking-wide"
                    style={{ color: tokens.inkSoft }}
                  >
                    Email
                  </th>
                  <th
                    className="text-left p-4 font-mono uppercase text-xs tracking-wide"
                    style={{ color: tokens.inkSoft }}
                  >
                    Department
                  </th>
                  <th
                    className="text-left p-4 font-mono uppercase text-xs tracking-wide"
                    style={{ color: tokens.inkSoft }}
                  >
                    Role
                  </th>
                  <th
                    className="text-left p-4 font-mono uppercase text-xs tracking-wide"
                    style={{ color: tokens.inkSoft }}
                  >
                    Status
                  </th>
                  <th
                    className="text-left p-4 font-mono uppercase text-xs tracking-wide"
                    style={{ color: tokens.inkSoft }}
                  >
                    Join Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.employee_id}
                    style={{ borderBottom: `1px solid ${tokens.line}` }}
                  >
                    <td
                      className="p-4 font-body font-medium"
                      style={{ color: tokens.ink }}
                    >
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td className="p-4" style={{ color: tokens.inkSoft }}>
                      {emp.email}
                    </td>
                    <td className="p-4" style={{ color: tokens.inkSoft }}>
                      {emp.department}
                    </td>
                    <td className="p-4" style={{ color: tokens.inkSoft }}>
                      {emp.role}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          emp.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4" style={{ color: tokens.inkSoft }}>
                      {formatDate(emp.join_date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
