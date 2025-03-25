﻿import axios from "axios";
import { Dog, FilterOptions, SearchLocation, SearchResults, User } from "./types.tsx";

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

const MAX_ZIPCODES_PER_REQUEST = 200; // Adjust based on API limits
const MAX_DOG_IDS_PER_REQUEST = 100;  // Limit per getDogs request

export const fetchDogsInBatches = async (dogIds: string[]): Promise<Dog[]> => {
    const dogIdChunks = chunkArray(dogIds, MAX_DOG_IDS_PER_REQUEST);

    const dogResponses = await Promise.all(
        dogIdChunks.map(chunk => getDogs(chunk))
    );

    return dogResponses.flat();
};


//returns an object containing an array of ids to be used with the dogs endpoint
export const search = async ({ breeds, name, zipCodes, minAge, maxAge, currentPage, 
                                sortCriteria, sortOrder }: FilterOptions) => {

    const sort = `${sortCriteria}:${sortOrder}`;
    const page = currentPage * ITEMS_PER_REQUEST;
    console.log("current page for search data= ", currentPage)

    // If zipCodes is too long, split into chunks
    const zipCodeChunks = zipCodes!.length > MAX_ZIPCODES_PER_REQUEST 
                            ? chunkArray(zipCodes!, MAX_ZIPCODES_PER_REQUEST) : [zipCodes];


    // Make API requests for each chunk
    const responses = await Promise.all(zipCodeChunks.map(chunk =>
        dogs_api.get("/dogs/search", {
            params: {
                breeds,
                name,
                zipCodes: chunk,
                ageMin: minAge,
                ageMax: maxAge,
                size: ITEMS_PER_REQUEST, // Pagination per request
                from: page, // Pagination offset
                sort,
            },
        })
    ));
    
    // Combine results from all requests
    const allResults = responses.flatMap(res => res.data.resultIds);
    const total = responses[0]?.data.total || 0;

    console.log("allResults=", allResults)
    console.log("total=", total)
    console.log("allResults length= ", allResults.length)


    return { resultIds: allResults, total };
}

//body should be an array of no more than 100 dog IDs
export const getDogs = async (ids: string[]) => {
    console.log("ids to get=", ids.length)

    const response = await dogs_api.post("/dogs", ids.slice(0, ITEMS_PER_REQUEST));
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
    // const page = currentPage * ITEMS_PER_REQUEST;    
    // console.log("currentPage for location data=",currentPage)

    // console.log("city=", city, "-states=", states);
    const response = await dogs_api.post("/locations/search", {
        city,
        states,
        size: 10000,
        // from: page,
    });
    return response.data;
}

export const matchMe = async (dogsIds: string[]) => {
    const response = await dogs_api.post("/dogs/match", dogsIds);
    return response.data;
}


//helper 
const chunkArray = (array: string[], chunkSize: number) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
}

