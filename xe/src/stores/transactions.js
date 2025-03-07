import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useBlocksStore = defineStore('blocks', () => {
  // State
  const blocks = ref([]),
    loading = ref(false)

  // Getters
  const blocksList = computed(() => readonly(blocks.value))

  // Actions
  async function fetchBlocks() {
    loading.value = true
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blocks`)
      if (!res.ok) throw new Error('Failed to fetch blocks')
      blocks.value = await res.json()
    } catch (error) {
      console.error('Error fetching blocks:', error)
    } finally {
      loading.value = false
    }
  }

  return { blocksList, fetchBlocks, loading }
})
