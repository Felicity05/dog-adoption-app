import {search, getDogs} from "../api/api.tsx";
import {SetStateAction, useEffect, useState} from "react";
import MagentaButton from "../Components/MagentaButton.tsx";
import SearchBar from "../Components/SearchBar.tsx";
import Card from "../Components/Card.tsx";
import {Dog, FilterOptions} from "../api/types.tsx";
import Filters from "../Components/Filters.tsx";
import Pagination from "../Components/Pagination.tsx";


export const LandingPage = () => {
   const [dogs, setDogs] = useState<Dog[]>([]);
   const [currentPage, setCurrentPage] = useState<number>(0);
   const [totalItems, setTotalItems] = useState<number>(0);

   const currentPageHandler = (selectedPage: SetStateAction<number>) => {
      console.log("selected page: ", selectedPage);
      const page = typeof selectedPage === 'number' ? selectedPage : currentPage;
      if (page >= 0 && page <= totalItems / 25 && page !== currentPage) {
         setCurrentPage(selectedPage)
      }
   }

    useEffect(() => {
       console.log("current page: ", currentPage)
        search({sortCriteria: "breed", sortOrder: "asc", from: currentPage * 25} as FilterOptions
            ).then(response => {
               const ids = response.resultIds;
               const totalItems = response.total;
               // console.log(response)

               getDogs(ids).then(r => {
                  setDogs(r);
                  setTotalItems(totalItems);
                  // console.log(r)
               }
            ).catch(e => console.log(e))
        });
    }, [currentPage])

    return(
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-2 justify-center items-center text-[#090325] my-3">
                <h1 className="font-bold font-['Laurens']">Find Your Newest Friend!</h1>
                <h2>Save your favorites and meet your perfect match!</h2>
            </div>
            <div className="flex columns-3 gap-2 justify-center items-center">
               <SearchBar onSearch={() =>{} }/>
               <MagentaButton label='Match Me!' buttonType='primary' disabled={false}
                           key='1'
                           onClick={()=> console.log('clicked')} />
            </div>
           <div className="flex gap-2 justify-center items-start">
              <Filters onFilterChange={() => {}} />
              {/*dogs collection and pagination*/}
              <div className="flex flex-col gap-2 justify-center items-center">
                 <div className="flex flex-wrap justify-evenly items-center gap-3 mb-10 ">
                    {dogs.map(dog => <Card key={dog.id}
                       picture={dog.img}
                       name={dog.name}
                       age={dog.age}
                       breed={dog.breed}
                       location={dog.zip_code}
                    />)}
                 </div>
                  <Pagination currentPage={currentPage} totalItems={totalItems}
                              onPageChange={currentPageHandler}/>
              </div>
           </div>
        </div>
    )
}
