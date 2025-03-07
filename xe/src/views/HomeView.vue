<template>
  <div class="overview grid">
    <div class="col-12">
      <h1 class="mb-6">Overview</h1>
    </div>
    <div class="col-6">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">6</div>
    </div>
    <div class="col-6">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">6</div>
    </div>
    <div class="col-6">
      <Table :title="'Recent Blocks'" :data="blockList" :cols="blocksColumns" :loading="blocksStore.loading" :relativeTime="true" :smTable="true" />
    </div>
    <div class="col-6">
      <Table :title="'Recent Transactions'" :data="transactionsList" :cols="transactionsColumns" :loading="transactionsStore.loading" :smTable="true" />
    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted, computed, reactive } from 'vue'
  import { useBlocksStore } from '@/stores/blocks'
  import { useTransactionsStore } from '@/stores/transactions'
  import Table from '@/components/table/Table.vue'

  // Accessing the Pinia store
  const blocksStore = useBlocksStore(),
    transactionsStore = useTransactionsStore()

  const blocksColumns = [
    { field: 'height', header: 'Height' },
    { field: 'hash', header: 'Hash' },
    { field: 'total', header: 'Txs' },
    { field: 'txCount', header: 'Total XE' },
    { field: 'timestamp', header: 'Mined' }
  ]

  const transactionsColumns = [
    { field: 'hash', header: 'Hash' },
    { field: 'sender', header: 'From' },
    { field: 'recipient', header: 'To' },
    { field: 'amount', header: 'Amount XE' }
  ]

  const blockList = ref([]),
    transactionsList = ref([])

  


  onMounted(() => {
    blocksStore.fetchBlocks()
    transactionsStore.fetchTransactions()

    blockList.value = blocksStore.blocksList?.record?.results.slice(0, 10)
    transactionsList.value = transactionsStore.transactionsList?.record?.results.slice(0, 10)
  })
</script>