<template>
  <div class="item-container relative shrink-0">
    <div class="absolute cursor-pointer p-2 more-icon-container">
      <svg width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" @click="showDescription">
        <path fill="#20ffe8" fill-rule="evenodd" d="M12 3a2 2 0 10-4 0 2 2 0 004 0zm-2 5a2 2 0 110 4 2 2 0 010-4zm0 7a2 2 0 110 4 2 2 0 010-4z"/>
      </svg>
    </div>
    <span class="absolute p-2">{{ item.rate }}</span>
    <img class="responsive-img" :src="item.image" :alt="item.title + 'poster'" width="185" height="278">
    <div class="absolute left-0 bottom-0 p-3 w-full title-container">
      <h3 class="font-bold text-center text-secondary">{{ item.title }}</h3>
    </div>
  </div>

  <teleport to="body">
    <BaseItemDescriptionModal v-if="isModalActive" :title="item.title"
       :description="item.description" :is-modal-active="isModalActive" @modal-close="onModalClose"/>
  </teleport>
</template>

<script setup lang="ts">
  import { PropType, ref } from "vue";
  import { TopRatedItemModel } from "@/views/home/interfaces";
  import BaseItemDescriptionModal from "@/views/home/components/BaseItemDescriptionModal.vue";

  const isModalActive = ref<boolean>(false);

  defineProps({
    item: {
      type: Object as PropType<TopRatedItemModel>,
      required: true
    }
  });

  const showDescription = () => {
    isModalActive.value = true;
    document.body.style.overflow = "hidden";
  };

  const onModalClose = () => {
    isModalActive.value = false;
    document.body.style.overflow = "auto";
  };
</script>

<style scoped lang="scss">
  .item-container {
    width: 185px;
    height: 278px;

    > img {
      border-radius: 10px;
    }

    > .title-container {
      content: "";
      background-color: rgba(0, 0, 0, .9);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    > span {
      top: 0;
      right: 0;
      color: var(--lighter-black-color);
      background: var(--primary-color);
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }

  .more-icon-container {
    background: rgba(0, 0, 0, .7);
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
