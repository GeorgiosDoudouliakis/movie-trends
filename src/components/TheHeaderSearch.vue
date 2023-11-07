<template>
  <div class="flex items-center">
    <input v-model="searchTerm" type="text" placeholder="Search term..." class="text-sm p-2"/>
    <button class="btn-primary p-2">GO</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const searchTerm = ref<string>("");
</script>

<style scoped lang="scss">
  input {
    width: 130px;
    color: var(--primary-color);
    background: lighten(#0f1219, 15%);
    outline: 2px solid lighten(#0f1219, 15%);

    &:focus {
      outline: 1px solid var(--primary-color);
    }
  }
</style>
