<template>
  <div class="flex items-center p-2 search-input">
    <input class="p-2" type="text" placeholder="Search">
    <button class="p-2 ml-4 btn-primary">Search</button>
  </div>
</template>

<script setup lang="ts">

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
