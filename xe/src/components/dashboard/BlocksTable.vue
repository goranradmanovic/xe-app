<template>
	<div class="col-6">
		<Loader v-if="blocksStore.loading" />
		<Table v-else :title="'Recent Blocks'" :data="blockList" :cols="blocksColumns" :loading="blocksStore.loading" :relativeTime="true" :smTable="true" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useBlocksStore } from '@/stores/blocks'
	import Table from '@/components/table/Table.vue'
	import Loader from '@/components/loader/Loader.vue'

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