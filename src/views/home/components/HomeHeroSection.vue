<template>
  <div class="relative w-full hero-section-container">
    <img class="absolute top-0 left-0 responsive-img" src="../../../assets/hero_img.jpg" alt="">
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8">
      <span class="text-2xl text-primary mb-4">WELCOME TO MOVIETRENDS!</span>
      <p class="text-xl mb-6">Explore movies, tv series and details for them from anywhere and anytime</p>
      <div class="flex">
        <input type="text" placeholder="Search for movies, tv series and persons..." v-model="searchTerm" />
        <button class="btn-primary">
          <router-link to="/">Search</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const searchTerm = ref<string>("");
</script>

<style scoped lang="scss">
  .hero-section-container {
    height: 300px;

    > div:first-of-type {
      content: "";
      background: rgba(0, 0, 0, .7);

      > div {
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
