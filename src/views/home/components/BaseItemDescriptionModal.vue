<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center overlay">
    <div class="text-center p-4 modal">
      <h4 class="text-xl mb-4 text-lighter-black">{{ title }}</h4>
      <p class="text-base mb-4 text-lighter-black">{{ description }}</p>
      <button class="btn-primary p-2" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    isModalActive: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['modal-close']);

  const closeModal = () => emit('modal-close');
</script>

<style scoped lang="scss">
  .overlay {
    content: "";
    background: rgba(0, 0, 0, .7);
    z-index: 2;

    > .modal {
      width: 90%;
      background: var(--secondary-color);
      border-radius: 10px;
      z-index: 5;

      > p {
        max-height: 400px;
        overflow-y: scroll;
      }

      @media(min-width: 1024px) {
        width: 700px;
      }
    }
  }
</style>
