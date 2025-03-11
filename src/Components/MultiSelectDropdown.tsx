import { FilterOptions } from "../api/types.tsx";
import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

interface MultiSelectProps {
   filters: FilterOptions;
   onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
   breeds: string[];
   optionsListRef: RefObject<HTMLUListElement | null>;
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({ filters, onFilterChange, breeds, optionsListRef }) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const buttonRef = useRef<HTMLDivElement>(null);
   const selectedCount = filters.breeds?.length || 0;
   const displayText = selectedCount > 0 ? `${selectedCount} breeds selected` : "Select breeds";

   // Close dropdown when clicking outside
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
         ) {
            setIsDropdownOpen(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div className="w-full">
         <label className="block w-full pl-2 mb-2 text-lg font-medium text-gray-700" htmlFor="breeds">
            Breeds
         </label>

         <div ref={buttonRef} className="relative">
            <div
               onClick={() => setIsDropdownOpen((prev) => !prev)}
               className="cursor-pointer after:content-['▼'] after:text-md after:font-bold after:ml-1
                     flex justify-between w-full px-3 py-1.5
                     border-2 border-[#890A74] rounded
                     after:inline-flex after:items-center transition-transform"
            >
               {displayText}
            </div>

            {/*Dropdown select options*/}
            {isDropdownOpen && (
               <div
                  ref={dropdownRef}
                  className="absolute bg-white border-2 z-50 border-[#890A74] rounded w-[320px] px-2 py-1.5
                          h-[350px] overflow-y-scroll shadow-lg"
               >
                  <ul ref={optionsListRef}>
                     {breeds.map((breed) => (
                        <li key={breed}>
                           <label
                              className="flex whitespace-nowrap cursor-pointer px-2 py-1 rounded transition-colors
                                       hover:bg-[rgba(137,10,116,0.54)]
                                        [&:has(input:checked)]:bg-[#890A74] [&:has(input:checked)]:text-[#ffa900]
                                        [&:has(input:checked)]:font-medium
                                       w-full overflow-hidden"
                           >
                              <input
                                 type="checkbox"
                                 name="breeds"
                                 value={breed}
                                 checked={filters.breeds?.includes(breed)}
                                 className="cursor-pointer appearance-none border-2 rounded border-[#890A74]
                                    checked:bg-[#ffa900]"
                                 onChange={onFilterChange}
                              />
                              <span className="ml-2 w-full">{breed}</span>
                           </label>
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};

export default MultiSelectDropdown;
