// src/shared/lib/formData.ts

export function objectToFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    formData.append(key, value instanceof File ? value : String(value));
  }
  return formData;
}
