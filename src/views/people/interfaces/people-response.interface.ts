import { Movie, TvSerie } from "@/interfaces";

export type PersonKnownFor = (Movie | TvSerie) & { type: "movie" | "tv" };

export interface PersonResponseInterface {
    adult: false;
    gender: number;
    id: number;
    known_for: PersonKnownFor[];
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface PeopleResponseInterface {
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
}
