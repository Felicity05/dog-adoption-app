import {FilterOptions, SortCriteria} from "../api/types.tsx";
import React from "react";
import {capitalize} from "../utils.tsx";

const SortOptions = (props: { filters: FilterOptions,
   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}) => {
   return (
      <div className="flex flex-col gap-2 pt-2 w-full">
      <h2 className="block mb-2 text-xl font-bold text-gray-700">
         Sort
      </h2>
      <div className="flex gap-2 w-full">
         <select
            id="sortCriteria"
            name="sortCriteria"
            value={props.filters.sortCriteria}
            onChange={props.onChange}
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
            value={props.filters.sortOrder}
            onChange={props.onChange}
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
