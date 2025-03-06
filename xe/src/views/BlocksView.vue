<template>
  <div class="blocks">
    <h1>This is an Blocks page</h1>
  </div>
</template>

<script setup>
  import { useBlocksStore } from '@/stores/blocks'

  // Accessing the Pinia store
  const blocksStore = useBlocksStore()


  blocksStore.fetchBlocks()
  console.log('blocks view loading 1 - ', blocksStore.loading)
  console.log('blocks view - ', blocksStore.blocksList)
  console.log('blocks view loading 2 - ', blocksStore.loading)
</script>