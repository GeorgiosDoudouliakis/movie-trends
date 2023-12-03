<template>
  <template v-if="!loading">
    <div class="flex flex-wrap justify-center gap-6">
      <template v-for="movie in items" :key="movie.id">
        <BaseCard :name="movie.title" :image="{ src: movie.poster_path, alt: movie.title, width: 185 }" direction="vertical" @click="goToMovie(movie)">
          <span class="italic text-center mb-2">{{ mapDate(movie.release_date) }}</span>
          <span v-if="movie.vote_count" class="font-bold text-center">votes: {{ movie.vote_count }}</span>
          <span v-if="!movie.vote_count" class="font-bold text-center">No votes yet</span>
          <span v-if="movie.vote_average" class="text-center vote">{{ mapVoteAverage(movie.vote_average) }}</span>
        </BaseCard>
      </template>
    </div>
  </template>

  <div v-if="loading || isOnLoadMore" class="flex justify-center">
    <BaseLoader/>
  </div>
</template>

<script setup lang="ts">
  import { Movie } from "@/interfaces";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import BaseCard from "@/components/base/BaseCard.vue";
  import { useMapDate } from "@/composables/useMapDate";
  import { useMapVoteAverage } from "@/composables/useMapVoteAverage";
  import router from "@/router";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";

  defineProps<{
    items: Movie[],
    loading: boolean,
    isOnLoadMore: boolean
  }>()

  const { mapDate } = useMapDate();
  const { mapVoteAverage } = useMapVoteAverage();
  const { encodeIdNameParam } = useEncodingUtilities();

  function goToMovie(movie: Movie): void {
    router.push({ name: 'Movie', params: { idName: encodeIdNameParam(movie.id, movie.title)} })
  }
</script>
