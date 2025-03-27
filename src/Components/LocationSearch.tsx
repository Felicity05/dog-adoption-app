import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { getLocationsFromZipCode, searchLocations } from "../api/api.tsx";
import { useFiltersStore } from "../store/filtersStore.tsx";
import { LocationObject } from "../api/types.tsx";

const LocationSearch: React.FC = () => {
   const { filters, setFilters } = useFiltersStore();

   const location = filters.location;
   const [debouncedInput] = useDebounce(location, 1000); // Debounce input

   useEffect(() => {
      if (debouncedInput?.trim()) {
         handleLocationSearch();
      } else if(filters.zipCodes!.length > 0){
         setFilters({ ...filters, zipCodes: [], currentPage: 0, location: "" });
      }
   }, [debouncedInput]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFilters({ ...filters, location: e.target.value });
   };

   const handleLocationSearch = async () => {
      try {
         const locationsOptions = debouncedInput!
            .split(',') // Split only by commas
            .map(zip => zip.trim()) // Trim whitespace
            .filter(zip => zip.length > 0); // Remove empty strings

         const zipcodes = locationsOptions
            .filter((zip) => zip && /^\d+$/.test(zip)); // Remove empty and non-numeric values 

         const citiesOrStates = locationsOptions
            .filter((loc) => loc && isNaN(Number(loc))); // Remove numeric values (keep cities/states)

         if (zipcodes.length > 0) {
            await validateZipCodes(zipcodes);
         } else if (citiesOrStates.length > 0) {
            await getZipsFromCityOrStates(citiesOrStates);
         }
      } catch (error) {
         console.error("Error searching locations:", error);
      }
   }

   //call get location from zipcode to validate zip code
   const validateZipCodes = async (zipcodes: string[]) => {
      const response = await getLocationsFromZipCode(zipcodes);

      const validZipCodes: string[] = response
         .filter((location: Location | null) => location !== null)
         .map((loc: { zip_code: string; }) => loc.zip_code)

      // Update filters state with the valid zip codes 
      // - set zip options as the zipCodes attributes on the filters state
      setFilters({ ...filters, zipCodes: validZipCodes, currentPage: 0 });
   }

   // If input is a city/state, fetch zip codes
   const getZipsFromCityOrStates = async (locations: string[]) => {
      let cities: string[] = [];
      let states: string[] = [];

      locations.forEach((loc) => {
         if (loc.length === 2) {
            states.push(loc.toUpperCase());
         } else {
            cities.push(loc);
         }
      });

      const response = await searchLocations({ city: cities[0], states });
      const zips = response.results.map((loc: LocationObject) => loc.zip_code);

      console.log("zipcodes to pass to search ", zips)

      setFilters({ ...filters, zipCodes: zips.length === 0 ? null : zips, currentPage: 0 })
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
            placeholder="Enter city, zip code, or state"
            className="block w-full h-10 border-2 border-[#890A74] rounded
                           focus:outline-none focus:border-[#FFA900]"
         />
      </div>
   );
};

export default LocationSearch;
