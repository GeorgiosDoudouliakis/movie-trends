<template>
  <footer class="text-center text-sm py-3">
    <p>Copyright &copy; {{ currentDate }}. All Rights Reserved.</p>
  </footer>
</template>

<script setup lang="ts">
  const currentDate: number = new Date().getFullYear();
</script>
