<template>
  <template v-if="!loading">
    <div class="flex flex-wrap justify-center gap-6">
      <template v-for="item in items" :key="item.id">
        <BaseCard :name="item.name" :image="{ src: item.poster_path, alt: item.name, width: 185 }" direction="vertical">
          <span class="italic text-center mb-2">{{ mapDate(item.first_air_date) }}</span>
          <span class="font-bold text-center">{{ item.vote_count }} {{ item.vote_count === 1 ? 'vote' : 'votes' }}</span>
          <span class="text-center vote">{{ Number.parseFloat(item.vote_average.toString()).toFixed(1) }}</span>
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

  defineProps<{
    items: TvSerie[],
    loading: boolean,
    isOnLoadMore: boolean
  }>()

  const { mapDate } = useMapDate();
</script>
