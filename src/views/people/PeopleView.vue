<template>
  <div class="py-12 wrapper">
    <h2 class="text-2xl mb-10">Popular People</h2>
    <template v-if="!loading">
      <div class="flex flex-wrap justify-between gap-6">
        <PeopleItem v-for="person in people" :key="person.id" :person="person" />
      </div>
    </template>
    <div v-else class="flex justify-center items-center">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { People, Person } from "@/views/people/interfaces/people-response.interface";
  import PeopleItem from "@/views/people/components/PeopleItem.vue";
  import BaseLoader from "@/components/BaseLoader.vue";

  const people = ref<Person[]>([]);
  const currentPage = ref<number>(1);
  const loading = ref<boolean>(true);

  function getPopularPeople(page: number) {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US&page=${page}`)
        .then(response => response.json())
        .then((response: People) => {
          people.value = response.results.map((person: Person) => {
            return { ...person, profile_path: `https://image.tmdb.org/t/p/w185/${person.profile_path}` };
          });
          currentPage.value = response.page;
        })
        .catch(err => console.error(err))
        .finally(() => loading.value = false);
  }

  onMounted(() => getPopularPeople(1));
</script>

<style scoped lang="scss">

</style>
