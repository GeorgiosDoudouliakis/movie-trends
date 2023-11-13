import { BaseTopRatedResponse } from "@/views/home/interfaces/base-top-rated-response.interface";
import { Movie } from "@/interfaces";

export interface TopRatedMoviesResponse extends BaseTopRatedResponse<Movie> {}
