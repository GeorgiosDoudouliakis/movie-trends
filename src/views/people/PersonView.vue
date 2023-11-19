<template>
  <div v-if="!loading" class="flex py-12 wrapper">
    <div class="flex flex-col general-info">
      <div class="mb-8 img-container">
        <img class="responsive-img" :src="personModel['profile_path']" :alt="personModel['name']" width="250"/>
      </div>
      <h3 class="text-xl mb-8">Personal Information</h3>
      <span class="text-xl mb-1">Known for department</span>
      <span class="text-base mb-4">{{ personModel['known_for_department'] }}</span>
      <span class="text-xl mb-1">Birth Day</span>
      <span class="text-base mb-4">{{ personModel['birthday'] }}</span>
      <template v-if="personModel['deathday']">
        <span class="text-xl mb-1">Death Day</span>
        <span class="text-base mb-4">{{ personModel['deathday'] }}</span>
      </template>
      <span class="text-xl mb-1">Place of birth</span>
      <span class="text-base mb-4">{{ personModel['place_of_birth'] }}</span>
      <span class="text-xl mb-1">Also known as</span>
      <ul>
        <li v-for="known in personModel['also_known_as']">{{ known }}</li>
      </ul>
    </div>
    <div class="ml-10">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-2xl">{{ personModel['name'] }}</h2>
        <router-link class="btn-primary p-2" :to="{ name: 'People' }">Popular People</router-link>
      </div>
      <span class="inline-flex text-xl mb-6">Biography</span>
      <p class="mb-10">{{ personModel['biography'] }}</p>
      <span class="inline-flex text-xl mb-6">Known for</span>
      <ul>
        <li class="flex justify-between items-center text-lg p-4 known-for-item" v-for="known in personModel['known_for']" :key="known.id">
          <span>{{ known.title || known.name }}</span>
          <button class="px-3 py-1 btn-secondary">Show More</button>
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="flex justify-center pt-20">
    <BaseLoader />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { PersonModel } from "@/views/people/types/person-model.type";

  const personModel = ref<PersonModel | null>(null);
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
        place_of_birth: personDetails.place_of_birth,
        known_for_department: personDetails.known_for_department,
        also_known_as: personDetails.also_known_as
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

    > .img-container {
      width: 250px;

      > img {
        border-radius: 16px;
      }
    }
  }

  .known-for-item {
    border: 1px solid var(--border-color);

    &:not(:last-of-type) {
      margin-bottom: 15px;
    }
  }
</style>
