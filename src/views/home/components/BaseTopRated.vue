<template>
  <div class="w-full p-8">
    <h2 class="text-2xl mb-8 text-secondary">Top Rated {{ itemsType }}</h2>

    <carousel :items-to-show="1">
      <slide v-for="item in items" :key="item.id">
        <div class="item-container relative">
          <img class="responsive-img" :src="item.image" :alt="item.title + 'poster'">
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
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue";
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import { CarouselItemModel } from "@/views/home/interfaces";

  defineProps({
    itemsType: {
      type: String as PropType<"Movies" | "Tv Series">,
      required: true
    },
    items: {
      type: Array as PropType<CarouselItemModel[]>,
      required: true
    }
  });
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
</style>
