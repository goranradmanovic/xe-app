import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useNodesStore = defineStore('nodes', () => {
  // State
  const nodes = ref([]),
    loading = ref(false)

  // Getters
  const nodesList = computed(() => readonly(nodes.value))

  // Actions
  async function fetchNodes() {
    loading.value = true
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes`)
      if (!res.ok) throw new Error('Failed to fetch nodes')
      nodes.value = await res.json()
    } catch (error) {
      console.error('Error fetching nodes:', error)
    } finally {
      loading.value = false
    }
  }

  return { nodesList, fetchNodes, loading }
})
