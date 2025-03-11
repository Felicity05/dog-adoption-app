import React, {useState, useEffect, useRef} from "react";
import {getDogsBreeds, search} from "../api/api.tsx";
import MagentaButton from "./MagentaButton.tsx";
import { FilterOptions, SortCriteria } from "../api/types.tsx";
import SortOptions from "./SortOptions.tsx";
import MultiSelectDropdown from "./MultiSelectDropdown.tsx";

interface FilterProps {
   onFilterChange: (filters: FilterOptions) => void;
}

const filtersInitialState: FilterOptions = {
    breeds: [],
    name: "",
    minAge: null,
    maxAge: null,
    sortOrder: "asc",
    sortCriteria: SortCriteria.Breed,
};

const Filters: React.FC<FilterProps> = ({onFilterChange}) => {
   const [breeds, setBreeds] = useState<string[]>([]);
   const [filters, setFilters] = useState<FilterOptions>(filtersInitialState);
   const optionsListRef = useRef<HTMLUListElement>(null);

   useEffect(() => {
      getDogsBreeds().then(r => {
         setBreeds(r);
      });
   },[])

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const {name, value} = e.target;
      // const options = (e.target as HTMLSelectElement).options;
      let newValue;

      const isChecked = (e.target as HTMLInputElement).checked;
      const option = e.target.value;

      const selectedOptionSet = new Set(filters.breeds);

      if (isChecked) {
         selectedOptionSet.add(option);
      } else {
         selectedOptionSet.delete(option);
      }

      console.log(selectedOptionSet);

      if(name === "breeds") {
         newValue = Array.from(selectedOptionSet);
      } else
         newValue = name === "minAge" || name === "maxAge" ? (value ? +value : null) : value;

      // Trim whitespace
      if(name === "name") {
         newValue = value.trim().replace(/\s+/g, "");
      }

      // Add validation for minAge and maxAge
      if (name === "minAge" && newValue !== null && typeof newValue === "number" && (newValue < 0 || newValue > 25)) {
         newValue = 0; // Ensure minAge is not less than 0
      }

      if (name === "maxAge" && newValue !== null && typeof newValue === "number" && (newValue > 25 || newValue < 0)) {
         newValue = 25; // Ensure maxAge is not more than 25
      }

      const newFilters = {
         ...filters,
         [name]: newValue,
      };
      setFilters(newFilters);
      onFilterChange(newFilters);

      console.log("filters = ", filters)
   };

   const handleApplyFilters = () =>{
      console.log("filters to apply=",filters);
      search({...filters}).then(r => console.log("filtered search=", r))
   }

   const clearFilters = () => {
      const options: HTMLUListElement | null = optionsListRef.current;
      if(options !== null){
         const optionsInputs = (options as HTMLUListElement).querySelectorAll("input");
         optionsInputs.forEach((input: { checked: boolean; }) => {
            input.checked = false;
         });
      }

      setFilters(filtersInitialState);
   }

   return (
      <div className="p-5 bg-white rounded shadow-md space-y-4 w-full flex flex-col items-center">
         <h2 className="text-xl w-[250px] font-bold">Refine Your Search</h2>

         {/* Breed Dropdown */}
         <MultiSelectDropdown filters={filters} onFilterChange={handleInputChange} breeds={breeds}
                              optionsListRef={optionsListRef}/>

         {/* Name Input */}
         <div className="w-full">
            <label className="block pl-2 mb-2 text-lg font-medium text-gray-700" htmlFor="name">
               Name
            </label>
            <input
               id="name"
               name="name"
               type="text"
               value={filters.name}
               onChange={handleInputChange}
               placeholder="Enter name"
               className="block w-full h-10 border-2 border-[#890A74] rounded
                           focus:outline-none focus:border-[#FFA900]"
            />
            {/*Validation to only allow alphabetic characters*/}
            {filters.name && !/^[a-zA-Z]+$/.test(filters.name) &&
               <p className="text-red-500 text-xs pt-2 pl-2">Name can only contain alphabetic characters.</p>}
         </div>

         {/*Age Inputs*/}
         <div className="flex flex-col gap-2">
            <label className="block pl-2 mb-2 text-lg font-medium text-gray-700">
               Age
            </label>
            <div className="flex gap-2">
               <input
                  id="minAge"
                  name="minAge"
                  type="number"
                  value={filters.minAge ?? ""}
                  onChange={handleInputChange}
                  placeholder="Min age"
                  className="block w-full h-10 border-2 border-[#890A74] rounded
                              focus:outline-none focus:border-[#FFA900]"
               />
               <input
                  id="maxAge"
                  name="maxAge"
                  type="number"
                  value={filters.maxAge ?? ""}
                  onChange={handleInputChange}
                  placeholder="Max age"
                  className="block w-full h-10 border-2 border-[#890A74] rounded
                              focus:outline-none focus:border-[#FFA900]"
               />
            </div>
         </div>

         {/* Sort Section */}
         <SortOptions filters={filters} onChange={handleInputChange}/>

         {/* Submit */}
         <div className="flex flex-col gap-2 ">
            <MagentaButton label='Apply Filters' buttonType='primary' disabled={false}
                           onClick={handleApplyFilters}/>
            <MagentaButton label='Clear Filters' buttonType='primary' disabled={false}
                           onClick={clearFilters}/>
         </div>
      </div>
   );
};

export default Filters;
