<template>
  <div class="transactions grid">
    <div class="col-12">
      <h1 class="mb-1">Transactions</h1>
    </div>
    <div class="col-12">
      <div class="transactions__wrapper">
        <Table :title="'Transactions'" :data="transactionsStore.transactionsList?.record?.results" :cols="columns" :loading="transactionsStore.loading" />
      </div>
    </div>
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
    { field: 'icon', header: '' },
    { field: 'recipient', header: 'To' },
    { field: 'data', header: 'Memo' },
    { field: 'status', header: 'Status' },
    { field: 'amount', header: 'Amount XE' },
  ]

  onMounted(() => {
    transactionsStore.fetchTransactions()
  })
</script>