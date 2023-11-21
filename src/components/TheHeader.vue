<template>
  <header :class="{ 'py-4': isOnMobile }" class="wrapper">
    <nav class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold tracking-widest">
        <router-link to="/">MOVIETRENDS</router-link>
      </h1>

      <div class="flex items-center">
        <template v-if="!isOnMobile">
          <ul class="flex">
            <li>
              <router-link :to="{ name: 'Movies' }" class="text-secondary text-lg p-4">Movies</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'TvSeries' }" class="text-secondary text-lg p-4">Tv Series</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'People' }" class="text-secondary text-lg p-4">People</router-link>
            </li>
          </ul>
        </template>

        <!--  Mobile  -->
        <div v-if="isOnMobile" class="mobile-menu-icon flex flex-col justify-between cursor-pointer"
             :class="{ 'open': isMobileMenuActive }" @click="handleMobileMenuVisibility">
          <div class="w-full bg-secondary"></div>
          <div class="w-full bg-secondary"></div>
          <div class="w-full bg-secondary"></div>
        </div>

        <div v-if="isOnMobile" class="fixed left-0 flex flex-col justify-center items-center mobile-menu" :class="{ 'mobile-menu-active': isMobileMenuActive }">
          <ul class="flex flex-col items-center">
            <li>
              <router-link :to="{ name: 'Movies' }" class="text-secondary text-lg p-4" @click="handleMobileMenuVisibility">Movies</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'TvSeries' }" class="text-secondary text-lg p-4" @click="handleMobileMenuVisibility">Tv Series</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'People' }" class="text-secondary text-lg p-4" @click="handleMobileMenuVisibility">People</router-link>
            </li>
          </ul>
        </div>

        <!-- Search  -->
        <router-link :to="{ name: 'Search' }" class="inline-flex justify-center items-center ml-4 search-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="35px" height="35px"><path d="M 56.599609 21.599609 C 34.099609 21.599609 15.800781 40.100781 15.800781 62.800781 C 15.800781 85.600781 34.099609 104 56.599609 104 C 66.899609 104 76.3 100.09922 83.5 93.699219 L 85.800781 96 L 83.699219 98.199219 C 82.499219 99.399219 82.499219 101.3 83.699219 102.5 L 101.69922 120.69922 C 102.29922 121.29922 103.00078 121.59961 103.80078 121.59961 C 104.60078 121.59961 105.40039 121.29922 105.90039 120.69922 L 113.90039 112.59961 C 115.00039 111.39961 115.00078 109.50039 113.80078 108.40039 L 95.800781 90.199219 C 95.200781 89.599219 94.499219 89.300781 93.699219 89.300781 C 92.899219 89.300781 92.099609 89.599219 91.599609 90.199219 L 89.5 92.400391 L 87.199219 90 C 93.499219 82.7 97.400391 73.200781 97.400391 62.800781 C 97.400391 40.100781 79.099609 21.599609 56.599609 21.599609 z M 56.599609 27.699219 C 75.799609 27.699219 91.400391 43.500391 91.400391 62.900391 C 91.400391 82.300391 75.799609 98 56.599609 98 C 37.399609 98 21.800781 82.300391 21.800781 62.900391 C 21.800781 43.500391 37.399609 27.699219 56.599609 27.699219 z M 56.699219 40.199219 C 47.199219 40.199219 38.7 46.300781 35.5 55.300781 C 35 56.600781 35.699609 58.199609 37.099609 58.599609 C 37.399609 58.699609 37.7 58.800781 38 58.800781 C 39.1 58.800781 40.1 58.1 40.5 57 C 42.9 50.1 49.499219 45.400391 56.699219 45.400391 C 58.099219 45.400391 59.300781 44.200781 59.300781 42.800781 C 59.300781 41.400781 58.099219 40.199219 56.699219 40.199219 z M 37.699219 64.900391 C 36.299219 64.900391 35.099609 66 35.099609 67.5 L 35.099609 67.900391 C 35.199609 69.300391 36.300781 70.5 37.800781 70.5 C 39.200781 70.5 40.400391 69.300391 40.400391 67.900391 L 40.400391 67.599609 C 40.400391 66.099609 39.300781 64.900391 37.800781 64.900391 L 37.699219 64.900391 z M 93.800781 96.599609 L 107.59961 110.59961 L 103.80078 114.40039 L 90 100.40039 L 93.800781 96.599609 z"/></svg>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";

  const isOnMobile = ref<boolean>(window.matchMedia('(max-width: 767px)').matches);
  const isMobileMenuActive = ref<boolean>(false);

  const updateMobileRelatedState = () => {
    isOnMobile.value = window.matchMedia('(max-width: 767px)').matches;
    isMobileMenuActive.value = false;
  };

  const handleMobileMenuVisibility = () => {
    isMobileMenuActive.value = !isMobileMenuActive.value;
    document.body.style.overflow = isMobileMenuActive.value ? "hidden" : "auto";
  };

  onMounted(() => window.addEventListener("resize",() => updateMobileRelatedState()));

  onUnmounted(() => window.removeEventListener("resize", updateMobileRelatedState));
</script>

<style scoped lang="scss">
  header {
    border-bottom: 1px solid var(--border-color);
  }

  ul > li > a {
    transition: .8s ease-in-out;

    &:hover {
      color: var(--primary-color);
    }
  }

  .mobile-menu-icon {
    width: 30px;
    height: 20px;

    > div {
      height: 2px;
    }

    &.open > div {
      transition: width .4s ease-in-out;

      &:nth-child(2) {
        width: 75%;
      }
      &:nth-child(3) {
        width: 50%;
      }
    }
  }

  .mobile-menu {
    top: 69px;
    width: 0;
    opacity: 0;
    height: calc(100vh - 69px);
    background: darken(#0f1219, 15%);
    z-index: -1;
    transition: all .5s;

    &.mobile-menu-active {
      width: 100%;
      opacity: 1;
      z-index: 10;
    }
  }

  .search-icon-container {
    width: 35px;
    height: 35px;

    & > svg {
      fill: var(--primary-color);
    }
  }

  .router-link-exact-active:not(h1 > a, a:has(> svg)) {
    @apply text-primary;
    position: relative;

    &::after {
      position: absolute;
      bottom: 0;
      left: 10px;
      content: "";
      width: calc(100% - 20px);
      height: 1px;
      background: var(--primary-color);
    }
  }
</style>
