<template>
	<div class="lg:col-6 md:col-12 col-12">
		<Table :title="'Recent Transactions'" :data="transactionsList" :cols="transactionsColumns" :loading="transactionsStore.loading" :smTable="true" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useTransactionsStore } from '@/stores/transactions'
	import Table from '@/components/table/Table.vue'

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