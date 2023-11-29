import { onMounted, Ref, ref } from "vue";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
import { BaseResponse, TvSerie } from "@/interfaces";
import { TvSeriesType } from "@/views/tv-series/enums/tv-series-type.enum";

export function useTvSeriesList() {
    const _type = ref(TvSeriesType.AIRING_TODAY) as Ref<TvSeriesType>;

    const { items, loading, isOnLoadMore, getItems } = useInfiniteScroll<BaseResponse<TvSerie>, TvSerie>(`https://api.themoviedb.org/3/tv/${_type.value}?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US`);

    function type(value: TvSeriesType): void {
        _type.value = value;
    }

    onMounted(() => getItems())

    return { items, loading, isOnLoadMore, type };
}
