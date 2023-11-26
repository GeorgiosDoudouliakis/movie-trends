import { onMounted, onUnmounted, readonly, Ref, ref } from "vue";
import { BaseResponse } from "@/interfaces";

export function useInfiniteScroll<ResponseType, ItemType extends { id: number; name: string; }>(url: string) {
    const fetchUrl = ref<string>("");
    const items = ref<ItemType[]>([]) as Ref<ItemType[]>;
    const msg = ref<string>("");
    const extraParams = ref<{ [key: string]: any } | null>(null);
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const loading = ref<boolean>(false);
    const isOnLoadMore = ref<boolean>(false);

    function constructedRequestUrl() { 
        fetchUrl.value = `${url}&page=${currentPage.value}`;

        if(extraParams.value) {
            Object.keys(extraParams.value).forEach(param => {
                fetchUrl.value += `&${param}=${(extraParams.value as { [key: string]: any })[param]}`;
            });
        }

        return fetchUrl.value;
    }

    function getItems(params?: { [key: string]: any }) {
        loading.value = !isOnLoadMore.value;

        if(params) extraParams.value = { ...params };

        fetch(constructedRequestUrl())
            .then(response => response.json())
            .then((response: BaseResponse<ResponseType>) => {
                items.value = [...items.value, ...response.results] as unknown as ItemType[];
                totalPages.value = response.total_pages;

                if(!items.value.length) msg.value = "No data found";
            })
            .catch(err => console.error(err))
            .finally(() => {
                loading.value = false;
                if (isOnLoadMore) isOnLoadMore.value = false;
            });
    }

    function fetchOnScroll(): void {
        if (
            document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight &&
            currentPage.value + 1 <= totalPages.value) {
                fetchUrl.value = "";
                isOnLoadMore.value = true;
                currentPage.value = currentPage.value + 1;
                getItems({ ...extraParams.value });
        }
    }

    function initializeState(): void {
        fetchUrl.value = '';
        items.value = [];
        currentPage.value = 1;
        totalPages.value = 1;
        loading.value = true;
        isOnLoadMore.value = false;
    }

    onMounted(() => window.addEventListener('scroll', () => fetchOnScroll()));

    onUnmounted(() => {
        window.removeEventListener('scroll', fetchOnScroll);
        initializeState();
    })

    return {
        items,
        msg: readonly(msg),
        loading: readonly(loading),
        isOnLoadMore: readonly(isOnLoadMore),
        getItems,
        initializeState
    };
}
