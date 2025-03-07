<template>
  <div class="nodes">
    <h1 class="mb-6">Nodes</h1>
    <Table :title="'Nodes'" :data="nodesStore.nodesList?.record?.results" :cols="columns" :loading="nodesStore.loading" :relativeTime="true" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useNodesStore } from '@/stores/nodes'
  import Table from '@/components/table/Table.vue'

  // Accessing the Pinia store
  const nodesStore = useNodesStore()

  const columns = [
    { field: 'address', header: 'Address' },
    { field: 'stake', header: 'Stake' },
    { field: 'type', header: 'Type' },
    { field: 'geo', header: 'Location' },
    { field: 'availability', header: 'Availability' },
    { field: 'online', header: 'Status' },
    { field: 'lastActive', header: 'Last Seen' },
  ]

  onMounted(() => {
    nodesStore.fetchNodes()
  })
</script>