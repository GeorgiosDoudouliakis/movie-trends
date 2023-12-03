<template>
  <div v-if="!loading" class="flex py-12 wrapper">
    <div class="mb-8 img-container person-movie-tvserie-img-container">
      <img v-if="tvSerie.poster_path" class="responsive-img" :src="mapImagePath(185, tvSerie.poster_path)" :alt="tvSerie.name" width="250"/>
      <img v-else class="responsive-img" src="../../assets/no_image_available.jpg" width="185" alt=""/>
    </div>
    <div class="person-movie-tvserie-info">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-2xl">{{ tvSerie.name }}</h2>
        <router-link class="btn-secondary p-2" :to="{ name: 'TvSeries' }">All Tv Series</router-link>
      </div>
      <div class="mb-6">
        <p class="mb-4">First Air Date: {{ mapDate(tvSerie.first_air_date) }}</p>
        <p v-if="tvSerie.last_air_date" class="mb-4">Last Air Date: {{ mapDate(tvSerie.last_air_date) }}</p>
        <ul v-if="tvSerie.genres.length" class="flex mb-4">
          <li v-for="genre in tvSerie.genres" :key="genre.id" class="text-center px-3 py-1 mr-4 bg-card-bg">{{ genre.name }}</li>
        </ul>
        <ul v-if="tvSerie.production_companies.length" class="flex mb-4">
          <li v-for="company in tvSerie.production_companies" :key="company.id" class="text-center px-3 py-1 mr-4 bg-card-bg">{{ company.name }}</li>
        </ul>
        <a v-if="tvSerie.homepage" :href="tvSerie.homepage" class="text-base text-primary underline" target="_blank" rel="noreferrer">View Homepage</a>
      </div>
      <p v-if="tvSerie.overview" class="mb-10">{{ tvSerie.overview }}</p>
    </div>
  </div>

  <div v-else class="flex justify-center items-center loader-container-full-page">
    <BaseLoader/>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { TvSerieDetails} from "@/views/tv-series/interfaces/tv-serie-details.interface";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { useMapImagePath } from "@/composables/useMapImagePath";
  import { useMapDate } from "@/composables/useMapDate";

  const { idName } = defineProps<{ idName: string }>();
  const tvSerie = ref<TvSerieDetails>({} as TvSerieDetails);
  const loading = ref<boolean>(true);

  const { mapImagePath } = useMapImagePath();
  const { mapDate } = useMapDate();

  function getTvSerie(): void {
    fetch(`https://api.themoviedb.org/3/tv/${idName.split("-")[0]}?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US`)
        .then(res => res.json())
        .then((res: TvSerieDetails) => tvSerie.value = { ...res })
        .catch((err) => console.error(err))
        .finally(() => loading.value = false)
  }

  onMounted(() => getTvSerie());
</script>
