<template>
	<div class="col-6">
		<Loader v-if="transactionsStore.loading" />
		<Table v-else :title="'Recent Transactions'" :data="transactionsList" :cols="transactionsColumns" :loading="transactionsStore.loading" :smTable="true" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useTransactionsStore } from '@/stores/transactions'
	import Table from '@/components/table/Table.vue'
	import Loader from '@/components/loader/Loader.vue'

	const transactionsStore = useTransactionsStore(),
		transactionsList = ref([]),
		transactionsColumns = [
			{ field: 'hash', header: 'Hash' },
			{ field: 'sender', header: 'From' },
			{ field: 'recipient', header: 'To' },
			{ field: 'amount', header: 'Amount XE' }
		]
   
	onMounted(() => {
		initTransactionsData()
	})

	const initTransactionsData = async () => {
		await transactionsStore.fetchTransactions()
		transactionsList.value = transactionsStore.transactionsList?.record?.results.slice(0, 10)
	}
</script>