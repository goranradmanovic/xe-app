<template>
	<div class="lg:col-6 md:col-12 col-12">
		<Table :title="'Recent Blocks'" :data="blockList" :cols="blocksColumns" :loading="blocksStore.loading" :relativeTime="true" :smTable="true" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useBlocksStore } from '@/stores/blocks'
	import Table from '@/components/table/Table.vue'

	const blocksStore = useBlocksStore(),
		blockList = ref([]),
		blocksColumns = [
			{ field: 'height', header: 'Height' },
			{ field: 'hash', header: 'Hash' },
			{ field: 'total', header: 'Txs' },
			{ field: 'txCount', header: 'Total XE' },
			{ field: 'timestamp', header: 'Mined' }
		]

	onMounted(() => {
		initBlocksData()
	})

	const initBlocksData = async () => {
		await blocksStore.fetchBlocks()
		blockList.value = blocksStore.blocksList?.record?.results.slice(0, 10)
	}
</script>