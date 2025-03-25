import axios from "axios";
import { FilterOptions, SearchLocation, SearchResults, User } from "./types.tsx";

const BASE_URL = "https://frontend-take-home-service.fetch.com";
export const ITEMS_PER_REQUEST = 27;

const dogs_api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const authenticate = async (user: User) => {
    const response = await dogs_api.post("/auth/login",
        {
            name: user.name,
            email: user.email,
        },
    );

    return response;
};

export const logOut = async () => {
    const response = await dogs_api.post("/auth/logout");
    return response;
}

//returns an object containing an array of ids to be used with the dogs endpoint
export const search = async ({ breeds, name, zipCodes, minAge, maxAge, currentPage, 
                                sortCriteria, sortOrder }: FilterOptions): Promise<SearchResults> => {

    const sort = `${sortCriteria}:${sortOrder}`;
    const page = currentPage * ITEMS_PER_REQUEST;
    console.log("current page for search data= ", currentPage)

    const response = await dogs_api.get("/dogs/search", {
        params: {
            breeds,
            name,
            zipCodes,
            ageMin: minAge,
            ageMax: maxAge,
            size: ITEMS_PER_REQUEST,
            from: page,
            sort,
        },
    });

    return response.data;
}

//body should be an array of no more than 100 dog IDs
export const getDogs = async (ids: string[]) => {
    const response = await dogs_api.post("/dogs", ids);
    return response.data;
}

//the response is a string array of breeds
export const getDogsBreeds = async () => {
    const response = await dogs_api.get("/dogs/breeds");
    return response.data;
}

//returns an array of location objects and accepts a list of max 100 zip codes
export const getLocationsFromZipCode = async (zipCodes: string[]) => {
    // console.log(zipCodes);
    const response = await dogs_api.post("/locations", zipCodes);
    return response.data;
}


export const searchLocations = async (searchLocation: SearchLocation, currentPage: number) => {
    const city = searchLocation.city ? searchLocation.city : null;
    const states = (searchLocation.states !== undefined && searchLocation.states.length > 0)
        ? searchLocation.states : null;
    const page = currentPage * ITEMS_PER_REQUEST;    
    console.log("currentPage for location data=",currentPage)

    // console.log("city=", city, "-states=", states);
    const response = await dogs_api.post("/locations/search", {
        city,
        states,
        size: ITEMS_PER_REQUEST,
        from: page,
    });
    return response.data;
}

export const matchMe = async (dogsIds: string[]) => {
    const response = await dogs_api.post("/dogs/match", dogsIds);
    return response.data;
}
