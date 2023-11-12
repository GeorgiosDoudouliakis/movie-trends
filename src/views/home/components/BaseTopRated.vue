<template>
  <div class="py-12 wrapper">
    <div class="flex justify-between items-center mb-10">
      <h2 class="text-lg text-secondary">Top Rated {{ itemsType }}</h2>
      <button class="btn-secondary"><router-link :to="btnPath">Show All</router-link></button>
    </div>

    <template v-if="!loading">
      <div class="flex gap-x-6 justify-between items-center overflow-x-auto w-full top-rated-items-container">
        <BaseTopRatedItem v-for="item in items" :key="item.id" :item="item" />
      </div>
    </template>

    <div v-else class="flex justify-center items-center loader-container">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue";
  import { TopRatedItemModel } from "@/views/home/interfaces";
  import BaseLoader from "@/components/BaseLoader.vue";
  import BaseTopRatedItem from "@/views/home/components/BaseTopRatedItem.vue";

  defineProps({
    itemsType: {
      type: String as PropType<"Movies" | "Tv Series">,
      required: true
    },
    items: {
      type: Array as PropType<TopRatedItemModel[]>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    btnPath: {
      type: String as PropType<"movies" | "tv-series">,
      required: true
    }
  });
</script>

<style scoped lang="scss">
  .top-rated-items-container {
    height: 300px;

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
    height: 278px;
  }
</style>
