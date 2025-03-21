import { getDogs, ITEMS_PER_REQUEST, search } from "../api/api.tsx";
import { useEffect, useState } from "react";
import Card from "../Components/Card.tsx";
import { Dog } from "../api/types.tsx";
import Filters from "../Components/Filters.tsx";
import Pagination from "../Components/Pagination.tsx";
import { useFiltersStore } from "../store/filtersStore.tsx";
import NoSearchMatch from "../Components/NoSearchMatch.tsx";
import Loading from "../Components/Loading.tsx";
import MagentaButton from "../Components/MagentaButton.tsx";
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {
   const [dogs, setDogs] = useState<Dog[]>([]);
   const [totalItems, setTotalItems] = useState<number>(0);
   const { filters, setFilters } = useFiltersStore();
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchDogs = async () => {
         try {
            const response = await search({ ...filters });
            const ids = response.resultIds;
            const totalItems = response.total;

            if (ids.length > 0) {
               const dogsData = await getDogs(ids);
               setDogs(dogsData);
            } else {
               setDogs([]);
            }
            setTotalItems(totalItems);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching dogs:", error);
         }
      };

      fetchDogs();
   }, [filters])

   //Handle page change
   const currentPageHandler = (selectedPage: number) => {
      if (selectedPage >= 0 && selectedPage <= totalItems / ITEMS_PER_REQUEST) {
         setFilters({ ...filters, currentPage: selectedPage })
      }
   }

   return (
      <div className="flex flex-col justify-center items-center w-full p-4">
         {/* Header Section */}
         <div className="flex flex-col gap-2 justify-center items-center text-[#090325] my-3 text-center">
            <h1 className="font-bold font-['Laurens'] text-3xl md:text-5xl">
               Find Your Newest Friend!
            </h1>
            <h2 className="text-lg md:text-2xl">
               Save your favorites and meet your perfect match!
            </h2>
         </div>

         {/* Search and Match Section */}
         <div className="flex flex-col md:flex-row gap-4 p-4 justify-center items-center w-full max-w-7xl">
            {/* <SearchBar onSearch={() => { }} /> */}
            <MagentaButton label={"View Favorites"} onClick={() => navigate("/account")} />
         </div>

         {/* Filters and Dogs Section */}
         <div className="flex flex-col md:flex-row gap-4 mt-5 justify-center items-start w-full max-w-7xl">

            {/* Filters */}
            <div className="w-full md:w-1/3">
               <Filters />
            </div>

            {/* Dogs Collection and Pagination */}
            <div className="w-full">
               {loading ? (
                  <Loading />
               ) : dogs.length > 0 ? (
                  <div className="flex flex-col gap-2 justify-center items-center w-full">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dogs.map((dog) => (
                           <Card key={dog.id} dog={dog} />
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
