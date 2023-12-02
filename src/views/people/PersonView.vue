<template>
  <div v-if="!loading" class="flex py-12 wrapper">
    <div class="flex flex-col general-info">
      <div class="mb-8 img-container person-movie-tvserie-img-container">
        <img v-if="personModel.profile_path" class="responsive-img" :src="personModel.profile_path" :alt="personModel.name" width="250"/>
        <img v-else class="responsive-img" src="../../assets/no_image_available.jpg" width="185" alt=""/>
      </div>
      <h3 class="text-xl mb-8">Personal Information</h3>
      <template v-if="personModel.known_for_department">
        <span class="text-xl mb-1">Known for department</span>
        <span class="text-base mb-4">{{ personModel.known_for_department }}</span>
      </template>
      <template v-if="personModel.birthday">
        <span class="text-xl mb-1">Birth Day</span>
        <span class="text-base mb-4">{{ personModel.birthday }}</span>
      </template>
      <template v-if="personModel.deathday">
        <span class="text-xl mb-1">Death Day</span>
        <span class="text-base mb-4">{{ personModel.deathday }}</span>
      </template>
      <template v-if="personModel.place_of_birth">
        <span class="text-xl mb-1">Place of birth</span>
        <span class="text-base mb-4">{{ personModel.place_of_birth }}</span>
      </template>
      <template v-if="personModel.also_known_as.length">
        <span class="text-xl mb-1">Also known as</span>
        <ul>
          <li v-for="known in personModel.also_known_as">{{ known }}</li>
        </ul>
      </template>
    </div>
    <div class="person-movie-tvserie-info">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-2xl">{{ personModel.name }}</h2>
        <router-link class="btn-primary p-2" :to="{ name: 'People' }">Popular People</router-link>
      </div>
      <template v-if="personModel.biography">
        <span class="inline-flex text-xl mb-6">Biography</span>
        <p class="mb-10">{{ personModel.biography }}</p>
      </template>
      <template v-if="personModel.known_for.length">
        <span class="inline-flex text-xl mb-6">Known for</span>
        <div>
          <BaseCard class="known-for-item" v-for="known in personModel.known_for" :key="known.id" 
          :image="{ src: known.poster_path || known.profile_path,
          alt: known.title || known.name, width: 100 }" :name="known.title || known.name" direction="horizontal"
          @click="goToItem(known)">
            <p class="text-fade">{{ known['overview'] }}</p>
          </BaseCard>
        </div>
      </template>
    </div>
  </div>

  <div v-else class="flex justify-center items-center loader-container-full-page">
    <BaseLoader />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { PersonModel } from "@/views/people/types/person-model.type";
  import BaseCard from "@/components/base/BaseCard.vue";
  import { useMapImagePath } from "@/composables/useMapImagePath";
  import router from "@/router";
import { useEncodingUtilities } from "@/composables/useEncodingUtilities";

  const personModel = ref<PersonModel>({} as PersonModel);
  const loading = ref<boolean>(true);

  const { idName } = defineProps<{ idName: string }>();

  const { mapImagePath } = useMapImagePath();
  const { encodeIdNameParam } = useEncodingUtilities();

  function getData() {
    const paramsArr = idName.split("-");

    Promise.all([
      fetch(`https://api.themoviedb.org/3/search/person?api_key=803a77b2748b6f5d6363b4fa92bfd870&query=${paramsArr.slice(1).join(" ")}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/person/${+paramsArr[0]}?api_key=803a77b2748b6f5d6363b4fa92bfd870&language=en-US`)
    ]).then(responses => Promise.all(responses.map(response => response.json())))
      .then(([person, personDetails]) => {
        personModel.value = {
          name: person.results[0].name,
          known_for: person.results[0].known_for,
          profile_path: person.results[0].profile_path && mapImagePath(185, person.results[0].profile_path),
          biography: personDetails.biography,
          birthday: personDetails.birthday,
          deathday: personDetails.deathday,
          place_of_birth: personDetails.place_of_birth,
          known_for_department: personDetails.known_for_department,
          also_known_as: personDetails.also_known_as
        }
      })
      .catch((err) => console.error(err))
      .finally(() => loading.value = false)
  }

  function goToItem(knownForItem: any): void {
    if(knownForItem.media_type === "movie") 
      router.push({ name: 'Movie', params: { idName: encodeIdNameParam(knownForItem.id, knownForItem.title) } });
    else if(knownForItem.media_type === "tv")
      router.push({ name: 'TvSerie', params: { idName: encodeIdNameParam(knownForItem.id, knownForItem.name) } });
  }

  onMounted(() => getData());
</script>

<style scoped lang="scss">
  .wrapper {
    flex-direction: column;

    @media(min-width: 1024px) {
      flex-direction: row;
    }
  }

  .general-info {
    order: 2;

    @media(min-width: 1024px) {
      order: 0;
      width: 300px;
    }
  }

  .known-for-item:not(:last-of-type) {
    margin-bottom: 20px;
  }
</style>
