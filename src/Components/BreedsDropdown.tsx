import React, {useEffect, useState} from "react";
import MultiSelectDropdown from "./MultiSelectDropdown.tsx";
import {getDogsBreeds} from "../api/api.tsx";
import {useFiltersStore} from "../store/filtersStore.tsx";


const BreedsDropdown : React.FC = () => {
   const {filters} = useFiltersStore();
   const [breeds, setBreeds] = useState<string[]>([]);
   const selectedCount = filters.breeds?.length || 0;
   const displayText = selectedCount > 0 ? `${selectedCount} breeds selected` : "Select breeds";

   useEffect(() => {
      getDogsBreeds().then(r => {
         setBreeds(r);
      });
   },[])

  return (
     <div className="w-full">
        <label className="block w-full pl-2 mb-2 text-lg font-medium text-gray-700" htmlFor="breeds">
           Breeds
        </label>
        <MultiSelectDropdown dropdownFor={"breeds"} filtersProperty={filters.breeds}
                             displayText={displayText} optionsList={breeds}/>
     </div>
  )
}

export default BreedsDropdown;
