import { useMapDate } from "@/composables/useMapDate";
import { useMapImagePath } from "@/composables/useMapImagePath";
import { useMapVoteAverage } from "@/composables/useMapVoteAverage";
import { BaseItem, BaseResponse } from "@/interfaces";
import { onMounted, readonly, ref } from "vue";
import { TopRatedItemModel } from "../interfaces";

export function useTopRated<ResponseType extends BaseResponse<ItemType>, ItemType extends BaseItem>(url: string, itemMapper: (item: ItemType) => TopRatedItemModel) {
    const loading = ref<boolean>(true);
    const items = ref<TopRatedItemModel[]>([]);

    const { mapDate } = useMapDate();
    const { mapImagePath } = useMapImagePath();
    const { mapVoteAverage } = useMapVoteAverage();

    function getTopRatedItems() {
        fetch(url)
            .then((res) => res.json())
            .then((res: ResponseType) => items.value = (res.results as ItemType[]).map((item: ItemType) => itemMapper(item)))
            .catch((err) => console.error(err))
            .finally(() => loading.value = false)
    }

    onMounted(() => getTopRatedItems());

    return { items, loading: readonly(loading), mapDate, mapImagePath, mapVoteAverage };
}
