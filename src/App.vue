<template>
  <TheHeader/>
  <main>
    <router-view />
  </main>
  <TheFooter/>

  <TheGoTopButton/>
</template>

<script setup lang="ts">
  import TheHeader from "./components/TheHeader.vue";
  import TheFooter from "./components/TheFooter.vue";
  import TheGoTopButton from "./components/TheGoTopButton.vue";
</script>

<style lang="scss">
  :root {
    --primary-color: #20ffe8;
    --secondary-color: #fcfcfc;
    --lighter-black-color: #0f1219;
    --border-color: #3b4046;
    --card-bg: #202336;
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
    position: relative;
  }

  h1, h2, h3, h4 {
    @apply text-primary;
  }

  a, p, span, li {
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
    min-height: calc(100vh - 117px);

    @media(min-width: 768px) {
      min-height: calc(100vh - 109px);
    }
  }

  // Reusable classes
  .wrapper {
    width: 90%;
    max-width: 1280px;
    margin: auto;
  }

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

  .btn-disabled {
    opacity: .5;
    pointer-events: none;
  }

  .responsive-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .text-fade {
    position: relative;
    height: 72px;
    overflow: hidden;

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      content: '';
      width: 100%;
      height: 24px;
      background: linear-gradient(to right, rgba(0,0,0,0), #202336);
    }
  }

  .vote {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    color: var(--lighter-black-color);
    background: var(--primary-color);
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
