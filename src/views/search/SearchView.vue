<template>
  <div class="flex items-center p-2 search-input">
    <input class="p-2" type="text" placeholder="Search" v-model="searchTerm" @input="updateQueryParams">
    <button class="p-2 ml-4 btn-primary">Search</button>
  </div>
  <div class="py-12 wrapper">
    <template v-if="searchTerm">
      <template v-if="!loading">

      </template>
      <div v-else>
        <BaseLoader/>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { onMounted, ref } from "vue";
  import decodeQueryParams from "@/helpers/decodeQueryParams.helper";
  import encodeQueryParams from "@/helpers/encodeQueryParams.helper";
  import { BaseResponse } from "@/interfaces";
  import BaseLoader from "@/components/base/BaseLoader.vue";

  const route = useRoute();
  const router = useRouter();
  const searchTerm = ref<string>("");
  const loading = ref<boolean>(false);
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(1);

  function initializeSearchTerm(): void {
    searchTerm.value = route.query.term ? decodeQueryParams(route.query.term as string) : "";
  }

  function updateQueryParams(): void {
    router.replace({ name: 'Search', query: { term: encodeQueryParams(searchTerm.value) } });
  }

  function getSearchedItems(page: number): void {
    loading.value = true;

    fetch(`https://api.themoviedb.org/3/search/multi?api_key=803a77b2748b6f5d6363b4fa92bfd870&query=${searchTerm.value}
    &language=en-US&page=${page}`)
      .then(response => response.json())
      .then((response: BaseResponse<any>) => {
        console.log(response);
        currentPage.value = response.page;
        totalPages.value = response.total_pages;
      })
      .catch((err) => console.error(err))
      .finally(() => loading.value = false)
  }

  onMounted(() => initializeSearchTerm());
</script>

<style scoped lang="scss">
  .search-input {
    width: 90%;
    max-width: 1280px;
    margin: auto;
    background: lighten(#0f1219, 10%);

    input {
      width: 100%;
      color: var(--secondary-color);
      background: lighten(#0f1219, 10%);
      border: 1px solid var(--border-color);
      outline: none;

      &:focus {
        border-color: var(--primary-color);
      }
    }
  }
</style>
