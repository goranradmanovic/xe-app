<template>
  <div class="nodes grid">
    <div class="col-12">
      <h1 class="mb-1">Nodes</h1>
    </div>
    <div class="col-12">
      <Table :title="'Nodes'" :data="nodesStore.nodesList?.record?.results" :cols="columns" :loading="nodesStore.loading" :relativeTime="true" />
    </div>
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