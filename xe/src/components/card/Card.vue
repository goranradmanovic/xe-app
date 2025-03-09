<template>
	<Card>
		<template #title>{{ title }}</template>
		<template #content>
			<p lass="m-0">
				<i class="pi mr-1 text-3xl" :class="iconClass"></i>
				<span class="text-4xl card__txt-cls">{{ content }}</span>
			</p>
		</template>
	</Card>
</template>

<script setup>
	const props = defineProps({
		title: { type: String, default: '' },
		content: { type: String, default: '' },
		iconClass: { type: String, default: '' }
	})
</script>