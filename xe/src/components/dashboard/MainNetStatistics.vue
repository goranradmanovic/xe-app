<template>
    <div class="col-12">
      <h3 class="">MainNet Statistics</h3>
    </div>

    <div class="lg:col-6 md:col-12 col-12">
      <Panel>
        <Loader v-if="mainNetStatStore.loading" />
        <div class="grid fade-in" v-else>
          <div class="lg:col-6 col-12">
            <Card :title="'Blocks Total'" 
              :content="useFormatBigNumber(mainNetStat?.blocks?.total)"
              :iconClass="'pi-box text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Blocks last 24 hrs'" 
              :content="useFormatBigNumber(mainNetStat?.blocks?.day)" 
              :iconClass="'pi-box text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Transactions Total'" 
              :content="useFormatBigNumber(mainNetStat?.transactions?.total)" 
              :iconClass="'pi-send text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Transactions last 24 hrs'" 
              :content="mainNetStat?.transactions?.day" 
              :iconClass="'pi-send text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Block Time last 24 hrs'" 
              :content="mainNetStat?.blocks?.time + 's'" 
              :iconClass="'pi-clock text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Blocks / Hour last 24 hrs'" 
              :content="mainNetStat?.blocks?.hour" 
              :iconClass="'pi-clock text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Stakes Total'" 
              :content="mainNetStat?.stakes?.count" 
              :iconClass="'pi-exclamation-triangle text-500'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'Staked XE 20.5% of supply'" 
              :content="useFormatBigNumber(mainNetStat?.stakes?.stakedAmount)" 
              :iconClass="'pi-exclamation-triangle text-500'" />
          </div>
        </div>
      </Panel>
    </div>
    <div class="lg:col-6 md:col-12 col-12">
      <Panel>
        <Loader v-if="mainNetStatStore.loading" />
        <div class="grid fade-in" v-else>
          <div class="col-12">
            <a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" class="overview__link flex">
              <img src="@/assets/images/blockchain-placeholder.webp" alt="Blockchain image placeholder" class="overview__link__img"/>
            </a>
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'XE Earning total'" 
              :content="useFormatBigNumber(mainNetStat?.ernings?.allTime.amount)"
              :iconClass="'pi-wave-pulse text-red-600'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'XE Earning last 24h'" 
              :content="useFormatBigNumber(mainNetStat?.ernings?.['24h']?.amount)" 
              :iconClass="'pi-wave-pulse text-red-600'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'XE Burned total'" 
              :content="useFormatBigNumber(mainNetStat?.burns?.total.amount)"
              :iconClass="'pi-bolt text-yellow-600'" />
          </div>
          <div class="lg:col-6 col-12">
            <Card :title="'XE Burned last 30 days'" 
              :content="useFormatBigNumber(mainNetStat?.burns?.['30d'].amount)" 
              :iconClass="'pi-bolt text-yellow-600'" />
          </div>
        </div>
      </Panel>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useMainNetStatStore } from '@/stores/mainnetstat'
    import { useFormatBigNumber } from '@/composable/formatBigNumber.js'
    import Card from '@/components/card/Card.vue'
    import Loader from '@/components/loader/Loader.vue'

    const mainNetStatStore = useMainNetStatStore(),
      mainNetStat = ref([])

    onMounted(() => {
      initMainNetStat()
    })

    const initMainNetStat = async () => {
      await mainNetStatStore.fetchMainNetStat()
      mainNetStat.value = mainNetStatStore.mainNetStatList?.record || []
    }
</script>