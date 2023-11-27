<template>
  <div class="flex justify-between py-12 wrapper">
    <div class="flex flex-col justify-center">
      <router-link v-for="tab in tabs" :key="tab.id" :to="{ name: tab.name }" class="text-lg text-center py-4 text-secondary bg-card-bg">{{ tab.id }}</router-link>
    </div>
    <div class="ml-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Tab } from '@/interfaces';

  defineProps<{ tabs: Tab[] }>()
</script>

<style scoped lang="scss">
  .wrapper {
    > div {
      &:first-of-type {
        width: 180px;

        a:not(:last-of-type) {
          margin-bottom: 10px;
        }

        .router-link-exact-active {
          @apply text-primary;
          border-left: 4px solid var(--primary-color);
        }
      }

      &:last-of-type {
        width: calc(100vh - 180px);
      }
    }
  }
</style>
