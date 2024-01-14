<template>
  <BaseTvSeriesList :items="items" :loading="loading" :is-on-load-more="isOnLoadMore"/>
</template>

<script setup lang="ts">
  import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
  import { BaseResponse, TvSerie } from "@/interfaces";
  import { onMounted } from "vue";
  import BaseTvSeriesList from "./components/BaseTvSeriesList.vue";

  const { items, loading, isOnLoadMore, getItems } = useInfiniteScroll<BaseResponse<TvSerie>, TvSerie>('https://api.themoviedb.org/3/tv/on_the_air?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US');

  onMounted(() => getItems())
</script>
