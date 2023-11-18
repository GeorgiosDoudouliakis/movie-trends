export interface PersonDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface Person {
    adult: boolean;
    gender: number;
    id: number;
    known_for: any[];
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface People {
    page: number;
    results: Person[];
    total_pages: number;
    total_results: number;
}
