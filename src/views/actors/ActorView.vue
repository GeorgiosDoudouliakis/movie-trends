<template>
  <div v-if="!loading" class="flex py-12 wrapper">
    <div class="flex flex-col general-info">
      <div class="mb-8 img-container person-movie-tvserie-img-container">
        <img v-if="actorModel.profile_path" class="responsive-img" :src="actorModel.profile_path" :alt="actorModel.name" width="250"/>
        <img v-else class="responsive-img" src="../../assets/no_image_available.jpg" width="185" alt=""/>
      </div>
      <h3 class="text-xl mb-8">Personal Information</h3>
      <template v-if="actorModel.known_for_department">
        <span class="text-xl mb-1">Known for department</span>
        <span class="text-base mb-4">{{ actorModel.known_for_department }}</span>
      </template>
      <template v-if="actorModel.birthday">
        <span class="text-xl mb-1">Birth Day</span>
        <span class="text-base mb-4">{{ actorModel.birthday }}</span>
      </template>
      <template v-if="actorModel.deathday">
        <span class="text-xl mb-1">Death Day</span>
        <span class="text-base mb-4">{{ actorModel.deathday }}</span>
      </template>
      <template v-if="actorModel.place_of_birth">
        <span class="text-xl mb-1">Place of birth</span>
        <span class="text-base mb-4">{{ actorModel.place_of_birth }}</span>
      </template>
      <template v-if="actorModel.also_known_as.length">
        <span class="text-xl mb-1">Also known as</span>
        <ul>
          <li v-for="known in actorModel.also_known_as">{{ known }}</li>
        </ul>
      </template>
    </div>
    <div class="person-movie-tvserie-info">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-2xl">{{ actorModel.name }}</h2>
        <router-link class="btn-secondary p-2" :to="{ name: 'Actors' }">All Actors</router-link>
      </div>
      <template v-if="actorModel.biography">
        <span class="inline-flex text-xl mb-6">Biography</span>
        <p class="mb-10">{{ actorModel.biography }}</p>
      </template>
      <template v-if="actorModel.known_for.length">
        <span class="inline-flex text-xl mb-6">Known for</span>
        <div>
          <BaseCard class="known-for-item" v-for="known in actorModel.known_for" :key="known.id"
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
  import { PersonModel } from "@/views/actors/types/person-model.type";
  import BaseCard from "@/components/base/BaseCard.vue";
  import { useMapImagePath } from "@/composables/useMapImagePath";
  import router from "@/router";
  import { useEncodingUtilities } from "@/composables/useEncodingUtilities";

  const actorModel = ref<PersonModel>({} as PersonModel);
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
      .then(([actor, actorDetails]) => {
        actorModel.value = {
          name: actor.results[0].name,
          known_for: actor.results[0].known_for,
          profile_path: actor.results[0].profile_path && mapImagePath(185, actor.results[0].profile_path),
          biography: actorDetails.biography,
          birthday: actorDetails.birthday,
          deathday: actorDetails.deathday,
          place_of_birth: actorDetails.place_of_birth,
          known_for_department: actorDetails.known_for_department,
          also_known_as: actorDetails.also_known_as
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
