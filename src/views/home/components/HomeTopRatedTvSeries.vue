<template>
  <BaseTopRated items-type="Tv Series" :items="items" :loading="loading" btn-path-name="Top rated tv series" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "./base/BaseTopRated.vue";
  import { useTopRated } from "../composables/useTopRated";
  import { TopRatedItemModel,TopRatedTvSeriesResponse } from "../interfaces";
  import { TvSerie } from "@/interfaces";
  import { useMapReleaseDate } from "@/composables/useMapReleaseDate";
  import { useMapPosterPath } from "@/composables/useMapPosterPath";

  const { items, loading, getTopRatedItems } = useTopRated<TopRatedTvSeriesResponse, TvSerie>();
  const { mapReleaseDate } = useMapReleaseDate();
  const { mapPosterPath } = useMapPosterPath();

  function itemMapper(item: TvSerie): TopRatedItemModel {
    return {
      id: item.id,
      title: item.name,
      description: item.overview,
      rate: +Number.parseFloat(item.vote_average.toString()).toFixed(1),
      image: mapPosterPath(185, item.poster_path),
      releaseDate: mapReleaseDate(item.first_air_date)
    }
  }

  onMounted(() => getTopRatedItems("tv", itemMapper));
</script>
