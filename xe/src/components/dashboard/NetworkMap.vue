<template>
	<div class="lg:col-12 md:col-12 col-12">
		<Panel header="Network Map">
			<Loader v-if="nodesStore.loader" />
			<Map v-else :markers="geoNodes" />
		</Panel>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useNodesStore } from '@/stores/nodes'
	import Map from '@/components/map/Map.vue'
	import Loader from '@/components/loader/Loader.vue'

	const nodesStore = useNodesStore(),
		geoNodes = ref([])

	onMounted(() => {
		initNodesData()
	})

	const initNodesData = async () => {
		await nodesStore.fetchNodes()
		formatNodes()
	}

	const formatNodes = () => {
		const records = nodesStore.nodesList?.record?.results || []
		geoNodes.value = records.map(item => item.node.geo)
	}
</script>