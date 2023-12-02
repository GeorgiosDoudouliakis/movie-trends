<template>
  <BaseTopRated items-type="Tv Series" :items="items" :loading="loading" btn-path-name="Top rated tv series" />
</template>

<script setup lang="ts">
  import BaseTopRated from "./base/BaseTopRated.vue";
  import { useTopRated } from "../composables/useTopRated";
  import { TopRatedItemModel,TopRatedTvSeriesResponse } from "../interfaces";
  import { TvSerie } from "@/interfaces";

  const { items, loading, mapDate, mapImagePath, mapVoteAverage } = useTopRated<TopRatedTvSeriesResponse, TvSerie>("https://api.themoviedb.org/3/tv/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1", itemMapper);

  function itemMapper(item: TvSerie): TopRatedItemModel {
    return {
      id: item.id,
      title: item.name,
      description: item.overview,
      rate: +mapVoteAverage(item.vote_average),
      image: mapImagePath(185, item.poster_path),
      releaseDate: mapDate(item.first_air_date)
    }
  }
</script>
