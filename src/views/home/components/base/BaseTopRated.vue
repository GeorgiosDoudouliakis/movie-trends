<template>
  <div class="py-12 wrapper">
    <div class="flex justify-between items-center mb-10">
      <h2 class="text-lg text-secondary">Top Rated {{ itemsType }}</h2>
      <button class="btn-secondary"><router-link :to="{ name: btnPathName }">Show All</router-link></button>
    </div>

    <template v-if="!loading">
      <div class="flex gap-x-6 justify-between overflow-x-auto w-full top-rated-items-container">
        <BaseTopRatedItem v-for="item in items" :key="item.id" :item="item" @click="goToItem(item)" />
      </div>
    </template>

    <div v-else class="flex justify-center items-center loader-container">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TopRatedItemModel } from "../../interfaces";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import BaseTopRatedItem from "./BaseTopRatedItem.vue";
  import router from "@/router";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";

  const { encodeIdNameParam } = useEncodingUtilities();

  const { itemsType } = defineProps<{
    itemsType: "Movies" | "Tv Series",
    items: TopRatedItemModel[],
    loading: boolean,
    btnPathName: "Top rated movies" | "Top rated tv series"
  }>();

  function goToItem(item: TopRatedItemModel): void {
    if(itemsType === 'Movies') router.push({ name: 'Movie', params: { idName: encodeIdNameParam(item.id, item.title) } });
    else router.push({ name: 'TvSerie', params: { idName: encodeIdNameParam(item.id, item.title) } });
  }
</script>

<style scoped lang="scss">
  .top-rated-items-container {
    height: 410px;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: var(--secondary-color);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
    }
  }

  .loader-container {
    width: 100%;
    height: 420px;
  }
</style>
