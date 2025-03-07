import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useRevenueStore = defineStore('revenue', () => {
  // State
  const revenue = ref([]),
    loading = ref(false)

  // Getters
  const revenueList = computed(() => readonly(revenue.value))

  // Actions
  async function fetchRevenue() {
    loading.value = true
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue`)
      if (!res.ok) throw new Error('Failed to fetch revenue')
      revenue.value = await res.json()
    } catch (error) {
      console.error('Error fetching revenue:', error)
    } finally {
      loading.value = false
    }
  }

  return { revenueList, fetchRevenue, loading }
})
