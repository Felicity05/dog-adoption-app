import axios from "axios";
import { Dog, FilterOptions, SearchLocation, User } from "./types.tsx";

const BASE_URL = "https://frontend-take-home-service.fetch.com";
export const ITEMS_PER_REQUEST = 27;
const MAX_ZIPCODES_PER_REQUEST = 200; // Adjust based on API limits
const MAX_DOG_IDS_PER_REQUEST = 100;  // Limit per getDogs request

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

export const fetchDogsInBatches = async (dogIds: string[]): Promise<Dog[]> => {
    const dogIdChunks = chunkArray(dogIds, MAX_DOG_IDS_PER_REQUEST);

    const dogResponses = await Promise.all(
        dogIdChunks.map(chunk => getDogs(chunk))
    );

    return dogResponses.flat();
};

let totalItems = 0;
let totalItemsPerChunk: number[] = [];
//returns an object containing an array of ids to be used with the dogs endpoint
export const search = async ({ breeds, name, zipCodes, minAge, maxAge, currentPage,
    sortCriteria, sortOrder }: FilterOptions) => {

    const sort = `${sortCriteria}:${sortOrder}`;

    // If zipCodes is too long, split into chunks
    const zipCodeChunks = (zipCodes!.length > MAX_ZIPCODES_PER_REQUEST) ?
        chunkArray(zipCodes!, MAX_ZIPCODES_PER_REQUEST) : [zipCodes];

    let allResults = [];
    let currentChunkIndex = 0;

    if (currentPage == 0) {
        // Make API requests for each chunk in parallel
        const responses = await Promise.all(zipCodeChunks.map(chunk =>
            dogs_api.get("/dogs/search", {
                params: {
                    breeds,
                    name,
                    zipCodes: chunk,
                    ageMin: minAge,
                    ageMax: maxAge,
                    size: ITEMS_PER_REQUEST, // Pagination per request
                    from: 0, // Pagination offset
                    sort,
                },
            })
        ));

        // Combine results from all requests
        allResults = responses.flatMap(res => res.data.resultIds);
        totalItemsPerChunk = responses.flatMap(res => res.data.total);
        totalItems = responses.reduce((accumulatedSum, res) => accumulatedSum + res.data.total, 0);
    }

    // When moving to subsequent pages 
    // Determine which chunk to use based on currentPage
    let accumulatedPages = 0;
    for (let i = 0; i < totalItemsPerChunk.length; i++) {
        let pagesInChunk = Math.ceil(totalItemsPerChunk[i] / ITEMS_PER_REQUEST);
        if (currentPage < accumulatedPages + pagesInChunk) {
            currentChunkIndex = i;
            break;
        }
        accumulatedPages += pagesInChunk;
    }

    // Calculate the correct page offset inside the chunk
    const chunkPage = currentPage - accumulatedPages;
    const pageOffset = chunkPage * ITEMS_PER_REQUEST;

    console.log(`Fetching chunk ${currentChunkIndex}, page ${chunkPage}, total items ${totalItems},
         items per chunk ${totalItemsPerChunk}`);

    // Fetch data from the correct chunk
    const responses = await dogs_api.get("/dogs/search", {
        params: {
            breeds,
            name,
            zipCodes: zipCodeChunks[currentChunkIndex],
            ageMin: minAge,
            ageMax: maxAge,
            size: ITEMS_PER_REQUEST, // Pagination per request
            from: pageOffset, // Pagination offset
            sort,
        },
    })

    allResults = responses.data.resultIds;

    return { resultIds: allResults, total: totalItems };
}

//body should be an array of no more than 100 dog IDs
export const getDogs = async (ids: string[]) => {
    // console.log("ids to get=", ids.length)

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
    const response = await dogs_api.post("/locations", zipCodes);
    return response.data;
}


export const searchLocations = async (searchLocation: SearchLocation) => {
    const city = searchLocation.city ? searchLocation.city : null;
    const states = (searchLocation.states !== undefined && searchLocation.states.length > 0)
        ? searchLocation.states : null;

    const response = await dogs_api.post("/locations/search", {
        city,
        states,
        size: 10000,
    });
    return response.data;
}

export const matchMe = async (dogsIds: string[]) => {
    const response = await dogs_api.post("/dogs/match", dogsIds);
    return response.data;
}


//helper function to chunk zipCodes array
const chunkArray = (array: string[], chunkSize: number) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
}

