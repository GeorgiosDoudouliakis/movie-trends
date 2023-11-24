import { onMounted, onUnmounted, readonly, Ref, ref } from "vue";
import { BaseResponse } from "@/interfaces";

export function useInfiniteScroll<ResponseType, ItemType extends { id: number; name: string; }>
    (url: string, itemsMapper: (items: ItemType[]) => ItemType[], params?: { [key: string]: string }) {
    const items = ref<ItemType[]>([]) as Ref<ItemType[]>;
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const loading = ref<boolean>(true);
    const isOnLoadMore = ref<boolean>(false);

    function requestUrl(page: number): string {
        let request = `${url}&page=${page}`;

        if(params) {    
            Object.keys(params).forEach(param => {
                request += `&${param}=${params[param]}`;
            });
        }

        return request;
    }

    function getItems(page: number) {
        fetch(requestUrl(page))
            .then(response => response.json())
            .then((response: BaseResponse<ResponseType>) => {
                const mappedResults = itemsMapper(response.results as unknown as ItemType[]);
                items.value = [...items.value, ...mappedResults] as ItemType[];
                currentPage.value = response.page;
                totalPages.value = response.total_pages;
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
            isOnLoadMore.value = true;
            getItems(currentPage.value + 1);
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', () => fetchOnScroll());
        getItems(1);
    });

    onUnmounted(() => window.removeEventListener('scroll', fetchOnScroll))

    return {
        items,
        loading: readonly(loading),
        isOnLoadMore: readonly(isOnLoadMore)
    };
}
