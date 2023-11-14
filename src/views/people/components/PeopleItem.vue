<template>
  <div class="mb-6 cursor-pointer person-container">
    <div class="img-container">
      <img class="responsive-img" :src="person.profile_path" alt="{{ person.original_name }}">
    </div>
    <h3 class="text-center px-2 py-4">{{ person.original_name }}</h3>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue";
  import { Person } from "@/views/people/interfaces/people-response.interface";

  defineProps({
    person: {
      type: Object as PropType<Person>,
      required: true
    }
  })
</script>

<style scoped lang="scss">
  .person-container {
    width: 185px;
    background: var(--card-bg);
    border-radius: 16px;

    > .img-container {
      width: 185px;
      height: 278px;

      > img {
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }
    }
  }
</style>
