import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  // Store
  const collapsed = ref(false),
    sidebarWidth = ref(240),
    sidebarWidthCollapsed = ref(80)

  // Getters
  const getSidebarWidth = computed(() => `${collapsed.value ? sidebarWidthCollapsed.value : sidebarWidth.value}px`),
    getCollapsed = computed(() => collapsed.value)

  // Action
  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  return { getSidebarWidth, getCollapsed, toggleSidebar }
})