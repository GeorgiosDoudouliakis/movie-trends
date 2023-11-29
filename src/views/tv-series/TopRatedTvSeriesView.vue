<template>
  <BaseTvSeriesList :items="items" :loading="loading" :is-on-load-more="isOnLoadMore"/>
</template>

<script setup lang="ts">
  import { onBeforeMount } from "vue";
  import { useTvSeriesList } from "@/views/tv-series/composables/useTvSeriesList";
  import { TvSeriesType } from "@/views/tv-series/enums/tv-series-type.enum";
  import BaseTvSeriesList from "@/views/tv-series/components/BaseTvSeriesList.vue";

  const { items, loading, isOnLoadMore, type } = useTvSeriesList();

  onBeforeMount(() => type(TvSeriesType.TOP_RATED));
</script>
