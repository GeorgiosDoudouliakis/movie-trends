<template>
  <div class="flex py-12 wrapper">
    <div class="flex flex-col justify-center">
      <router-link v-for="tab in tabs" :key="tab.id" :to="{ name: tab.name }" class="text-lg text-center p-4 text-secondary bg-card-bg">{{ tab.id }}</router-link>
    </div>
    <div class="ml-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { Tab } from '@/interfaces';

    defineProps<{ tabs: Tab[] }>()
</script>

<style scoped lang="scss">
    a:not(:last-of-type) {
        margin-bottom: 10px;
    }

    .router-link-exact-active {
      @apply text-primary;
      border-left: 4px solid var(--primary-color);
    }
</style>
