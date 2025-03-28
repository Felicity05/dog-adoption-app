import React, { useState } from "react";
import MagentaButton from "./MagentaButton.tsx";
import SortOptions from "./SortOptions.tsx";
import BreedsDropdown from "./BreedsDropdown.tsx";
import LocationSearch from "./LocationSearch.tsx";
import { useFiltersStore } from "../store/filtersStore.tsx";
import AgeFilters from "./AgeFilters.tsx";

const Filters: React.FC = () => {
   const { resetFilters } = useFiltersStore();
   const [location, setLocation] = useState("");

   const clearFilters = () => {
      setLocation(""); // Clear local state
      resetFilters(); // Reset store filters -- global state
   }

   return (
      <div className="p-5 bg-white rounded-xl shadow-lg space-y-4 w-full">
         {/* Title */}
         <h2 className="text-xl font-bold text-center">Refine Your Search</h2>

         <div className="w-full">
            <BreedsDropdown />
         </div>

         <div className="w-full">
            <LocationSearch location={location} setLocation={setLocation} />
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
               onClick={clearFilters}
            />
         </div>

      </div>
   );
};

export default Filters;