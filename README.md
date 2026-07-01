HR Module — Frontend

Frontend for the HR module of the ERP system, built with Next.js and TypeScript. It consumes the live Ethio Backend API for authentication, company management, and employee CRUD — no mock data or local storage.


Features


Auth — register, login, view profile
Company — register a company, view companies for the logged-in user
HR / Employees

Create employee
List employees with search (name/email) and department filter
View employee detail
Update employee (partial updates)
Delete employee (single + bulk)
Leave count widget
Employee summary dashboard (total / active / on-leave)


Tech Stack


Next.js (App Router)
TypeScript
Your choice of data fetching layer (fetch/axios / React Query) — see providers/QueryProvider.tsx
Your choice of styling (Tailwind.)


Prerequisites

Node.js 18+
npm, yarn, or pnpm


Getting Started


Clone the repo and install dependencies:


bash   npm install


Create a .env.local file in the project root:


env   NEXT_PUBLIC_API_BASE_URL=https://eth-backend-h97m.onrender.com/api/v1/


Run the dev server:


bash   npm run dev


Open http://localhost:3000.


Data Flow

Most HR endpoints require IDs obtained earlier in the flow:

Login → user_id
Register/select company → company_id
Employee actions → require both company_id and user_id as query params

Store user_id and the selected company_id in shared/store (e.g. via AuthProvider and a company context) so the HR module can read them without re-fetching.

Error Handling

All API responses follow:

json// success
{ "success": true, "message": "string", "...": "..." }

// error
{ "success": false, "message": "string", "errors": { "field": ["reason"] } }

The shared API client (shared/services) should parse this shape once and expose typed success/error results to hooks and components, rather than duplicating error parsing per call.

Scripts

CommandDescriptionnpm run devStart development servernpm run buildProduction buildnpm run startStart production servernpm run lintRun linter

Notes

File uploads (profile_image, license_file) use multipart/form-data.
Department options: HR, Engineering, Sales, Marketing, Finance, Operations
Employee status options: active, on_leave