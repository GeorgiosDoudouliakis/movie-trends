<template>
  <div v-if="!loading" class="flex py-12 wrapper">
    <div class="mb-8 img-container person-movie-tvserie-img-container">
      <img v-if="movie.poster_path" class="responsive-img" :src="mapImagePath(185, movie.poster_path)" :alt="movie.title" width="250"/>
      <img v-else class="responsive-img" src="../../assets/no_image_available.jpg" width="185" alt=""/>
    </div>
    <div class="person-movie-tvserie-info">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-2xl">{{ movie.title }}</h2>
        <router-link class="btn-secondary p-2" :to="{ name: 'Movies' }">All Movies</router-link>
      </div>
      <div class="mb-6">
        <p class="mb-4">Release Date: {{ mapDate(movie.release_date) }}</p>
        <ul v-if="movie.genres.length" class="flex mb-4">
          <li v-for="genre in movie.genres" :key="genre.id" class="px-3 py-1 mr-4 bg-card-bg">{{ genre.name }}</li>
        </ul>
        <ul v-if="movie.production_companies.length" class="flex mb-4">
          <li v-for="company in movie.production_companies" :key="company.id" class="px-3 py-1 mr-4 bg-card-bg">{{ company.name }}</li>
        </ul>
        <a v-if="movie.homepage" :href="movie.homepage" class="text-base text-primary underline" target="_blank" rel="noreferrer">View Homepage</a>
      </div>
      <p v-if="movie.overview" class="mb-10">{{ movie.overview }}</p>
    </div>
  </div>

  <div v-else class="flex justify-center items-center loader-container-full-page">
    <BaseLoader/>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { MovieDetails } from "@/views/movies/interfaces/movie-details.interface";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { useMapImagePath } from "@/composables/useMapImagePath";
  import { useMapDate } from "@/composables/useMapDate";

  const { idName } = defineProps<{ idName: string }>();
  const movie = ref<MovieDetails>({} as MovieDetails);
  const loading = ref<boolean>(true);

  const { mapImagePath } = useMapImagePath();
  const { mapDate } = useMapDate();

  function getMovie(): void {
    fetch(`https://api.themoviedb.org/3/movie/${idName.split("-")[0]}?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US`)
        .then(res => res.json())
        .then((res: MovieDetails) => movie.value = { ...res })
        .catch((err) => console.error(err))
        .finally(() => loading.value = false)
  }

  onMounted(() => getMovie());
</script>
