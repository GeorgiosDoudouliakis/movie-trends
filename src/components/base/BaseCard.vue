<template>
  <div class="mb-6 cursor-pointer card-container">
    <div class="img-container">
      <slot name="card-img"></slot>
    </div>
    <div class="flex flex-col items-center px-2 py-4">
      <slot name="card-content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card-container {
    width: 185px;
    background: var(--card-bg);
    border-radius: 16px;
    transition: transform .5s;

    &:hover {
      transform: rotate(-3deg);
    }

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
