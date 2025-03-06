<template>
  <main class="flex wrapper">
    <Sidebar />

    <div class="wrapper__content p-4 flex-grow-1" >
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Sidebar from '@/components/sidebar/Sidebar.vue'
</script>