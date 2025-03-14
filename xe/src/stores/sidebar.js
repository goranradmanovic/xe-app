import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  // Store
  const collapsed = ref(false)

  // Getters
  const getCollapsed = computed(() => collapsed.value)

  // Action
  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function setCollapsed(val) {
    collapsed.value = val
  }

  return { getCollapsed, toggleSidebar, setCollapsed }
})