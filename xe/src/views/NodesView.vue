<template>
  <div class="blocks">
    <h1 class="mb-6">Nodes</h1>
    <Table :title="'Nodes'" :data="nodesStore.nodesList?.record?.results" :cols="columns" :loading="nodesStore.loading" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useNodesStore } from '@/stores/nodes'
  import Table from '@/components/table/Table.vue'

  // Accessing the Pinia store
  const nodesStore = useNodesStore()

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
    nodesStore.fetchNodes()
  })
</script>