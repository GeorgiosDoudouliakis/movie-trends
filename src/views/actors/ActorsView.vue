<template>
  <div class="py-12 wrapper">
    <h2 class="text-2xl text-center py-4 mb-10 bg-card-bg">ACTORS</h2>
    <template v-if="!loading">
      <div class="flex flex-wrap justify-center gap-6">
        <BaseCard v-for="actor in items" :key="actor.id" :name="actor.original_name"
          :image="{ src: actor.profile_path, alt: actor.original_name, width: 185 }" direction="vertical"
          @click="goToActor(actor)">
        </BaseCard>
      </div>
    </template>
    <div v-if="loading || isOnLoadMore" class="flex justify-center items-center">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { People } from "@/views/actors/interfaces/people-response.interface";
  import BaseCard from "@/components/base/BaseCard.vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { Person } from "@/interfaces";
  import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
  import router from "@/router";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";
  import { onMounted } from "vue";

  const { encodeIdNameParam } = useEncodingUtilities();
  const { items, loading, isOnLoadMore, getItems } = useInfiniteScroll<People, Person>('https://api.themoviedb.org/3/person/popular?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US');

  function goToActor(actor: Person): void {
    router.push({ name: 'Actor', params: { idName: encodeIdNameParam(actor.id, actor.name) }});
  }

  onMounted(() => getItems())
</script>
