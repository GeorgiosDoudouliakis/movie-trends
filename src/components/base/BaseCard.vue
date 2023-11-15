<template>
  <div class="mb-6 cursor-pointer card-container">
    <div class="img-container">
      <img class="responsive-img" :src="image.src" :alt="image.alt">
    </div>
    <div class="flex flex-col items-center px-2 py-4">
      <h3>{{ name }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue";

  defineProps({
    image: {
      type: Object as PropType<{ src: string; alt: string }>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  })
</script>

<style scoped lang="scss">
  .card-container {
    width: 185px;
    background: var(--card-bg);
    border-radius: 16px;
    transition: transform .5s;

    &:hover {
      transform: rotate(-3deg);
    }

    > .img-container {
      width: 185px;
      height: 278px;

      > img {
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }
    }
  }
</style>
