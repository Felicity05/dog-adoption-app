import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {getLocationsFromZipCode, searchLocations} from "../api/api.tsx";
import {useFiltersStore} from "../store/filtersStore.tsx";
import MultiSelectDropdown from "./MultiSelectDropdown.tsx";
import {LocationObject} from "../api/types.tsx";

const LocationSearch: React.FC = () => {
   const { filters, setFilters, isMultiple, setIsMultiple } = useFiltersStore();
   const location = filters.location;
   const [debouncedInput] = useDebounce(location, 1000); // Debounce input

   const [zipOptions, setZipOptions] = useState<string[]>([]);
   const selectedCount = filters.zipCodes?.length || 0;
   const displayText = selectedCount > 0 ? `${selectedCount} zip codes selected` : "Select zip codes";

   //enter a zip code -> validate with endpoint and update filters state with
   // correct list of zip codes

   //display menu options with zip codes for city and states
   //enter a city -> get zip codes for that city
   //enter a state -> get zipcodes for that state

   useEffect(() => {
      console.log("inside effect on location search component")
      if (debouncedInput!.trim()) {
         // console.log("debouncedInput= ", debouncedInput)

         const locationsOptions = debouncedInput!
            .split(/[\s,]+/) // Split by spaces or commas
            .map((zip) => zip.trim());

         const zipcodes = locationsOptions
            .filter((zip) => zip && /^\d+$/.test(zip)); // Remove empty and non-numeric values

         const citiesOrStates = locationsOptions
               .filter((loc) => loc && isNaN(Number(loc))); // keeps Non-numeric (cities/states)


         if (zipcodes.length > 0) {
            validateZipCodes(zipcodes);
         }

         if (citiesOrStates.length > 0) {
            getZipsFromCityOrStates(citiesOrStates);
         }
      } else {
         setFilters({ ...filters, zipCodes: [] });
      }

   }, [debouncedInput]);

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      setFilters({...filters, location: e.target.value});
      setIsMultiple(false);
   };

   //call get location from zipcode to validate zip code
   const validateZipCodes = async (zipcodes: string[]) => {
      try {
         const response = await getLocationsFromZipCode(zipcodes);
         // console.log(response)
         const validZipCodes: string[] = response.filter((location: Location | null) => location !== null)
            .map((loc: { zip_code: string; }) => loc.zip_code)

         // Update filters state with the valid zip codes - set zip options as the zipCodes attributes on the filters state
         setFilters({ ...filters, zipCodes: validZipCodes });
      } catch (error) {
         console.error("Error validating zip code:", error);
      }
   }

   const getZipsFromCityOrStates = async (locations: string[]) => {
      // If input is a city/state, fetch zip codes
      try {
         let city: string = "";
         const states: string[]  = [];

         locations.forEach((loc) => {
            if (loc.length === 2) {
               states!.push(loc.toUpperCase());
            } else {
               city = loc.trim();
            }
         });

         const response = await searchLocations({city, states});
         console.log(response);
         const zipOptions = response.results.map((loc: LocationObject) => loc.zip_code);
         setZipOptions(zipOptions);
         console.log(zipOptions);
         if (zipOptions.length > 0) setIsMultiple(true);
      } catch (error) {
         console.error("Error fetching locations:", error);
      }
   }

   return (
      <div className="w-full">
         <label className="block pl-2 mb-2 text-lg font-medium text-gray-700" htmlFor="Locations">
            Locations
         </label>
         <input
            id="zipCodes"
            name="zipCodes"
            type="text"
            value={location}
            onChange={handleInputChange} // Update location state on input change
            placeholder="Enter city, zip codes, or states"
            className="block w-full h-10 border-2 border-[#890A74] rounded
                           focus:outline-none focus:border-[#FFA900]"
         />
         {isMultiple &&
               <MultiSelectDropdown dropdownFor={"zipCodes"} filtersProperty={filters.zipCodes}
                                    displayText={displayText} optionsList={zipOptions}/>
         }
      </div>
   );
};

export default LocationSearch;
