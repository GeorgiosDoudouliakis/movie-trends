<template>
  <BaseTopRated items-type="Tv Series" :items="items" :loading="loading" btn-path="tv-series" />
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseTopRated from "@/views/home/components/BaseTopRated.vue";
  import { useTopRated } from "@/views/home/composables/useTopRated";
  import { TopRatedTvSerie, TopRatedTvSeriesResponse } from "@/views/home/interfaces";

  const { items, loading, topRatedItems$ } = useTopRated<TopRatedTvSeriesResponse, TopRatedTvSerie>();

  onMounted(() => {
    topRatedItems$("tv")
        .then((tvSeries: TopRatedTvSerie[]) => {
          tvSeries.forEach((tvSerie: TopRatedTvSerie) => {
            items.value.push({
              id: tvSerie.id,
              title: tvSerie.name,
              description: tvSerie.overview,
              rate: +Number.parseFloat(tvSerie.vote_average.toString()).toFixed(1),
              image: `https://image.tmdb.org/t/p/w185/${tvSerie.poster_path}`,
              releaseDate: tvSerie.first_air_date
            });
          });
        })
        .catch((err) => {
          console.error(err.message);
        })
        .finally(() => loading.value = false)
  });
</script>
