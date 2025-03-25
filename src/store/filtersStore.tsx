import { create } from "zustand";
import { FilterOptions, SortCriteria } from "../api/types.tsx";

interface FiltersState {
   filters: FilterOptions;
   setFilters: (filters: Partial<FiltersState["filters"]>) => void;
   resetFilters: () => void;
   searchLocationCurrentPage: number;
   searchLocationTotalItems: number;
   setSearchLocationPage: (page: number) => void;
   setSearchLocationTotalItems: (total: number) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
   filters: {
      breeds: [],
      zipCodes: [],
      minAge: null,
      maxAge: null,
      location: "",
      sortOrder: "asc",
      sortCriteria: SortCriteria.Breed,
      currentPage: 0
   },
   searchLocationCurrentPage: 0,
   searchLocationTotalItems: 0,
   setSearchLocationPage: (page) => set({ searchLocationCurrentPage: page }),
   setSearchLocationTotalItems: (total) => set({ searchLocationTotalItems: total }),
   setFilters: (newFilters) =>
      set((state) => ({
         filters: { ...state.filters, ...newFilters },
      })),
   resetFilters: () =>
      set({
         filters: {
            breeds: [],
            zipCodes: [],
            minAge: null,
            maxAge: null,
            location: "",
            sortOrder: "asc",
            sortCriteria: SortCriteria.Breed,
            currentPage: 0
         },
         searchLocationCurrentPage: 0,
         searchLocationTotalItems: 0,
      }),
}));
