import { ref } from "vue";
import { TopRatedItemModel } from "../interfaces";
import { BaseItem, BaseResponse } from "@/interfaces";

export function useTopRated<ResponseType extends BaseResponse<ItemType>, ItemType extends BaseItem>() {
    const loading = ref<boolean>(true);
    const items = ref<TopRatedItemModel[]>([]);

    async function topRatedItems$(type: "movie" | "tv"): Promise<ItemType[]> {
        const req = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1`);
        const res: ResponseType = await req.json();
        return res.results;
    }

    return { items, loading, topRatedItems$ };
}
