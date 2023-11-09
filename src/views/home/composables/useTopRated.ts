import { ref } from "vue";
import { CarouselItemModel, TopRatedTvSerie, TopRatedTvSeriesResponse } from "@/views/home/interfaces";

export function useTopRated() {
    const loading = ref<boolean>(true);
    const items = ref<CarouselItemModel[]>([]);

    const fetchTopRatedMovies = async (type: "movie" | "tv") => {
        try {
            const req = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1`);
            const res: TopRatedTvSeriesResponse = await req.json();
            const data: TopRatedTvSerie[] = res.results;

            data.forEach((item: TopRatedTvSerie) => {
                items.value.push({
                    id: item.id,
                    title: item.name,
                    rate: +Number.parseFloat(item.vote_average.toString()).toFixed(1),
                    image: `https://image.tmdb.org/t/p/w185/${item.poster_path}`
                });
            });
        } catch (err: any) {
            console.error(err.message);
        } finally {
            loading.value = false;
        }
    };

    return { items, fetchTopRatedMovies };
}
