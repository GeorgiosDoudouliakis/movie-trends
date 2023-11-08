import { BaseTopRatedItem } from "@/views/home/interfaces/base-top-rated-item.interface";
import { BaseTopRatedResponse } from "@/views/home/interfaces/base-top-rated-response.interface";

export interface TopRatedMovie extends BaseTopRatedItem {
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
}

export interface TopRatedMoviesResponse extends BaseTopRatedResponse<TopRatedMovie> {}
