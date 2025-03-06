<template>
	<RouterLink :to="to" 
		class="sidebar__link flex gap-3 align-items-center h-4rem p-3 border-round-sm text-lg no-underline" 
		:class="{ 'active': isActive, 'collapsed': sidebarStore.getCollapsed }">

		<i class="sidebar__link__icon text-2xl pi" :class="icon" />

		<transition name="fade">
			<span v-if="!sidebarStore.getCollapsed">
				<slot />
			</span>
		</transition>
	</RouterLink>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, RouterLink } from 'vue-router'
	import { useSidebarStore } from '@/stores/sidebar'

	const props = defineProps({
		to: { type: String, required: true },
		icon: { type: String, required: true }
	})

	// Accessing the Pinia store
	const sidebarStore = useSidebarStore(),
		route = useRoute(),
		isActive = computed(() => route.path === props.to)
</script>