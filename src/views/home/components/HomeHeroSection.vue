<template>
  <div class="relative w-full hero-section-container">
    <div class="absolute top-0 left-0 w-full h-full back"></div>
    <div class="relative flex flex-col justify-center h-full wrapper hero-section-content">
      <span class="text-2xl text-primary mb-4">WELCOME TO MOVIETRENDS!</span>
      <p class="text-xl mb-6">Explore movies, tv series and details for them from anywhere and anytime</p>
      <div class="flex search-container">
        <input type="text" placeholder="Search for movies, tv series or persons..." v-model="searchTerm" />
        <button class="btn-primary">
          <router-link :to="{ name: 'Search', query: { term } }">Search</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import encodeQueryParams from "@/helpers/encodeQueryParams.helper";

  const searchTerm = ref<string>("");

  const term = computed(() => encodeQueryParams(searchTerm.value));
</script>

<style scoped lang="scss">
  .hero-section-container {
    height: 300px;
    background-image: url("../../../assets/hero_img.jpg");
    background-repeat: no-repeat;
    background-size: 100%;

    > .back {
      content: "";
      background: rgba(0, 0, 0, .7);
    }

    > .hero-section-content {
      z-index: 5;

      > .search-container {
        width: 100%;
        max-width: 1280px;

        > input {
          width: 100%;
          padding-left: 10px;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
</style>
