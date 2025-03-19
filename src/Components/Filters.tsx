import React from "react";
import MagentaButton from "./MagentaButton.tsx";
import SortOptions from "./SortOptions.tsx";
import BreedsDropdown from "./BreedsDropdown.tsx";
import LocationSearch from "./LocationSearch.tsx";
import { useFiltersStore } from "../store/filtersStore.tsx";
import AgeFilters from "./AgeFilters.tsx";

const Filters: React.FC = () => {
   const { resetFilters } = useFiltersStore();

   return (
      <div className="p-5 bg-white rounded shadow-md space-y-4 w-full lg:max-w-[300px] boder-5">
         {/* Title */}
         <h2 className="text-xl font-bold text-center">Refine Your Search</h2>
       
         <div className="w-full">
            <BreedsDropdown />
         </div>

         <div className="w-full">
            <LocationSearch />
         </div>

         <div className="w-full">
            <AgeFilters />
         </div>

         <div className="w-full">
            <SortOptions />
         </div>


         {/* Clear Filters Button */}
         <div className="w-full flex justify-center">
            <MagentaButton
               label="Clear Filters"
               buttonType="primary"
               disabled={false}
               onClick={resetFilters}
            />
         </div>
         
      </div>
   );
};

export default Filters;