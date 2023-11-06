<template>
  <TheHeader/>
  <main>
    <router-view />
  </main>
  <TheFooter/>
</template>

<script setup lang="ts">
  import TheHeader from "@/components/TheHeader.vue";
  import TheFooter from "@/components/TheFooter.vue";
</script>

<style lang="scss">
  :root {
    --primary-color: #20ffe8;
    --secondary-color: #fcfcfc;
    --lighter-black-color: #0f1219;
    --header-border-color: #3b4046;
  }

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

  main {
    min-height: calc(100vh - 109px);
  }

  // Reusable classes
  .btn-primary {
    color: var(--lighter-black-color);
    background: var(--primary-color);
  }
</style>
