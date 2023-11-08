import { BaseTopRatedItem } from "@/views/home/interfaces/base-top-rated-item.interface";
import { BaseTopRatedResponse } from "@/views/home/interfaces/base-top-rated-response.interface";

export interface TopRatedTvSerie extends BaseTopRatedItem {
    first_air_date: string;
    name: string;
    origin_country: string[];
    original_name: string;
}

export interface TopRatedTvSeriesResponse extends BaseTopRatedResponse<TopRatedTvSerie> {}
