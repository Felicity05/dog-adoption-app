import {create} from "zustand";
import {FilterOptions, SortCriteria} from "../api/types.tsx";

interface FiltersState {
   filters: FilterOptions;
   isMultiple: boolean;
   setIsMultiple: (isMultiple: boolean) => void;
   setFilters: (filters: Partial<FiltersState["filters"]>) => void;
   resetFilters: () => void;
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
   },
   isMultiple: false,
   setIsMultiple: (isMultiple: boolean) => { set({isMultiple}) },
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
         },
         isMultiple: false,
      }),
}));
