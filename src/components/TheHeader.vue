<template>
  <header :class="{ 'py-4': isOnMobile }" class="px-8 relative">
    <nav class="flex justify-between items-center">
      <h1 class="text-lg font-semibold tracking-widest">MOVIETRENDS</h1>

      <div v-if="isOnMobile" class="mobile-menu-icon flex flex-col justify-between cursor-pointer"
        :class="{ 'open': isMobileMenuActive }" @click="toggleMobileMenu">
          <div class="w-full bg-primary"></div>
          <div class="w-full bg-primary"></div>
          <div class="w-full bg-primary"></div>
      </div>

      <template v-if="!isOnMobile">
        <ul class="flex">
          <li>
            <router-link :to="{ name: 'Home' }" class="text-secondary text-lg p-4">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Movies' }" class="text-secondary text-lg p-4">Movies</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'TvSeries' }" class="text-secondary text-lg p-4">Tv Series</router-link>
          </li>
        </ul>
        <TheHeaderSearch />
      </template>

      <div v-if="isOnMobile" class="flex flex-col justify-center items-center mobile-menu" :class="{ 'mobile-menu-active': isMobileMenuActive }">
        <ul class="flex flex-col items-center mb-8">
          <li>
            <router-link :to="{ name: 'Home' }" class="text-secondary text-lg p-4" @click="closeMobileMenu">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Movies' }" class="text-secondary text-lg p-4" @click="closeMobileMenu">Movies</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'TvSeries' }" class="text-secondary text-lg p-4" @click="closeMobileMenu">Tv Series</router-link>
          </li>
        </ul>
        <TheHeaderSearch />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";
  import TheHeaderSearch from "@/components/TheHeaderSearch.vue";

  const isOnMobile = ref<boolean>(window.matchMedia('(max-width: 767px)').matches);
  const isMobileMenuActive = ref<boolean>(false);

  const updateMobileStatus = () => {
    isOnMobile.value = window.matchMedia('(max-width: 767px)').matches;
  };

  const toggleMobileMenu = () => {
    isMobileMenuActive.value = !isMobileMenuActive.value;
  };

  const closeMobileMenu = () => {
    isMobileMenuActive.value = false;
  };

  onMounted(() => window.addEventListener("resize",() => updateMobileStatus()));

  onUnmounted(() => window.removeEventListener("resize", updateMobileStatus));
</script>

<style scoped lang="scss">
  header {
    border-bottom: 1px solid var(--border-color);
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
    position: absolute;
    top: 61px;
    left: 0;
    width: 0;
    opacity: 0;
    height: calc(100vh - 110px);
    background: darken(#0f1219, 15%);
    border-bottom: 1px solid var(--border-color);
    z-index: -1;
    transition: all .5s;

    &.mobile-menu-active {
      width: 100%;
      opacity: 1;
      z-index: 2;
    }
  }

  .router-link-exact-active {
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
