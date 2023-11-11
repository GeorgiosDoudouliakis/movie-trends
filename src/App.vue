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
    --border-color: #3b4046;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
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

  button > a {
    font-size: 14px;
    display: inline-block;
    padding: 5px 10px;
  }

  main {
    min-height: calc(100vh - 113px);

    @media(min-width: 768px) {
      min-height: calc(100vh - 109px);
    }
  }

  // Reusable classes
  .btn-primary {
    color: var(--lighter-black-color);
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    transition: .4s ease-in-out;

    &:hover {
      color: var(--primary-color);
      background: var(--lighter-black-color);
    }
  }

  .btn-secondary {
    color: var(--primary-color);
    background: var(--lighter-black-color);
    border: 1px solid var(--primary-color);
    transition: .4s ease-in-out;

    &:hover {
      color: var(--lighter-black-color);
      background: var(--primary-color);
    }
  }

  .responsive-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  // Carousel style overwrites
  .carousel__prev,
  .carousel__next {
    background-color: var(--primary-color) !important;
  }

  .carousel__prev > svg,
  .carousel__next > svg {
    fill: var(--lighter-black-color);
  }

  .carousel__pagination {
    display: none !important;
  }

  .carousel_slide {
    align-items: unset;
  }
</style>
