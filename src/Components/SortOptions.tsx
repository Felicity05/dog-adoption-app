import {SortCriteria} from "../api/types.tsx";
import React from "react";
import {capitalize} from "../utils.tsx";
import {useFiltersStore} from "../store/filtersStore.tsx";

const SortOptions = () => {
   const { filters, setFilters, } = useFiltersStore();

   const handleOptionsChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const {name, value} = e.target;
      setFilters({ ...filters, [name]: value, currentPage: 0 });
   };


   return (
      <div className="flex flex-col gap-2 pt-2 w-full">
      <h2 className="block mb-2 text-xl font-bold text-gray-700">
         Sort
      </h2>
      <div className="flex gap-2 w-full">
         <select
            id="sortCriteria"
            name="sortCriteria"
            value={filters.sortCriteria}
            onChange={handleOptionsChange}
            className="block w-full py-2 px-2 border-2 border-[#890A74] rounded
                              focus:outline-none focus:border-[#FFA900]"
         >
            {Object.values(SortCriteria).map(criteria => (
               <option key={criteria} value={criteria}>{capitalize(criteria)}</option>
            )
         )}
         </select>
         <select
            id="sortOrder"
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleOptionsChange}
            className="block w-full py-2 px-2 border-2 border-[#890A74] rounded
                              focus:outline-none focus:border-[#FFA900] overflow-ellipsis"
         >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
         </select>
      </div>
   </div>
   )
}

export default SortOptions;
