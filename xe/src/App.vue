<template>
  <main class="flex wrapper">
    <Sidebar />

    <div class="wrapper__content py-4 px-8 md:px-1 flex-grow-1">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Sidebar from '@/components/sidebar/Sidebar.vue'
</script>