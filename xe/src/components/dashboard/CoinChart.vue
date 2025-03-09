<template>
	<div class="col-6">
		<Panel header="Coin Value">
			<Loader v-if="coinStore.loader" />
			<Chart type="line" :data="coinChartData" :options="chartOptions" class="overview__chart" />
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

		const orangeColor = documentStyle.getPropertyValue('--p-orange-600'),
			greenColor = documentStyle.getPropertyValue('--p-green-600')

		const coinDataset = [
			{ label: 'Price in ETH', data: coinEthData, fill: false, borderColor: orangeColor, tension: 0.4 },
			{ label: 'Price in USD', data: coinUsdData, fill: false, borderColor: greenColor, tension: 0.4 }
		]

		coinChartData.value = useChartData(coinLabels, coinDataset)
	}
</script>