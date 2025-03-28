interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

interface LocationObject {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

interface Coordinates {
    lat: number;
    lon: number;
}

interface SearchResults {
    resultIds: string[];
    total: number;
    next: string | null;
    prev: string | null;
}

type User = {
    name: string;
    email: string;
}

export enum SortCriteria {
    Breed = "breed",
    Name = "name",
    Age = "age"
}

interface FilterOptions {
    breeds?: string[];
    zipCodes?: string[] | null;
    name?: string;
    location?: string,
    minAge?: number | null;
    maxAge?: number | null;
    size?: number;
    from?: number;
    sortOrder: "asc" | "desc";
    sortCriteria: SortCriteria;
    currentPage: number; 
}

interface SearchLocation {
    city?: string,
    states?: string[],
    geoBoundingBox?: {
        top?: number,
        left?: number,
        bottom?: number,
        right?: number,
        bottom_left?: Coordinates,
        top_left?: Coordinates
    },
    size?: number,
    from?: number
}

export type { Dog, LocationObject, Coordinates, SearchResults, User, FilterOptions, SearchLocation };
