<template>
  <div class="flex items-center p-2 search-input">
    <input class="p-2" type="text" placeholder="Search" v-model="searchTerm" @input="updateQueryParams">
    <button class="p-2 ml-4 btn-primary">Search</button>
  </div>
  <div class="py-12 wrapper"></div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { onMounted, ref } from "vue";
  import decodeQueryParams from "@/helpers/decodeQueryParams.helper";

  const route = useRoute();
  const router = useRouter();
  const searchTerm = ref<string>("");

  function initializeSearchTerm(): void {
    searchTerm.value = decodeQueryParams(route.query.term as string);
  }

  function updateQueryParams(): void {
    router.replace({ name: 'Search', query: { term: searchTerm.value } });
  }

  onMounted(() => initializeSearchTerm());
</script>

<style scoped lang="scss">
  .search-input {
    width: 90%;
    max-width: 1280px;
    margin: auto;
    background: lighten(#0f1219, 10%);

    input {
      width: 100%;
      color: var(--secondary-color);
      background: lighten(#0f1219, 10%);
      border: 1px solid var(--border-color);
      outline: none;

      &:focus {
        border-color: var(--primary-color);
      }
    }
  }
</style>
