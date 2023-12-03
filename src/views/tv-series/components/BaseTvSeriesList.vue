<template>
  <template v-if="!loading">
    <div class="flex flex-wrap justify-center gap-6">
      <template v-for="tvSerie in items" :key="tvSerie.id">
        <BaseCard :name="tvSerie.name" :image="{ src: tvSerie.poster_path, alt: tvSerie.name, width: 185 }" direction="vertical" @click="goToTvSerie(tvSerie)">
          <span class="italic text-center mb-2">{{ mapDate(tvSerie.first_air_date) }}</span>
          <span v-if="tvSerie.vote_count" class="font-bold text-center">votes: {{ tvSerie.vote_count }}</span>
          <span v-if="!tvSerie.vote_count" class="font-bold text-center">No votes yet</span>
          <span v-if="tvSerie.vote_average" class="text-center vote">{{ mapVoteAverage(tvSerie.vote_average) }}</span>
        </BaseCard>
      </template>
    </div>
  </template>

  <div v-if="loading || isOnLoadMore" class="flex justify-center">
    <BaseLoader/>
  </div>
</template>

<script setup lang="ts">
  import { TvSerie } from "@/interfaces";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import BaseCard from "@/components/base/BaseCard.vue";
  import { useMapDate } from "@/composables/useMapDate";
  import { useMapVoteAverage } from "@/composables/useMapVoteAverage";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";
  import router from "@/router";

  defineProps<{
    items: TvSerie[],
    loading: boolean,
    isOnLoadMore: boolean
  }>()

  const { mapDate } = useMapDate();
  const { mapVoteAverage } = useMapVoteAverage();
  const { encodeIdNameParam } = useEncodingUtilities();

  function goToTvSerie(tvSerie: TvSerie): void {
    router.push({ name: 'TvSerie', params: { idName: encodeIdNameParam(tvSerie.id, tvSerie.name)} })
  }
</script>
