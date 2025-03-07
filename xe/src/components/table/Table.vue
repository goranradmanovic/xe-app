<template>
	<Panel :header="title">
		<DataTable 
			v-model:filters="filters"
			:value="data" 
			paginator 
			:rows="10" 
			:rowsPerPageOptions="[5, 10, 20, 50]" 
			:loading="loading" 
			stripedRows 
			tableStyle="min-width: 50rem"
			responsiveLayout="scroll"
		>
			<template #header>
				<div class="flex justify-content-end">
					<IconField>
						<InputIcon>
							<i class="pi pi-search text-primary-500" />
						</InputIcon>
						<InputText v-model="filters['global'].value" placeholder="Keyword Search" />
					</IconField>
				</div>
			</template>
			<template #empty>No data found.</template>
			<template #loading> 
				<div class="flex flex-column gap-4 justify-items-center align-items-center text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="F1F1F1"d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" opacity=".25"/><path fill="#FFF" d="M10.14 1.16a11 11 0 0 0-9 8.92A1.59 1.59 0 0 0 2.46 12a1.52 1.52 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.42 1.42 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
					<h2>Loading data. Please wait.</h2>
				</div>
			</template>

			<Column v-for="col of coulmns" :key="col.field" :field="col.field" :header="col.header" class="table__col">
				<template #body="{ data }">
					<template v-if="col.field === 'timestamp' || col.field === 'lastActive'">
						<span class="inline-flex align-items-center gap-2 text-color-secondary">
							<template v-if="relativeTime"><i class="pi pi-clock" /> {{ useRelativeDateTime(data[col.field]) }}</template>
							<template v-else>{{ useDateTime(data[col.field]) }}</template>
						</span>
					</template>
					<template v-else-if="col.field === 'data'">
						<span class="ellipsis">{{ data[col.field]?.memo }}</span>
					</template>
					<template v-else-if="col.field === 'icon'">
						<i class="pi pi-arrow-right text-primary-500"></i>
					</template>
					<template v-else-if="col.field === 'status'">
						<span class="flex gap-2 justify-items-center align-items-center">
							<i class="pi pi-check-circle text-primary-500"></i> Completed
						</span>
					</template>
					<template v-else-if="col.field === 'amount'">
						<span class="ellipsis monospace">{{ useFormatNumber(data[col.field]) }}</span>
					</template>
					<template v-else-if="col.field === 'address' || col.field === 'stake'">
						<span class="ellipsis monospace">{{ data['node'][col.field] }}</span>
					</template>
					<template v-else-if="col.field === 'type'">
						<span class="ellipsis capitalize">{{ data['node'][col.field] }}</span>
					</template>
					<template v-else-if="col.field === 'geo'">
						<span class="ellipsis">
							{{ data['node'][col.field]?.city }}{{ data['node'][col.field]?.city ? ',' : '' }} {{ data['node'][col.field]?.country }}
						</span>
					</template>
					<template v-else-if="col.field === 'availability'">
						<span class="ellipsis monospace">{{ useFormatPercentage(data[col.field]) }}</span>
					</template>
					<template v-else-if="col.field === 'online'">
						<span class="flex gap-2 justify-items-center align-items-center">
							<i class="pi pi-wifi" :class="{ 'text-primary-500': data[col.field] }"></i>
							{{ data[col.field] ? 'Online' : 'Offline' }}
						</span>
					</template>
					<template v-else>
						<span class="ellipsis monospace">{{ data[col.field] }}</span>
					</template>
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
		title: {
			type: String,
			required: false,
			default: ''
		},
		cols: {
			type: Array,
			required: true,
			default: []
		},
		data: {
			type: Array,
			required: true,
			default: []
		},
		removedField: {
			type: String,
			required: false,
			default: ''
		},
		loading: {
			type: Boolean,
			required: true,
			default: false
		},
		relativeTime: {
			type: Boolean,
			required: true,
			default: false
		}
	})

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS }
	})

	const coulmns = computed(() => props.removedField ? smTableCols() : props.cols)

	const filteredCols = () => props.cols.filter(item => item.field === props.removedField)
</script>