import { create } from "zustand";
import { CompanyListItem } from "@/src/modules/hr/types";

type Store = {
  selectedCompany: CompanyListItem | null;
  setSelectedCompany: (company: CompanyListItem) => void;
  clearSelectedCompany: () => void;
};

export const useCompanyStore = create<Store>((set) => ({
  selectedCompany: null,
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  clearSelectedCompany: () => set({ selectedCompany: null }),
}));
