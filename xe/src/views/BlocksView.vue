<template>
  <div class="blocks grid">
    <div class="col-12">
      <h1 class="mb-6">Blocks</h1>
    </div>
    <div class="col-12">
      <Table :title="'Blocks'" :data="blocksStore.blocksList?.record?.results" :cols="columns" :loading="blocksStore.loading" :relativeTime="true" />
    </div>
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