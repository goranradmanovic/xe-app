<template>
	<div class="col-6">
		<Panel header="On Chain Revenue">
			<Loader v-if="revenueStore.loader" />
			<Chart type="line" :data="chainChartData" :options="chartOptions" class="overview__chart" />
		</Panel>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useDateChart } from '@/composable/formatDateTime.js'
	import { useChartOptions } from '@/composable/setChartOptions.js'
	import { useChartData } from '@/composable/setChartData.js'
	import { useRevenueStore } from '@/stores/revenue'
	import Loader from '@/components/loader/Loader.vue'

	const revenueStore = useRevenueStore(),
		documentStyle = getComputedStyle(document.documentElement),
		chartOptions = useChartOptions(),
		chainChartData = ref()

	onMounted(() => {
		formatChainChartData()
	})

	const formatChainChartData = async () => {
		await revenueStore.fetchRevenue()

		const records = revenueStore.revenueList?.record?.results || []

		const chainLabels = records.map(item => useDateChart(item.start)),
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