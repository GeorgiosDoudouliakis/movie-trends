<template>
  <footer class="text-center text-base py-3 wrapper">
    <p>Copyright &copy; {{ currentDate }}. All Rights Reserved.</p>
  </footer>
</template>

<script setup lang="ts">
  // No need to use ref because this value will never change
  const currentDate: number = new Date().getFullYear();
</script>
