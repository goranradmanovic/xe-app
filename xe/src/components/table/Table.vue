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
			tableStyle="width: 100%"
			responsiveLayout="scroll"
		>
			<!-- Search Header -->
			<template #header v-if="!smTable">
				<div class="flex justify-content-end">
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
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
						<path fill="#F1F1F1" d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" opacity=".25"/>
						<path fill="#FFF" d="M10.14 1.16a11 11 0 0 0-9 8.92A1.59 1.59 0 0 0 2.46 12a1.52 1.52 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.42 1.42 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53Z">
							<animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
						</path>
					</svg>
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

const props = defineProps({
	title: { type: String, default: '' },
	cols: { type: Array, required: true },
	data: { type: Array, required: true },
	loading: { type: Boolean, default: false },
	relativeTime: { type: Boolean, default: false },
	smTable: { type: Boolean, default: false },
})

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// Formatters for specific fields
const formatters = computed(() => ({
	timestamp: data => props.relativeTime ? useRelativeDateTime(data.timestamp) : useDateTime(data.timestamp),
	lastActive: data => props.relativeTime ? useRelativeDateTime(data.lastActive) : useDateTime(data.lastActive),
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
