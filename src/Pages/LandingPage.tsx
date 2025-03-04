import {search, getDogs} from "../api/api.tsx";
import {useEffect, useState} from "react";
import MagentaButton from "../Components/MagentaButton.tsx";
import SearchBar from "../Components/SearchBar.tsx";
import Card from "../Components/Card.tsx";
import {Dog, FilterOptions} from "../api/types.tsx";
import Filters from "../Components/Filters.tsx";


export const LandingPage = () => {
   const [dogs, setDogs] = useState<Dog[]>([]);

    useEffect(() => {
        search({sortCriteria: "breed", sortOrder: "asc"} as FilterOptions).then(response => {
            const ids = response.resultIds;
            console.log(ids)
            getDogs(ids).then(r => {
                  setDogs(r);
                  console.log(r)
               }
            ).catch(e => console.log(e))
        });
    },[])

    return(
        <div>
            <div className="flex flex-col gap-2 justify-center items-center text-[#090325] my-3">
                <h1 className="font-bold font-['Laurens']">Find Your Newest Friend!</h1>
                <h2>Save your favorites and meet your perfect match!</h2>
            </div>
            <div className="flex gap-2 justify-center items-center">
               <SearchBar onSearch={() =>{} }/>
               <MagentaButton label='Match Me!' buttonType='primary' disabled={false}
                           key='1'
                           onClick={()=> console.log('clicked')} />
            </div>
           <div className="flex gap-2 justify-center items-start">
           <Filters onFilterChange={() => {}}/>
              <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
                 {dogs.map(dog => <Card key={dog.id}
                    picture={dog.img}
                    name={dog.name}
                    age={dog.age}
                    breed={dog.breed}
                    location={dog.zip_code}
                 />)}
              </div>
           </div>
        </div>
    )
}
