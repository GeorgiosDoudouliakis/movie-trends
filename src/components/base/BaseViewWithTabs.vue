<template>
  <div class="py-12 wrapper">
    <h2 class="text-center text-2xl py-4 bg-card-bg">
      {{ route.name.toString().toUpperCase() }}
    </h2>
    <div class="flex w-full mb-10">
      <router-link v-for="tab in tabs" :key="tab.id" :to="{ name: tab.name }" class="inline-flex justify-center items-center text-center py-4 text-secondary bg-card-bg">{{ tab.id }}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { Tab } from '@/interfaces';

  const route = useRoute();

  defineProps<{ tabs: Tab[] }>()
</script>

<style scoped lang="scss">
  h2 {
    border-bottom: 1px solid var(--border-color);
  }

  a {
    width: calc(100%/4);
  }

  .router-link-exact-active {
    @apply text-primary;
    border-bottom: 2px solid var(--primary-color);
  }
</style>
