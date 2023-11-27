<template>
  <BaseViewWithTabs :tabs="tabs" />
</template>

<script setup lang="ts">
  import BaseViewWithTabs from "@/components/base/BaseViewWithTabs.vue";
  import { Tab } from "@/interfaces";

  const tabs: Tab[] = [
      {
          id: "Now playing",
          name: "Now playing movies"
      },
      {
          id: "Popular",
          name: "Popular movies"
      },
      {
          id: "Top Rated",
          name: "Top rated movies"
      },
      {
          id: "Upcoming",
          name: "Upcoming movies"
      }
  ];
</script>
