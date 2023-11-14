<template>
  <div class="py-12 wrapper">
    <h2 class="text-2xl mb-10">Popular People</h2>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { People, Person } from "@/views/people/interfaces/people-response.interface";

  const people = ref<Person[]>([]);
  const currentPage = ref<number>(1);

  function getPopularPeople(page: number) {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US&page=${page}`)
        .then(response => response.json())
        .then((response: People) => {
          people.value = response.results;
          currentPage.value = response.page;
        })
        .catch(err => console.error(err));
  }

  onMounted(() => getPopularPeople(1));
</script>

<style scoped lang="scss">

</style>
