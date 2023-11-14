import { Movie, TvSerie } from "@/interfaces";

export type PersonKnownFor = (Movie | TvSerie) & { type: "movie" | "tv" };

export interface Person {
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

export interface People {
    page: number;
    results: Person[];
    total_pages: number;
    total_results: number;
}
