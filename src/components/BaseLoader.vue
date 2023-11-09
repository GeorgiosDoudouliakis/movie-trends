<template>
  <span></span>
</template>

<style scoped lang="scss">
  span {
    color: var(--primary-color);
    position: relative;
    font-size: 11px;
    background: var(--primary-color);
    animation: escaleY 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    animation-delay: -0.16s;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 2em;
      background: var(--primary-color);
      width: 1em;
      height: 4em;
      animation: escaleY 1s infinite ease-in-out;
    }
    &:before {
      left: -2em;
      animation-delay: -0.32s;
    }
  }

  @keyframes escaleY {
    0%, 80%, 100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
</style>
