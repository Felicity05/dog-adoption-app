import { create } from "zustand";
import { FilterOptions, SortCriteria } from "../api/types.tsx";

interface FiltersState {
   filters: FilterOptions;
   isLoading: boolean;
   setFilters: (filters: Partial<FiltersState["filters"]>) => void;
   resetFilters: () => void;
   setLoading: (loading: boolean) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
   filters: {
      breeds: [],
      zipCodes: [],
      minAge: null,
      maxAge: null,
      sortOrder: "asc",
      sortCriteria: SortCriteria.Breed,
      currentPage: 0
   },
   isLoading: false,
   setFilters: (newFilters) => {
      set((state) => ({
         filters: { ...state.filters, ...newFilters },
         isLoading: true
      }))
   },
   resetFilters: () =>
      set({
         filters: {
            breeds: [],
            zipCodes: [],
            minAge: null,
            maxAge: null,
            sortOrder: "asc",
            sortCriteria: SortCriteria.Breed,
            currentPage: 0
         },
         isLoading: false,
      }),
   setLoading: (loading) => set({ isLoading: loading }),
}));
