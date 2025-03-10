<template>
	<div class="lg:col-6 md:col-12 col-12">
		<Panel header="On Chain Revenue">
			<Loader v-if="revenueStore.loader" />
			<Chart type="line" :data="chainChartData" :options="chartOptions" class="overview__chart fade-in" />
		</Panel>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useDateTime } from '@/composable/formatDateTime.js'
	import { useChartOptions } from '@/composable/setChartOptions.js'
	import { useChartData } from '@/composable/setChartData.js'
	import { useRevenueStore } from '@/stores/revenue'
	import Loader from '@/components/loader/Loader.vue'

	const revenueStore = useRevenueStore(),
		documentStyle = getComputedStyle(document.documentElement),
		chartOptions = useChartOptions(),
		chainChartData = ref(),
		dateFormat = 'MMM D'

	onMounted(() => {
		formatChainChartData()
	})

	const formatChainChartData = async () => {
		await revenueStore.fetchRevenue()

		const records = revenueStore.revenueList?.record?.results || []

		const chainLabels = records.map(item => useDateTime(item.start, dateFormat)),
			chainData = records.map(item => item.amount),
			greenColor = documentStyle.getPropertyValue('--p-green-600')

		const chainDataset = [{
		  label: 'Revenue',
		  data: chainData,
		  fill: true,
		  borderColor: greenColor,
		  tension: 0.4,
		  backgroundColor: 'rgba(110, 224, 159, 1)'
		}]

		chainChartData.value = useChartData(chainLabels, chainDataset)
	}
</script>