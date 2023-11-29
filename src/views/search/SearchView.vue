<template>
  <div class="flex items-center p-2 search-input">
    <input class="p-2" type="text" placeholder="Search" v-model="searchTerm" @input="updateQueryParams">
    <button class="p-2 ml-4 btn-primary" :class="{ 'btn-disabled': !searchTerm }" :disabled="!searchTerm" @click="search()">Search</button>
  </div>
  <div class="py-12 wrapper">
    <template v-if="!loading">
      <template v-for="item in items" :key="item?.id">
        <BaseCard v-if="item?.media_type == MediaType.MOVIE" :name="item?.title" :image="{ src: item?.poster_path, alt: item?.title, width: 100 }" direction="horizontal">
          <span v-if="item?.release_date" class="italic mb-2">{{ mapDate(item?.release_date) }}</span>
          <p v-if="item?.overview" class="text-fade">{{ item?.overview }}</p>
        </BaseCard>
        <BaseCard v-if="item?.media_type == MediaType.TV" :name="item?.name" :image="{ src: item?.poster_path, alt: item?.name, width: 100 }" direction="horizontal">
          <p v-if="item?.overview" class="text-fade">{{ item?.overview }}</p>
        </BaseCard>
        <BaseCard v-if="item?.media_type == MediaType.PERSON" :name="item?.name" :image="{ src: item?.profile_path, alt: item?.name, width: 100 }" direction="horizontal">
          <span class="italic">{{ item?.known_for_department }}</span>
        </BaseCard>
      </template>
    </template>
    <p v-if="msg" class="text-center">{{ msg }}</p>
    <div v-if="loading || isOnLoadMore" class="flex justify-center">
      <BaseLoader/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { onMounted, ref } from "vue";
  import { BaseResponse } from "@/interfaces";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import BaseCard from "@/components/base/BaseCard.vue";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";
  import { useDecodingUtilities } from "@/composables/useDecodingUtilities";
  import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
  import { useMapDate } from "@/composables/useMapDate";
  import { MediaType } from "./enums/media-type.enum";

  const searchTerm = ref<string>("");
  const route = useRoute();
  const router = useRouter();

  const { encodeQueryParams } = useEncodingUtilities();
  const { decodeQueryParams } = useDecodingUtilities();
  const { mapDate } = useMapDate();
  const { items, msg, loading, isOnLoadMore, getItems, initializeState } = useInfiniteScroll<BaseResponse<any>, any>('https://api.themoviedb.org/3/search/multi?api_key=803a77b2748b6f5d6363b4fa92bfd870');

  function initializeSearchTerm(): void {
    searchTerm.value = route.query.term ? decodeQueryParams(route.query.term as string) : "";
  }
  
  function updateQueryParams(): void {
    router.replace({ name: 'Search', query: { term: encodeQueryParams(searchTerm.value) } });
  }

  function search(): void {
    initializeState();
    getItems({ query: searchTerm.value });
  }
  
  onMounted(() => {
    initializeSearchTerm();
    if(searchTerm.value) search();
  });
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
