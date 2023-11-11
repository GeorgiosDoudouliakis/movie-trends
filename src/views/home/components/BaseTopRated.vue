<template>
  <div class="w-full px-8 py-12">
    <div class="flex justify-between items-center mb-10">
      <h2 class="text-lg text-secondary">Top Rated {{ itemsType }}</h2>
      <button class="btn-secondary"><router-link :to="btnPath">All {{ itemsType }}</router-link></button>
    </div>

    <template v-if="!loading">
      <carousel :items-to-show="itemsToShow">
        <slide v-for="item in items" :key="item.id">
          <div class="item-container relative">
            <img class="responsive-img" :src="item.image" :alt="item.title + 'poster'" width="185" height="278">
            <div class="absolute left-0 bottom-0 p-3 w-full">
              <h3 class="font-bold text-secondary">{{ item.title }}</h3>
            </div>
            <span class="absolute p-2">{{ item.rate }}</span>
          </div>
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </template>

    <div v-else class="flex justify-center items-center loader-container">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, PropType } from "vue";
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import { TopRatedItemModel } from "@/views/home/interfaces";
  import BaseLoader from "@/components/BaseLoader.vue";

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

  const itemsToShow = ref<number>(1);

  const defineNumberOfItemsToShow = () => {
    if (window.matchMedia("(max-width: 559px)").matches) {
      itemsToShow.value = 1;
    } else if (window.matchMedia("(min-width: 560px) and (max-width: 679px)").matches) {
      itemsToShow.value = 2;
    } else if (window.matchMedia("(min-width: 680px) and (max-width: 999px)").matches) {
      itemsToShow.value = 3;
    } else if (window.matchMedia("(min-width: 1000px) and (max-width: 1279px)").matches) {
      itemsToShow.value = 4;
    } else if (window.matchMedia("(min-width: 1280px) and (max-width: 1439px)").matches) {
      itemsToShow.value = 5;
    } else if (window.matchMedia("(min-width: 1440px) and (max-width: 1699px)").matches) {
      itemsToShow.value = 6;
    } else if (window.matchMedia("(min-width: 1700px) and (max-width: 1899px)").matches) {
      itemsToShow.value = 7;
    } else {
      itemsToShow.value = 8;
    }
  };

  onBeforeMount(() => defineNumberOfItemsToShow());
</script>

<style scoped lang="scss">
  .item-container {
    > img {
      border-radius: 10px;
    }

    > div {
      content: "";
      background-color: rgba(0, 0, 0, .9);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    > span {
      top: 0;
      right: 0;
      color: var(--lighter-black-color);
      background: var(--primary-color);
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }

  .loader-container {
    width: 100%;
    height: 278px;
  }
</style>
