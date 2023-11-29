import { onMounted, onUnmounted, readonly, Ref, ref } from "vue";
import { BaseResponse } from "@/interfaces";

export function useInfiniteScroll<ResponseType, ItemType>(url: string) {
    const items = ref<ItemType[]>([]) as Ref<ItemType[]>;
    const msg = ref<string>("");
    const loading = ref<boolean>(false);
    const isOnLoadMore = ref<boolean>(false);
    const _extraParams = ref<{ [key: string]: any } | null>(null);
    const _currentPage = ref<number>(1);
    const _totalPages = ref<number>(1);
    const _fetchUrl = ref<string>("");

    function constructedRequestUrl() { 
        _fetchUrl.value = `${url}&page=${_currentPage.value}`;

        if(_extraParams.value) {
            Object.keys(_extraParams.value).forEach(param => {
                _fetchUrl.value += `&${param}=${(_extraParams.value as { [key: string]: any })[param]}`;
            });
        }

        return _fetchUrl.value;
    }

    function getItems(params?: { [key: string]: any }) {
        loading.value = !isOnLoadMore.value;
        msg.value = "";

        if(params) _extraParams.value = { ...params };

        fetch(constructedRequestUrl())
            .then(response => response.json())
            .then((response: BaseResponse<ResponseType>) => {
                items.value = [...items.value, ...response.results] as unknown as ItemType[];
                _totalPages.value = response.total_pages;

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
            _currentPage.value + 1 <= _totalPages.value) {
                _fetchUrl.value = "";
                isOnLoadMore.value = true;
                _currentPage.value = _currentPage.value + 1;
                getItems({ ..._extraParams.value });
        }
    }

    function initializeState(): void {
        _fetchUrl.value = '';
        items.value = [];
        _currentPage.value = 1;
        _totalPages.value = 1;
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
