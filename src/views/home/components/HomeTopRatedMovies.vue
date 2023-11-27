<template>
  <BaseTopRated items-type="Movies" :items="items" :loading="loading" btn-path-name="Top rated movies" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "./base/BaseTopRated.vue";
  import { useTopRated } from "../composables/useTopRated";
  import { TopRatedItemModel, TopRatedMoviesResponse } from "../interfaces";
  import { Movie } from "@/interfaces";
  import { useMapReleaseDate } from "@/composables/useMapReleaseDate";
  import { useMapPosterPath } from "@/composables/useMapPosterPath";

  const { items, loading, getTopRatedItems } = useTopRated<TopRatedMoviesResponse, Movie>();
  const { mapReleaseDate } = useMapReleaseDate();
  const { mapPosterPath } = useMapPosterPath();

  function itemMapper(item: Movie): TopRatedItemModel {
    return {
      id: item.id,
      title: item.title,
      description: item.overview,
      rate: +Number.parseFloat(item.vote_average.toString()).toFixed(1),
      image: mapPosterPath(185, item.poster_path),
      releaseDate: mapReleaseDate(item.release_date)
    }
  }

  onMounted(() => getTopRatedItems("movie", itemMapper));
</script>
