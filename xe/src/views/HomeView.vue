<template>
  <div class="overview grid">
    <div class="col-12">
      <h1 class="mb-6">Overview</h1>
    </div>

    <div class="col-12">
      <h3 class="">MainNet Statistics</h3>
    </div>

    <div class="col-6">
      <Panel header="MainNet Statistics">
      </Panel>
    </div>
    <div class="col-6">
      <Panel header="">
      </Panel>
    </div>
    <div class="col-6">
      <Panel header="On Chain Revenue">
        <Chart type="line" :data="chainChartData" :options="chartOptions" class="overview__chart" />
      </Panel>
    </div>
    <div class="col-6">
      <Panel header="Coin Value">
        <Chart type="line" :data="coinChartData" :options="chartOptions" class="overview__chart" />
      </Panel>
    </div>
    <div class="col-12">
      <Panel header="Network Map">
        <Map :markers="geoNodes" />
      </Panel>
    </div>
    <div class="col-6">
      <Table :title="'Recent Blocks'" :data="blockList" :cols="blocksColumns" :loading="blocksStore.loading" :relativeTime="true" :smTable="true" />
    </div>
    <div class="col-6">
      <Table :title="'Recent Transactions'" :data="transactionsList" :cols="transactionsColumns" :loading="transactionsStore.loading" :smTable="true" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useDateChart } from '@/composable/formatDateTime.js'
  import { useChartOptions } from '@/composable/setChartOptions.js'
  import { useChartData } from '@/composable/setChartData.js'
  import { useBlocksStore } from '@/stores/blocks'
  import { useTransactionsStore } from '@/stores/transactions'
  import { useRevenueStore } from '@/stores/revenue'
  import { useCoinStore } from '@/stores/coin'
  import { useNodesStore } from '@/stores/nodes'
  import Table from '@/components/table/Table.vue'
  import Map from '@/components/map/Map.vue'

  // Table Section
  // Accessing the Pinia store
  const blocksStore = useBlocksStore(),
    transactionsStore = useTransactionsStore(),
    revenueStore = useRevenueStore(),
    coinStore = useCoinStore(),
    nodesStore = useNodesStore()

  const blocksColumns = [
    { field: 'height', header: 'Height' },
    { field: 'hash', header: 'Hash' },
    { field: 'total', header: 'Txs' },
    { field: 'txCount', header: 'Total XE' },
    { field: 'timestamp', header: 'Mined' }
  ]

  const transactionsColumns = [
    { field: 'hash', header: 'Hash' },
    { field: 'sender', header: 'From' },
    { field: 'recipient', header: 'To' },
    { field: 'amount', header: 'Amount XE' }
  ]

  const blockList = ref([]),
    transactionsList = ref([])


  // Chart Section
  const documentStyle = getComputedStyle(document.documentElement),
    chartOptions = useChartOptions(),
    chainChartData = ref(),
    coinChartData = ref()
        
  // Map section
  const geoNodes = ref([])


  onMounted(() => {
    // initChartData()
    initNodesData()
    // initBlocksData()
    // initTransactionsData()
  })

  const initChartData = () => {
    formatChainChartData()
    formatCoinChartData()
  }

  const initNodesData = async () => {
    await nodesStore.fetchNodes()
    formatNodes()
  }

  const initBlocksData = async () => {
    await blocksStore.fetchBlocks()
    blockList.value = blocksStore.blocksList?.record?.results.slice(0, 10)
  }

  const initTransactionsData = async () => {
    await transactionsStore.fetchTransactions()
    transactionsList.value = transactionsStore.transactionsList?.record?.results.slice(0, 10)
  }

  const formatChainChartData = async () => {
    await revenueStore.fetchRevenue()

    const records = revenueStore.revenueList?.record?.results || []

    const chainLabels = records.map(item => useDateChart(item.start))
    const chainData = records.map(item => item.amount)

    const greenColor = documentStyle.getPropertyValue('--p-green-600')

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

  const formatNodes = () => {
    const records = nodesStore.nodesList?.record?.results || []
    geoNodes.value = records.map(item => item.node.geo)
  }
</script>