import { readonly, ref } from "vue";
import { TopRatedItemModel } from "../interfaces";
import { BaseItem, BaseResponse } from "@/interfaces";

export function useTopRated<ResponseType extends BaseResponse<ItemType>, ItemType extends BaseItem>() {
    const loading = ref<boolean>(true);
    const items = ref<TopRatedItemModel[]>([]);

    function getTopRatedItems(type: "movie" | "tv", itemMapper: (item: ItemType) => TopRatedItemModel) {
        fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1`)
            .then((res) => res.json())
            .then((res: ResponseType) => items.value = (res.results as ItemType[]).map((item: ItemType) => itemMapper(item)))
            .catch((err) => console.error(err))
            .finally(() => loading.value = false)
    }

    return { items, loading: readonly(loading), getTopRatedItems };
}
