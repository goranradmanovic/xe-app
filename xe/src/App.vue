<template>
  <main class="flex wrapper relative">
    <Sidebar />

    <div class="wrapper__content w-full p-2 lg:py-4 lg:px-8 flex-grow-1 relative">
      <Button :icon="btnIcon" aria-label="Menu" :severity="btnSeverityType" variant="text" size="large" rounded class="mob__nav__btn" @click="sidebarStore.toggleSidebar" />
      
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useSidebarStore } from '@/stores/sidebar'
  import Sidebar from '@/components/sidebar/Sidebar.vue'

  const sidebarStore = useSidebarStore()

  const btnIcon = computed(() => !sidebarStore.getCollapsed ? 'pi pi-times' : 'pi pi-bars'),
    btnSeverityType = computed(() => !sidebarStore.getCollapsed ? 'danger' : 'success')

  onMounted(() => {
    isMobile()
  })

  const isMobile = () => {
    navigator.userAgentData.mobile ? sidebarStore.setCollapsed(true) : sidebarStore.setCollapsed(false)
  }
</script>