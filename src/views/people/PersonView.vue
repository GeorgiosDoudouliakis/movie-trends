<template>
  <div v-if="!loading" class="flex">
    <div class="flex flex-col general-info"></div>
    <div class="ml-4"></div>
  </div>

  <div v-else class="flex justify-center pt-20">
    <BaseLoader />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { Person, PersonDetails } from "@/views/people/interfaces/people-response.interface";

  const personModel = ref<Pick<Person, "name" | "known_for" | "profile_path"> & Pick<PersonDetails, "biography" | "birthday" | "deathday" | "place_of_birth"> | null>(null);
  const loading = ref<boolean>(true);

  const { idName } = defineProps<{ idName: string }>();

  async function getData() {
    const paramsArr = idName.split("-");

    try {
      const getPerson = await fetch(`https://api.themoviedb.org/3/search/person?api_key=803a77b2748b6f5d6363b4fa92bfd870&query=${paramsArr.slice(1).join(" ")}&language=en-US&page=1`);
      const getPersonDetails = await fetch(`https://api.themoviedb.org/3/person/${+paramsArr[0]}?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US`);
      const person = await getPerson.json();
      const personDetails = await getPersonDetails.json();

      personModel.value = {
        name: person.results[0].name,
        known_for: person.results[0].known_for,
        profile_path: `https://image.tmdb.org/t/p/w185/${person.results[0].profile_path}`,
        biography: personDetails.biography,
        birthday: personDetails.birthday,
        deathday: personDetails.deathday,
        place_of_birth: personDetails.place_of_birth
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      loading.value = false;
    }
  }

  onMounted(() => getData());
</script>

<style scoped lang="scss">
  .general-info {
    width: 300px;
  }
</style>
