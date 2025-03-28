import { getDogs, getLocationsFromZipCode, ITEMS_PER_REQUEST, search } from "../api/api.tsx";
import { useEffect, useState } from "react";
import Card from "../Components/Card.tsx";
import { Dog, LocationObject } from "../api/types.tsx";
import Filters from "../Components/Filters.tsx";
import Pagination from "../Components/Pagination.tsx";
import { useFiltersStore } from "../store/filtersStore.tsx";
import NoSearchMatch from "../Components/NoSearchMatch.tsx";
import Loading from "../Components/Loading.tsx";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

export const DogSearchPage = () => {
   const navigate = useNavigate();
   const [dogs, setDogs] = useState<Dog[]>([]);
   const [totalItems, setTotalItems] = useState<number>(0);
   const [locationMap, setLocationMap] = useState<Map<string, LocationObject>>(new Map());
   const { filters, setFilters, isLoading, setLoading } = useFiltersStore();

   const [debouncedFilters] = useDebounce(filters, 500); // Debounce filters 

   useEffect(() => {
      setLoading(true); // Set loading to true as soon as filters change

      const fetchDogs = async () => {
         try {
            if (debouncedFilters.zipCodes === null) {
               setLoading(false);
               return;
            }

            const response = await search({ ...debouncedFilters });
            const ids = response.resultIds.slice(0, ITEMS_PER_REQUEST); // Ensure only 27 items per page

            const totalItems = response.total;
            setTotalItems(totalItems);

            if (ids.length > 0) {
               const dogsData = await getDogs(ids);
               const zips = dogsData.map((dog: Dog) => dog.zip_code);
               const locs = await getLocationsFromZipCode(zips)

               const newLocationMap: Map<string, LocationObject> = new Map(
                  locs
                     .filter((loc: LocationObject | null) => loc !== null) // Filters out nulls
                     .map((loc: LocationObject) => [loc.zip_code, loc])
               );

               setLocationMap(newLocationMap);
               setDogs(dogsData);
            } else {
               setDogs([]);
            }
         } catch (error: any) {
            if (error.status === 401) navigate("/");
            console.error("Error fetching dogs:", error);
         } finally {
            setLoading(false); // Ensure loading is always reset
         }
      };

      fetchDogs();
   }, [debouncedFilters])

   //Handle page change
   const currentPageHandler = (selectedPage: number) => {
      if (selectedPage >= 0 && selectedPage <= Math.ceil(totalItems / ITEMS_PER_REQUEST)) {
         setFilters({ ...filters, currentPage: selectedPage })
      }
   }

   return (
      <div className="flex flex-col justify-center items-center w-full p-4">
         {/* Header Section */}
         <div className="flex flex-col gap-2 justify-center items-center text-[#300d38] my-3 text-center">
            <h1 className="font-bold font-['Laurens'] text-3xl md:text-5xl">
               Find Your Newest Friend!
            </h1>
            <h2 className="text-lg md:text-2xl pb-7">
               Save your favorites and meet your perfect match!
            </h2>
         </div>

         {/* Filters and Dogs Section */}
         <div className="flex flex-col md:flex-row gap-4 mt-5 mb-10 justify-center items-start w-full max-w-7xl">

            {/* Filters */}
            <div className="w-full md:w-1/3 sticky top-17 z-30">
               <Filters />
            </div>

            {/* Dogs Collection and Pagination */}
            <div className="w-full">
               {isLoading ? (
                  <Loading />
               ) : dogs.length > 0 ? (
                  <div className="flex flex-col gap-2 justify-center items-center w-full">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dogs.map((dog) => (
                           <Card key={dog.id} dog={dog} location={locationMap.get(dog.zip_code)} />
                        ))}
                     </div>
                     {totalItems > ITEMS_PER_REQUEST && (
                        <Pagination
                           currentPage={filters.currentPage}
                           totalItems={totalItems}
                           onPageChange={currentPageHandler}
                        />
                     )}
                  </div>
               ) : (
                  <NoSearchMatch />
               )}
            </div>
         </div>
      </div>
   )
}
