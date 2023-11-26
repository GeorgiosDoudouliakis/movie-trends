<template>
  <span class="inline-block p-2 text-lighter-black bg-primary fixed right-0 cursor-pointer"
        ref="goTopEl" @click="goTop">TOP</span>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";

  const goTopEl = ref<HTMLSpanElement>();

  function goTop(): void {
    window.scrollTo(0, 0);
  }

  function handleElementVisibility() {
    if(window.scrollY > 800) {
      goTopEl.value?.classList.add("show");
    } else {
      goTopEl.value?.classList.remove("show");
    }
  }

  onMounted(() => window.addEventListener("scroll", () => handleElementVisibility()));

  onUnmounted(() => window.removeEventListener("scroll", handleElementVisibility));
</script>

<style scoped lang="scss">
    span {
      bottom: 50px;
      transform: translateX(42.39px);
      transition: .4s ease-in-out;

      &.show {
        transform: translateX(0);
      }
    }
</style>
