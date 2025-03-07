<template>
  <div class="blocks">
    <h1 class="mb-6">Transactions</h1>
    <Table :title="'Transactions'" :data="transactionsStore.transactionsList?.results" :cols="columns" :loading="transactionsStore.loading" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useTransactionsStore } from '@/stores/transactions'
  import Table from '@/components/table/Table.vue'

  // Accessing the Pinia store
  const transactionsStore = useTransactionsStore()

  const columns = [
    { field: 'timestamp', header: 'Date' },
    { field: 'hash', header: 'Tx Hash' },
    { field: 'sender', header: 'From' },
    { field: 'icon', header: 'Icon' },
    { field: 'recipient', header: 'To' },
    { field: 'data.memo', header: 'Memo' },
    { field: 'status', header: 'Status' },
    { field: 'amount', header: 'Amount' },
  ]

  onMounted(() => {
    transactionsStore.fetchTransactions()
  })
</script>