import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useFiltersStore} from "../store/filtersStore.tsx";

interface MultiSelectProps {
   displayText: string,
   dropdownFor: string,
   optionsList: string[],
   filtersProperty?: string[] | undefined
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({dropdownFor, filtersProperty, displayText, optionsList}
) => {
   const {filters, setFilters} = useFiltersStore();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const buttonRef = useRef<HTMLDivElement>(null);
   const optionsListRef = useRef<HTMLUListElement>(null);

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

   const handleSelectionChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      const option = event.target.value;
      const selectedOptionSet = new Set(filtersProperty);

      if (isChecked) {
         selectedOptionSet.add(option);
      } else {
         selectedOptionSet.delete(option);
      }
      const selectedOptions = Array.from(selectedOptionSet);
      setFilters({...filters, [dropdownFor]: selectedOptions});
   }

   return (
      <div className="w-full">
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
                     {optionsList.map((option) => (
                        <li key={option}>
                           <label
                              className="flex whitespace-nowrap cursor-pointer px-2 py-1 rounded transition-colors
                                       hover:bg-[rgba(137,10,116,0.54)]
                                        [&:has(input:checked)]:bg-[#890A74] [&:has(input:checked)]:text-[#ffa900]
                                        [&:has(input:checked)]:font-medium
                                       w-full overflow-hidden"
                           >
                              <input
                                 type="checkbox"
                                 name={dropdownFor}
                                 value={option}
                                 checked={filtersProperty!.includes(option)}
                                 className="cursor-pointer appearance-none border-2 rounded border-[#890A74]
                                    checked:bg-[#ffa900]"
                                 onChange={handleSelectionChange}
                              />
                              <span className="ml-2 w-full">{option}</span>
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
