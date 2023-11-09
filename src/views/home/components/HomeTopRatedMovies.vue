<template>
  <BaseTopRated items-type="Movies" :items="items" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "@/views/home/components/BaseTopRated.vue";
  import { useTopRated } from "@/views/home/composables/useTopRated";

  const { items, fetchTopRatedMovies } = useTopRated();

  onMounted(() => fetchTopRatedMovies("movie"));
</script>
