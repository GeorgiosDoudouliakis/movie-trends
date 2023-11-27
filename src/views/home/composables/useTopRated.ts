import { onMounted, readonly, ref } from "vue";
import { TopRatedItemModel } from "../interfaces";
import { BaseItem, BaseResponse } from "@/interfaces";
import { useMapReleaseDate } from "@/composables/useMapReleaseDate";
import { useMapPosterPath } from "@/composables/useMapPosterPath";

export function useTopRated<ResponseType extends BaseResponse<ItemType>, ItemType extends BaseItem>(url: string, itemMapper: (item: ItemType) => TopRatedItemModel) {
    const loading = ref<boolean>(true);
    const items = ref<TopRatedItemModel[]>([]);

    const { mapReleaseDate } = useMapReleaseDate();
    const { mapPosterPath } = useMapPosterPath();

    function getTopRatedItems() {
        fetch(url)
            .then((res) => res.json())
            .then((res: ResponseType) => items.value = (res.results as ItemType[]).map((item: ItemType) => itemMapper(item)))
            .catch((err) => console.error(err))
            .finally(() => loading.value = false)
    }

    onMounted(() => getTopRatedItems());

    return { items: readonly(items), loading: readonly(loading), mapReleaseDate, mapPosterPath };
}
