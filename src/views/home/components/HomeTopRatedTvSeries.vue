<template>
  <BaseTopRated items-type="Tv Series" :items="items" :loading="loading" btn-path="tv-series" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "../components/BaseTopRated.vue";
  import { useTopRated } from "../composables/useTopRated";
  import { TopRatedTvSeriesResponse } from "../interfaces";
  import { TvSerie } from "@/interfaces";

  const { items, loading, mappedReleaseDate, topRatedItems$ } = useTopRated<TopRatedTvSeriesResponse, TvSerie>();

  onMounted(() => {
    topRatedItems$("tv")
        .then((tvSeries: TvSerie[]) => {
          tvSeries.forEach((tvSerie: TvSerie) => {
            items.value.push({
              id: tvSerie.id,
              title: tvSerie.name,
              description: tvSerie.overview,
              rate: +Number.parseFloat(tvSerie.vote_average.toString()).toFixed(1),
              image: `https://image.tmdb.org/t/p/w185/${tvSerie.poster_path}`,
              releaseDate: mappedReleaseDate(tvSerie.first_air_date)
            });
          });
        })
        .catch((err) => {
          console.error(err.message);
        })
        .finally(() => loading.value = false)
  });
</script>
