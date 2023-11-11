<template>
  <div class="relative w-full hero-section-container">
    <img class="absolute top-0 left-0 responsive-img" src="../../../assets/hero_img.jpg" alt="">
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-8">
      <span class="text-2xl text-primary text-center mb-5">WELCOME TO MOVIETRENDS</span>
      <p class="text-xl text-center">Explore movies, tv series and details for them from anywhere and anytime!</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .hero-section-container {
    height: 280px;

    > div {
      content: "";
      background: rgba(0, 0, 0, .8);

      > p {
        @media(min-width: 700px) {
          width: 520px;
        }
      }
    }
  }
</style>
