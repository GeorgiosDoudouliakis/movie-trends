<template>
  <div class="relative shrink-0 cursor-pointer item-container">
    <span class="vote">{{ item.rate }}</span>
    <div class="img-container">
      <img class="responsive-img" :src="item.image" :alt="item.title + 'poster'" width="185" height="278">
    </div>
    <div class="p-2">
      <h3 class="font-bold text-base mb-1">{{ item.title }}</h3>
      <span>{{ item.releaseDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TopRatedItemModel } from "../../interfaces";

  defineProps<{ item: TopRatedItemModel }>();
</script>

<style scoped lang="scss">
  .item-container {
    width: 185px;
    height: 100%;

    > .img-container {
      height: 278px;
    }
  }
</style>
