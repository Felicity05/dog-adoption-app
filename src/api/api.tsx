import axios from "axios";
import {FilterOptions, SearchResults, User} from "./types.tsx";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

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

//returns an object containing an array of ids to be used with the dogs endpoint
export const search = async ({breeds, name, zipCodes, minAge, maxAge,
                                 size, from, sortCriteria, sortOrder}: FilterOptions): Promise<SearchResults> => {

    const sort = `${sortCriteria}:${sortOrder}`;

    const response = await dogs_api.get("/dogs/search", {
        params: {
            breeds,
            name,
            zipCodes,
            ageMin: minAge,
            ageMax: maxAge,
            size,
            from,
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


//after log in make request to search then to post dogs with the ids to show 25 dogs
//subsequents requets perfomed by the user
