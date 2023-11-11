import { ref } from "vue";
import { BaseTopRatedItem, BaseTopRatedResponse, TopRatedItemModel } from "@/views/home/interfaces";

export function useTopRated<ResponseType extends BaseTopRatedResponse<ItemType>, ItemType extends BaseTopRatedItem>() {
    const loading = ref<boolean>(true);
    const items = ref<TopRatedItemModel[]>([]);

    async function topRatedItems$(type: "movie" | "tv"): Promise<ItemType[]> {
        const req = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1`);
        const res: ResponseType = await req.json();
        return res.results;
    }

    return { items, loading, topRatedItems$ };
}
