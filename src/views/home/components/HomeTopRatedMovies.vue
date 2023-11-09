<template>
  <BaseTopRated items-type="Movies" :items="items" />
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { CarouselItemModel, TopRatedMovie, TopRatedMoviesResponse } from "@/views/home/interfaces";
  import BaseTopRated from "@/views/home/components/BaseTopRated.vue";

  let loading = ref<boolean>(true);
  let items = ref<CarouselItemModel[]>([]);

  const fetchTopRatedMovies = async () => {
    try {
      const req = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=803a77b2748b6f5d6363b4fa92bfd870&page=1`);
      const res: TopRatedMoviesResponse = await req.json();
      const data: TopRatedMovie[] = res.results;

      data.forEach((item: TopRatedMovie) => {
        return items.value.push({
          id: item.id,
          title: item.title,
          rate: +Number.parseFloat(item.vote_average.toString()).toFixed(1),
          image: `https://image.tmdb.org/t/p/w185/${item.poster_path}`
        });
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => fetchTopRatedMovies());
</script>
