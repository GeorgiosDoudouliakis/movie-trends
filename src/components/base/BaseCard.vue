<template>
  <div class="flex mb-6 cursor-pointer card-container"
    :class="{ 'flex-col': direction === 'vertical', 'flex-row': direction === 'horizontal' }"
    :style="{ width: direction === 'vertical' ? image.width + 'px' : '100%' }">
      <div class="img-container shrink-0" :style="{ width: image.width + 'px' }">
        <img class="responsive-img" :src="image.src" :alt="image.alt">
      </div>
      <div class="flex flex-col p-4 grow-0 card-content" :class="{ 'ml-4': direction === 'horizontal' }">
        <h3 class="text-lg" :class="{ 'text-center': direction === 'vertical' }">{{ name }}</h3>
        <slot></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    image: { src: string; alt: string, width?: number },
    name: string,
    direction: "vertical" | "horizontal"
  }>();
</script>

<style scoped lang="scss">
  .card-container {
    background: var(--card-bg);
    transition: box-shadow .5s;

    &:hover {
      box-shadow: 0 0 10px 5px var(--border-color);
    }
  }

  .card-content > *:not(:last-child) {
    margin-bottom: 15px;
  }
</style>
