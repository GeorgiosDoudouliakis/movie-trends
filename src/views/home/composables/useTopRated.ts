import { ref } from "vue";
import { BaseTopRatedResponse, TopRatedItemModel } from "../interfaces";
import { BaseItem } from "@/interfaces";

export function useTopRated<ResponseType extends BaseTopRatedResponse<ItemType>, ItemType extends BaseItem>() {
    const loading = ref<boolean>(true);
    const items = ref<TopRatedItemModel[]>([]);

    const months: { [key: string]: string } = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };

    async function topRatedItems$(type: "movie" | "tv"): Promise<ItemType[]> {
        const req = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1`);
        const res: ResponseType = await req.json();
        return res.results;
    }

    function mappedReleaseDate(date: string): string {
        const dateArr: string[] = date.split("-");
        return dateArr[2] + " " + months[`${dateArr[1]}`] + " " + dateArr[0];
    }

    return { items, loading, mappedReleaseDate, topRatedItems$ };
}
