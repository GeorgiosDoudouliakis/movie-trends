<template>
  <div class="py-12 wrapper">
    <h2 class="text-2xl text-center mb-10">Popular People</h2>
    <template v-if="!loading">
      <div class="flex flex-wrap justify-center gap-6">
        <BaseCard v-for="person in items" :key="person.id" :name="person.original_name"
          :image="{ src: person.profile_path, alt: person.original_name, width: 185 }" direction="vertical"
          @click="goToPerson(person)">
        </BaseCard>
      </div>
    </template>
    <div v-if="loading || isOnLoadMore" class="flex justify-center items-center pt-4">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { People } from "@/views/people/interfaces/people-response.interface";
  import BaseCard from "@/components/base/BaseCard.vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { Person } from "@/interfaces";
  import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
  import router from "@/router";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";

  const { encodeIdNameParam } = useEncodingUtilities();
  const { items, loading, isOnLoadMore } = useInfiniteScroll<People, Person>('https://api.themoviedb.org/3/person/popular?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US', itemsMapper);

  function itemsMapper(items: Person[]): Person[] {
    return items.map((item: Person) => {
      return { ...item, profile_path: `https://image.tmdb.org/t/p/w185/${item.profile_path}` };
    });
  }

  function goToPerson(person: Person): void {
    router.push({ name: 'Person', params: { idName: encodeIdNameParam(person.id, person.name) }});
  }
</script>
