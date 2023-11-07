<template>
  <header class="px-8">
    <nav class="flex justify-between items-center">
      <h1 class="text-lg font-semibold tracking-widest">MOVIETRENDS</h1>
      <ul class="flex">
        <li>
          <router-link :to="{ name: 'Home' }" class="text-secondary text-lg px-5 py-4">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Movies' }" class="text-secondary text-lg px-5 py-4">Movies</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'TvSeries' }" class="text-secondary text-lg px-5 py-4">Tv Series</router-link>
        </li>
      </ul>
      <TheHeaderSearch />
    </nav>
  </header>
</template>

<script setup lang="ts">
  import TheHeaderSearch from "@/components/TheHeaderSearch.vue";
</script>

<style scoped lang="scss">
  header {
    border-bottom: 1px solid var(--header-border-color);
  }

  .router-link-exact-active {
    @apply text-primary;
    position: relative;

    &::after {
      position: absolute;
      bottom: 0;
      left: 10px;
      content: "";
      width: calc(100% - 20px);
      height: 1px;
      background: var(--primary-color);
    }
  }
</style>
