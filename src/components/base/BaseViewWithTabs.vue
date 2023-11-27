<template>
  <div class="py-12 wrapper">
    <h2 class="text-2xl mb-10">{{ route.name }}</h2>
    <div class="flex justify-between content">
      <div class="flex flex-col justify-center">
        <router-link v-for="tab in tabs" :key="tab.id" :to="{ name: tab.name }" class="text-center py-4 text-secondary bg-card-bg">{{ tab.id }}</router-link>
      </div>
      <div class="ml-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { Tab } from '@/interfaces';

  const route = useRoute();

  defineProps<{ tabs: Tab[] }>()
</script>

<style scoped lang="scss">
  .content {
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
