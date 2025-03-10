<template>
	<Panel :header="title">
		<DataTable 
			v-model:filters="filters"
			:value="data" 
			:paginator="!smTable"
			:rows="10" 
			:rowsPerPageOptions="[5, 10, 20, 50]" 
			:loading="loading" 
			stripedRows 
			scrollable
			tableClass="xxx"
		>
			<!-- Search Header -->
			<template #header v-if="!smTable">
				<div class="flex lg:justify-content-end justify-content-center">
					<IconField>
						<InputIcon>
							<i class="pi pi-search text-primary-500" />
						</InputIcon>
						<InputText v-model="filters.global.value" placeholder="Keyword Search" />
					</IconField>
				</div>
			</template>

			<!-- No Data / Loading States -->
			<template #empty>No data found.</template>

			<template #loading> 
				<div class="flex flex-column gap-4 justify-center align-items-center text-white">
					<Loader />
					<h2>Loading data. Please wait.</h2>
				</div>
			</template>

			<!-- Table Columns -->
			<Column v-for="col in cols" :key="col.field" :field="col.field" :header="col.header" class="table__col" :class="{ 'table__col--sm': smTable }">
				<template #body="{ data }">
					<slot name="cell" :col="col" :data="data">
						<span v-if="col.field in formatters" class="ellipsis">
							{{ formatters[col.field](data) }}
						</span>
						<i v-else-if="col.field === 'icon'" class="pi pi-arrow-right text-primary-500"></i>
						<span v-else class="ellipsis monospace">{{ data[col.field] }}</span>
					</slot>
				</template>
			</Column>
		</DataTable>
	</Panel>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { FilterMatchMode } from '@primevue/core/api'
	import { useFormatNumber } from '@/composable/formatNumber.js'
	import { useFormatPercentage } from '@/composable/formatPercentage.js'
	import { useDateTime, useRelativeDateTime } from '@/composable/formatDateTime.js'
	import Loader from '@/components/loader/Loader.vue'

	const props = defineProps({
		title: { type: String, default: '' },
		cols: { type: Array, required: true },
		data: { type: Array, required: true, default: [] },
		loading: { type: Boolean, default: false },
		relativeTime: { type: Boolean, default: false },
		smTable: { type: Boolean, default: false },
	}),
	dateFormat = 'l LTS'

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	})

	// Formatters for specific fields
	const formatters = computed(() => ({
		timestamp: data => props.relativeTime ? useRelativeDateTime(data.timestamp) : useDateTime(data.timestamp, dateFormat),
		lastActive: data => props.relativeTime ? useRelativeDateTime(data.lastActive) : useDateTime(data.lastActive, dateFormat),
		data: data => data.data?.memo || '-',
		status: () => '✔ Completed',
		amount: data => useFormatNumber(data.amount),
		address: data => data.node?.address || '-',
		stake: data => data.node?.stake || '-',
		type: data => data.node?.type || '-',
		geo: data => `${data.node?.geo?.city || ''}${data.node?.geo?.city ? ',' : ''} ${data.node?.geo?.country || ''}`,
		availability: data => useFormatPercentage(data.availability),
		online: data => (data.online ? '✅ Online' : '❌ Offline'),
	}))
</script>
