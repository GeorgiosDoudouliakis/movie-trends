<template>
  <BaseTopRated items-type="Movies" :items="items" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "@/views/home/components/BaseTopRated.vue";
  import { useTopRated } from "@/views/home/composables/useTopRated";
  import { TopRatedMovie, TopRatedMoviesResponse } from "@/views/home/interfaces";

  const { items, loading, topRatedItems$ } = useTopRated<TopRatedMoviesResponse, TopRatedMovie>();

  onMounted(() => {
    topRatedItems$("movie")
        .then((movies: TopRatedMovie[]) => {
          movies.forEach((movie: TopRatedMovie) => {
            items.value.push({
              id: movie.id,
              title: movie.title,
              rate: +Number.parseFloat(movie.vote_average.toString()).toFixed(1),
              image: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
            })
          })
        })
        .catch((err) => {
          console.error(err.message);
        })
        .finally(() => loading.value = false)
  });
</script>
