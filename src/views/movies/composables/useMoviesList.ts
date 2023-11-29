import { onMounted, Ref, ref } from "vue";
import { MoviesType } from "@/views/movies/enums/movies-type.enum";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
import { BaseResponse, Movie } from "@/interfaces";

export function useMoviesList() {
    const _type = ref(MoviesType.NOW_PLAYING) as Ref<MoviesType>;

    const { items, loading, isOnLoadMore, getItems } = useInfiniteScroll<BaseResponse<Movie>, Movie>(`https://api.themoviedb.org/3/movie/${_type.value}?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US`);

    function type(value: MoviesType): void {
        _type.value = value;
    }

    onMounted(() => getItems())

    return { items, loading, isOnLoadMore, type };
}
