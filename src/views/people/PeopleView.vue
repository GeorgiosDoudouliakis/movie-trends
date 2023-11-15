<template>
  <div class="py-12 wrapper">
    <h2 class="text-2xl mb-10">Popular People</h2>
    <template v-if="!loading">
      <div class="flex flex-wrap justify-between gap-6">
        <BaseCard v-for="person in people" :key="person.id" :person="person">
          <template v-slot:card-img>
            <img class="responsive-img" :src="person.profile_path" alt="{{ person.original_name }}">
          </template>
          <template v-slot:card-content>
            <h3>{{ person.original_name }}</h3>
          </template>
        </BaseCard>
      </div>
    </template>
    <div v-if="loading || isOnLoadMore" class="flex justify-center items-center pt-4">
      <BaseLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from "vue";
  import { People, Person } from "@/views/people/interfaces/people-response.interface";
  import BaseCard from "@/components/base/BaseCard.vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";

  const people = ref<Person[]>([]);
  const currentPage = ref<number>(1);
  const loading = ref<boolean>(true);
  const isOnLoadMore = ref<boolean>(false)

  function getPopularPeople(page: number) {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US&page=${page}`)
        .then(response => response.json())
        .then((response: People) => {
          const mappedResults = response.results.map((person: Person) => {
            return { ...person, profile_path: `https://image.tmdb.org/t/p/w185/${person.profile_path}` };
          });
          people.value = [...people.value, ...mappedResults];
          currentPage.value = response.page;
        })
        .catch(err => console.error(err))
        .finally(() => {
          loading.value = false;
          if (isOnLoadMore) isOnLoadMore.value = false;
        });
  }

  function fetchOnScroll(): void {
    if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
      isOnLoadMore.value = true;
      getPopularPeople(currentPage.value + 1);
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', () => fetchOnScroll());
    getPopularPeople(1);
  });

  onBeforeUnmount(() => window.removeEventListener('scroll', fetchOnScroll))
</script>
