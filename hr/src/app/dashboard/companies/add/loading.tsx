import { tokens } from "@/src/shared/constants/landing";

export default function NewCompanyLoading() {
  return (
    <div>
      {/* Back navigation placeholder */}
      <div className="mb-6 flex items-center gap-2 animate-pulse">
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundColor: tokens.line }}
        />
        <div
          className="h-3 w-28 rounded"
          style={{ backgroundColor: tokens.line }}
        />
      </div>

      {/* Form card */}
      <div className="w-full max-w-2xl mx-auto">
        <div
          className="rounded-md p-6"
          style={{
            backgroundColor: tokens.paperCard,
            border: `1px solid ${tokens.line}`,
          }}
        >
          {/* Title placeholder */}
          <div
            className="h-6 w-48 mb-6 rounded animate-pulse"
            style={{ backgroundColor: tokens.line }}
          />

          <div className="space-y-4 animate-pulse">
            {/* Company Name */}
            <div>
              <div
                className="h-3 w-24 mb-2 rounded"
                style={{ backgroundColor: tokens.line }}
              />
              <div
                className="h-10 w-full rounded"
                style={{ backgroundColor: tokens.line }}
              />
            </div>

            {/* Email */}
            <div>
              <div
                className="h-3 w-12 mb-2 rounded"
                style={{ backgroundColor: tokens.line }}
              />
              <div
                className="h-10 w-full rounded"
                style={{ backgroundColor: tokens.line }}
              />
            </div>

            {/* License File */}
            <div>
              <div
                className="h-3 w-24 mb-2 rounded"
                style={{ backgroundColor: tokens.line }}
              />
              <div
                className="h-10 w-full rounded flex items-center gap-3 px-4"
                style={{
                  border: `1px solid ${tokens.line}`,
                  backgroundColor: tokens.paper,
                }}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: tokens.line }}
                />
                <div
                  className="h-3 w-32 rounded"
                  style={{ backgroundColor: tokens.line }}
                />
              </div>
            </div>

            {/* TIN Number */}
            <div>
              <div
                className="h-3 w-20 mb-2 rounded"
                style={{ backgroundColor: tokens.line }}
              />
              <div
                className="h-10 w-full rounded"
                style={{ backgroundColor: tokens.line }}
              />
            </div>

            {/* Phone Number */}
            <div>
              <div
                className="h-3 w-24 mb-2 rounded"
                style={{ backgroundColor: tokens.line }}
              />
              <div
                className="h-10 w-full rounded"
                style={{ backgroundColor: tokens.line }}
              />
            </div>

            {/* Address group */}
            <fieldset
              className="border rounded-md p-4 space-y-3"
              style={{ borderColor: tokens.line }}
            >
              <div
                className="h-3 w-16 mb-2 rounded"
                style={{ backgroundColor: tokens.line }}
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <div
                    className="h-3 w-12 mb-2 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                  <div
                    className="h-10 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className="h-3 w-10 mb-2 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                  <div
                    className="h-10 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <div
                    className="h-3 w-14 mb-2 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                  <div
                    className="h-10 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className="h-3 w-14 mb-2 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                  <div
                    className="h-10 rounded"
                    style={{ backgroundColor: tokens.line }}
                  />
                </div>
              </div>

              <div>
                <div
                  className="h-3 w-24 mb-2 rounded"
                  style={{ backgroundColor: tokens.line }}
                />
                <div
                  className="h-10 rounded"
                  style={{ backgroundColor: tokens.line }}
                />
              </div>
            </fieldset>

            {/* Submit button */}
            <div
              className="h-12 w-full rounded"
              style={{ backgroundColor: tokens.line }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
