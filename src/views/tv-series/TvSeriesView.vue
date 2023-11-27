<template>
  <BaseViewWithTabs :tabs="tabs" />
</template>

<script setup lang="ts">
  import BaseViewWithTabs from "@/components/base/BaseViewWithTabs.vue";
  import { Tab } from "@/interfaces";

  const tabs: Tab[] = [
    {
      id: "Airing today",
      name: "Airing today tv series"
    },
    {
      id: "On the air",
      name: "On the air tv series"
    },
    {
      id: "Popular",
      name: "Popular tv series"
    },
    {
      id: "Top rated",
      name: "Upcoming movies"
    }
  ];
</script>
