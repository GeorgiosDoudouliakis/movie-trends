<template>
  <BaseMoviesList :items="items" :loading="loading" :is-on-load-more="isOnLoadMore"/>
</template>

<script setup lang="ts">
  import BaseMoviesList from "@/views/movies/components/BaseMoviesList.vue";
  import { useMoviesList } from "@/views/movies/composables/useMoviesList";
  import { onBeforeMount } from "vue";
  import { MoviesType } from "@/views/movies/enums/movies-type.enum";

  const { items, loading, isOnLoadMore, type } = useMoviesList();

  onBeforeMount(() => type(MoviesType.NOW_PLAYING));
</script>
