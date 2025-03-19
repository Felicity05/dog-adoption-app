import React from "react";
import {useFiltersStore} from "../store/filtersStore.tsx";

const AgeFilters: React.FC = () => {
   const {filters, setFilters} = useFiltersStore();

   const handleAgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      const newValue = name === "minAge" || name === "maxAge" ? (value ? +value : null) : value;
      setFilters({...filters, [name]: newValue});
   }

  return (
     <div className="flex flex-col gap-2 w-full">
        <label className="block pl-2 mb-2 text-lg font-medium text-gray-700">
           Age
        </label>
        <div className="flex gap-2">
           <input
              id="minAge"
              name="minAge"
              type="number"
              value={filters.minAge ?? ""}
              onChange={handleAgeInputChange}
              placeholder="Min age"
              className="block w-full h-10 border-2 border-[#890A74] rounded
                              focus:outline-none focus:border-[#FFA900]"
           />
           <input
              id="maxAge"
              name="maxAge"
              type="number"
              value={filters.maxAge ?? ""}
              onChange={handleAgeInputChange}
              placeholder="Max age"
              className="block w-full h-10 border-2 border-[#890A74] rounded
                              focus:outline-none focus:border-[#FFA900]"
           />
        </div>
     </div>
  )
}

export default AgeFilters;
