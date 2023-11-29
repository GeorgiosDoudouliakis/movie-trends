<template>
  <template v-if="!loading">
    <div class="flex flex-wrap justify-center gap-6">
      <template v-for="item in items" :key="item.id">
        <BaseCard :name="item.name" :image="{ src: item.poster_path, alt: item.name, width: 185 }" direction="vertical">
          <span class="text-center">{{ mapReleaseDate(item.first_air_date) }}</span>
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
  import { useMapReleaseDate } from "@/composables/useMapReleaseDate";

  defineProps<{
    items: TvSerie[],
    loading: boolean,
    isOnLoadMore: boolean
  }>()

  const { mapReleaseDate } = useMapReleaseDate();
</script>
