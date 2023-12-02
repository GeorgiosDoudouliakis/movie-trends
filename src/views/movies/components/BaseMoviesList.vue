<template>
  <template v-if="!loading">
    <div class="flex flex-wrap justify-center gap-6">
      <template v-for="item in items" :key="item.id">
        <BaseCard :name="item.title" :image="{ src: item.poster_path, alt: item.title, width: 185 }" direction="vertical">
          <span class="italic text-center mb-2">{{ mapDate(item.release_date) }}</span>
          <span class="font-bold text-center">{{ item.vote_count }} {{ item.vote_count === 1 ? 'vote' : 'votes' }}</span>
          <span class="text-center vote">{{ mapVoteAverage(item.vote_average) }}</span>
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

  defineProps<{
    items: Movie[],
    loading: boolean,
    isOnLoadMore: boolean
  }>()

  const { mapDate } = useMapDate();
  const { mapVoteAverage } = useMapVoteAverage();
</script>
