<template>
  <div class="overview grid">
    <div class="col-12">
      <h1 class="mb-1">Overview</h1>
    </div>

    <MainNetStatistics />
    <ChainChart />
    <CoinChart />
    <NetworkMap />
    <BlocksTable />
    <TransactionsTable />
  </div>
</template>

<script setup>
  import MainNetStatistics from '@/components/dashboard/MainNetStatistics.vue'
  import ChainChart from '@/components/dashboard/ChainChart.vue'
  import CoinChart from '@/components/dashboard/CoinChart.vue'
  import NetworkMap from '@/components/dashboard/NetworkMap.vue'
  import BlocksTable from '@/components/dashboard/BlocksTable.vue'
  import TransactionsTable from '@/components/dashboard/TransactionsTable.vue'
</script>