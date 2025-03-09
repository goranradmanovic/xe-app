import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useMainNetStatStore = defineStore('mainnetstat', () => {
  // State
  const mainNetStat = ref([]),
    loading = ref(false)

  // Getters
  const mainNetStatList = computed(() => readonly(mainNetStat.value))

  // Actions
  async function fetchMainNetStat() {
    loading.value = true
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mainnetstat`)
      if (!res.ok) throw new Error('Failed to fetch blocks')
      mainNetStat.value = await res.json()
    } catch (error) {
      console.error('Error fetching blocks:', error)
    } finally {
      loading.value = false
    }
  }

  return { mainNetStatList, fetchMainNetStat, loading }
})
