<template>
  <div class="overview grid">
    <div class="col-12">
      <h1 class="mb-6">Overview</h1>
    </div>
    <div class="col-6">
      <Panel header="On Chain Revenue">
        <Chart type="line" :data="chartData" :options="chartOptions" class="overview__chart" />
      </Panel>
    </div>
    <div class="col-6">
      <Panel header="Coin Value"></Panel>
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
  import { useBlocksStore } from '@/stores/blocks'
  import { useTransactionsStore } from '@/stores/transactions'
  import { useRevenueStore } from '@/stores/revenue'
  import Table from '@/components/table/Table.vue'

  // Table Section
  // Accessing the Pinia store
  const blocksStore = useBlocksStore(),
    transactionsStore = useTransactionsStore(),
    revenueStore = useRevenueStore()

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
  const chartData = ref(),
    chartOptions = ref(),
    labels = [],
    data = []
        
  const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement)

    return {
        //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: labels,
        datasets: [
          /*{
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              tension: 0.4,
              borderColor: documentStyle.getPropertyValue('--p-cyan-500')
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderDash: [5, 5],
              tension: 0.4,
              borderColor: documentStyle.getPropertyValue('--p-orange-500')
          },*/
          {
              label: 'Revenue',
              //data: [12, 51, 62, 33, 21, 62, 45],
              data: data,
              fill: true,
              borderColor: documentStyle.getPropertyValue('--p-green-600'),
              tension: 0.4,
              backgroundColor: 'rgba(110, 224, 159, 1)'
          }
      ]
    }
  }

  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement),
      textColor = documentStyle.getPropertyValue('--p-text-color'),
      textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color'),
      //surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')
      surfaceBorder = documentStyle.getPropertyValue('border-transparent')

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
              color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder
          }
        },
        y: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder
          }
        }
      }
    }
  }

  onMounted(() => {
    formatChartData()
    //blocksStore.fetchBlocks()
    //transactionsStore.fetchTransactions()

    blockList.value = blocksStore.blocksList?.record?.results.slice(0, 10)
    transactionsList.value = transactionsStore.transactionsList?.record?.results.slice(0, 10)

    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  })

  const formatChartData = () => {
    revenueStore.fetchRevenue()

    revenueStore.revenueList?.record?.results.forEach(item => {
      labels.push(useDateChart(item.start))
      data.push(item.amount)
    })
  }
</script>