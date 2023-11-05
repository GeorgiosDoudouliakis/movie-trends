<template>
  <TheFooter/>
</template>

<script setup lang="ts">
  import TheFooter from "@/components/TheFooter.vue";
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
  }

  body {
    @apply bg-lighter-black;
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    @apply text-primary;
  }

  a, p, span {
    @apply text-secondary;
  }

  ul {
    list-style-type: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
  }
</style>
