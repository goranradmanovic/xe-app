import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useTransactionsStore = defineStore('transactions', () => {
  // State
  const transactions = ref([]),
    loading = ref(false)

  // Getters
  const transactionsList = computed(() => readonly(transactions.value))

  // Actions
  async function fetchTransactions() {
    loading.value = true
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`)
      if (!res.ok) throw new Error('Failed to fetch transactions')
      transactions.value = await res.json()
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      loading.value = false
    }
  }

  return { transactionsList, fetchTransactions, loading }
})
