<template>
  <header :class="{ 'py-4': isOnMobile }" class="px-8 relative">
    <nav class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold tracking-widest">MOVIETRENDS</h1>

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
        <button class="btn-primary btn-search"><router-link to="/" class="text-lg p-4" @click="handleMobileMenu">Search</router-link></button>
      </template>

      <!--  Mobile  -->
      <div v-if="isOnMobile" class="mobile-menu-icon flex flex-col justify-between cursor-pointer"
           :class="{ 'open': isMobileMenuActive }" @click="handleMobileMenu">
        <div class="w-full bg-primary"></div>
        <div class="w-full bg-primary"></div>
        <div class="w-full bg-primary"></div>
      </div>

      <div v-if="isOnMobile" class="flex flex-col justify-center items-center mobile-menu" :class="{ 'mobile-menu-active': isMobileMenuActive }">
        <ul class="flex flex-col items-center mb-4">
          <li>
            <router-link :to="{ name: 'Home' }" class="text-secondary text-lg p-4" @click="handleMobileMenu">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Movies' }" class="text-secondary text-lg p-4" @click="handleMobileMenu">Movies</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'TvSeries' }" class="text-secondary text-lg p-4" @click="handleMobileMenu">Tv Series</router-link>
          </li>
        </ul>
        <button class="btn-primary"><router-link to="/" class="text-lg" @click="handleMobileMenu">Search</router-link></button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from "vue";

  const isOnMobile = ref<boolean>(window.matchMedia('(max-width: 767px)').matches);
  const isMobileMenuActive = ref<boolean>(false);

  const updateMobileRelatedState = () => {
    isOnMobile.value = window.matchMedia('(max-width: 767px)').matches;
    isMobileMenuActive.value = false;
  };

  const handleMobileMenu = () => {
    isMobileMenuActive.value = !isMobileMenuActive.value;
    document.body.style.overflow = isMobileMenuActive.value ? "hidden" : "auto";
  };

  onMounted(() => window.addEventListener("resize",() => updateMobileRelatedState()));

  onBeforeUnmount(() => window.removeEventListener("resize", updateMobileRelatedState));
</script>

<style scoped lang="scss">
  header {
    border-bottom: 1px solid var(--border-color);
  }

  .btn-search {
    width: 170px;
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
    height: calc(100vh - 65px);
    background: darken(#0f1219, 15%);
    z-index: -1;
    transition: all .5s;

    &.mobile-menu-active {
      width: 100%;
      opacity: 1;
      z-index: 2;
    }
  }

  .router-link-exact-active:not(button > a) {
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
