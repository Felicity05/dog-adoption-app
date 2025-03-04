interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

interface Location {
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
    name?: string;
    minAge?: number | null;
    maxAge?: number | null;
    sortOrder: "asc" | "desc";
    sortCriteria: SortCriteria;
    size?: number;
    from?: number;
    zipCodes?: string[];
}

export type { Dog, Location, Coordinates, SearchResults, User, FilterOptions };
