<template>
	<div class="lg:col-6 md:col-12 col-12">
		<Panel header="Coin Value">
			<Loader v-if="coinStore.loader" />
			<Chart type="bar" :data="coinChartData" :options="chartOptions" class="overview__chart fade-in" />
		</Panel>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useCoinStore } from '@/stores/coin'
	import { useDateChart } from '@/composable/formatDateTime.js'
	import { useChartOptions } from '@/composable/setChartOptions.js'
	import { useChartData } from '@/composable/setChartData.js'
	import Loader from '@/components/loader/Loader.vue'

	const coinStore = useCoinStore(),
		documentStyle = getComputedStyle(document.documentElement),
		chartOptions = useChartOptions(),
		coinChartData = ref()

	onMounted(() => {
		formatCoinChartData()
	})

	const formatCoinChartData = async () => {
		await coinStore.fetchCoin()

		const records = coinStore.coinList?.record || []

		const coinLabels = records.map(item => useDateChart(item.date)),
			coinEthData = records.map(item => item.ethPerXE * 1000),
			coinUsdData = records.map(item => item.usdPerXE)

		const grayColor = documentStyle.getPropertyValue('--p-gray-500'),
			greenColor = documentStyle.getPropertyValue('--p-green-600')

		const coinDataset = [
			{ label: 'Price in ETH', data: coinEthData, fill: false, backgroundColor: grayColor, borderColor: grayColor, tension: 0.4 },
			{ label: 'Price in USD', data: coinUsdData, fill: false, backgroundColor: greenColor, borderColor: greenColor, tension: 0.4 }
		]

		coinChartData.value = useChartData(coinLabels, coinDataset)
	}
</script>