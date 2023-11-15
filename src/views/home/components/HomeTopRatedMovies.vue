<template>
  <BaseTopRated items-type="Movies" :items="items" :loading="loading" btn-path="movies" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "./base/BaseTopRated.vue";
  import { useTopRated } from "../composables/useTopRated";
  import { TopRatedMoviesResponse } from "../interfaces";
  import { Movie } from "@/interfaces";

  const { items, loading, mappedReleaseDate, topRatedItems$ } = useTopRated<TopRatedMoviesResponse, Movie>();

  onMounted(() => {
    topRatedItems$("movie")
        .then((movies: Movie[]) => {
          movies.forEach((movie: Movie) => {
            items.value.push({
              id: movie.id,
              title: movie.title,
              description: movie.overview,
              rate: +Number.parseFloat(movie.vote_average.toString()).toFixed(1),
              image: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
              releaseDate: mappedReleaseDate(movie.release_date)
            })
          })
        })
        .catch((err) => {
          console.error(err.message);
        })
        .finally(() => loading.value = false)
  });
</script>
