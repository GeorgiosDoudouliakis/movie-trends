<template>
  <BaseMoviesList :items="items" :loading="loading" :is-on-load-more="isOnLoadMore"/>
</template>

<script setup lang="ts">
  import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
  import { BaseResponse, Movie } from "@/interfaces";
  import { onMounted } from "vue";
  import BaseMoviesList from "@/views/movies/components/BaseMoviesList.vue";

  const { items, loading, isOnLoadMore, getItems } = useInfiniteScroll<BaseResponse<Movie>, Movie>('https://api.themoviedb.org/3/movie/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US');

  onMounted(() => getItems())
</script>
