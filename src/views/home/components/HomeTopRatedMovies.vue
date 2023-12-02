<template>
  <BaseTopRated items-type="Movies" :items="items" :loading="loading" btn-path-name="Top rated movies" />
</template>

<script setup lang="ts">
  import BaseTopRated from "./base/BaseTopRated.vue";
  import { useTopRated } from "../composables/useTopRated";
  import { TopRatedItemModel, TopRatedMoviesResponse } from "../interfaces";
  import { Movie } from "@/interfaces";

  const { items, loading, mapDate, mapImagePath, mapVoteAverage } = useTopRated<TopRatedMoviesResponse, Movie>("https://api.themoviedb.org/3/movie/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1", itemMapper);

  function itemMapper(item: Movie): TopRatedItemModel {
    return {
      id: item.id,
      title: item.title,
      description: item.overview,
      rate: +mapVoteAverage(item.vote_average),
      image: mapImagePath(185, item.poster_path),
      releaseDate: mapDate(item.release_date)
    }
  }
</script>
