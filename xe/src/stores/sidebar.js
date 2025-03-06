import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  // Store
  const collapsed = ref(false),
    sidebarWidth = ref(280),
    sidebarWidthCollapsed = ref(120)

  // Getters
  const getSidebarWidth = computed(() => `${collapsed.value ? sidebarWidthCollapsed.value : sidebarWidth.value}px`),
    getCollapsed = computed(() => collapsed.value)

  // Action
  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  return { getSidebarWidth, getCollapsed, toggleSidebar }
})