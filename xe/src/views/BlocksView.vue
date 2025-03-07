<template>
  <div class="blocks">
    <h1 class="mb-6">Blocks</h1>
    <Table :title="'Blocks'" :data="blocksStore.blocksList?.record?.results" :cols="columns" :loading="blocksStore.loading" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useBlocksStore } from '@/stores/blocks'
  import Table from '@/components/table/Table.vue'

  // Accessing the Pinia store
  const blocksStore = useBlocksStore()

  const columns = [
    { field: 'height', header: 'Height' },
    { field: 'hash', header: 'Block Hash' },
    { field: 'dataHash', header: 'Data Hash' },
    { field: 'ledgerHash', header: 'Ledger Hash' },
    { field: 'total', header: 'Txs' },
    { field: 'txCount', header: 'Total XE' },
    { field: 'timestamp', header: 'Mined' }
  ]

  onMounted(() => {
    blocksStore.fetchBlocks()
  })
</script>