import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useCoinStore = defineStore('coin', () => {
  // State
  const coin = ref([]),
    loading = ref(false)

  // Getters
  const coinList = computed(() => readonly(coin.value))

  // Actions
  async function fetchCoin() {
    loading.value = true
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/coin`)
      if (!res.ok) throw new Error('Failed to fetch coin')
      coin.value = await res.json()
    } catch (error) {
      console.error('Error fetching coin:', error)
    } finally {
      loading.value = false
    }
  }

  return { coinList, fetchCoin, loading }
})
