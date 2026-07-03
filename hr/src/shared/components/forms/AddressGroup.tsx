import React from "react";
import { tokens } from "@/src/shared/constants/landing";
import FormInput from "./FormInput";

type AddressFields = {
  region: string;
  city: string;
  subcity: string;
  woreda: string;
  houseNumber: string;
};

type Props = {
  values: AddressFields;
  onChange: (field: keyof AddressFields, value: string) => void;
  errors: Partial<Record<keyof AddressFields, string>>;
};

export default function AddressGroup({ values, onChange, errors }: Props) {
  return (
    <fieldset
      className="border rounded-md p-4 space-y-3"
      style={{ borderColor: tokens.line }}
    >
      <legend
        className="text-xs font-mono uppercase tracking-wide px-1"
        style={{ color: tokens.inkSoft }}
      >
        Address
      </legend>

      {/* Region & City row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <FormInput
            id="region"
            label="Region"
            placeholder="Region"
            value={values.region}
            onChange={(e) => onChange("region", e.target.value)}
            error={errors.region}
            required
          />
        </div>
        <div className="flex-1">
          <FormInput
            id="city"
            label="City"
            placeholder="City"
            value={values.city}
            onChange={(e) => onChange("city", e.target.value)}
            error={errors.city}
            required
          />
        </div>
      </div>

      {/* Subcity & Woreda row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <FormInput
            id="subcity"
            label="Subcity"
            placeholder="Subcity"
            value={values.subcity}
            onChange={(e) => onChange("subcity", e.target.value)}
            error={errors.subcity}
            required
          />
        </div>
        <div className="flex-1">
          <FormInput
            id="woreda"
            label="Woreda"
            placeholder="Woreda"
            value={values.woreda}
            onChange={(e) => onChange("woreda", e.target.value)}
            error={errors.woreda}
            required
          />
        </div>
      </div>

      {/* House number */}
      <div>
        <FormInput
          id="houseNumber"
          label="House Number"
          placeholder="House number"
          value={values.houseNumber}
          onChange={(e) => onChange("houseNumber", e.target.value)}
          error={errors.houseNumber}
          required
        />
      </div>
    </fieldset>
  );
}
