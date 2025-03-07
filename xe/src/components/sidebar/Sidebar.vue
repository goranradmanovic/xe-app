<template>
	<aside class="sidebar min-h-screen flex flex-column gap-6 align-items-center px-2 py-4 transition-duration-400 transition-ease-in" :style="{ width: sidebarStore.getSidebarWidth }">
		<img src="../../assets/images/xe-logo.svg" alt="logo" />

		<nav class="flex flex-column gap-3 w-full">
			<template v-for="link in links" :key="link.text">
				<SidebarLink :to="link.path" :icon="link.icon">{{ link.text }}</SidebarLink>
			</template>
		</nav>

		<span @click="sidebarStore.toggleSidebar" class="sidebar__collapse">
			<i class="text-2xl pi" :class="{ 'pi-chevron-left': !sidebarStore.getCollapsed, 'pi-chevron-right': sidebarStore.getCollapsed}"></i>
		</span>
	</aside>
</template>

<script setup>
	import { ref } from 'vue'
	import { useSidebarStore } from '@/stores/sidebar'
	import SidebarLink from './SidebarLink.vue'

	const links = ref([
		{ 
			path: '/',
			icon: 'pi-table',
			text: 'Overview'
		},
		{ 
			path: '/blocks',
			icon: 'pi-box',
			text: 'Blocks'
		},
		{ 
			path: '/transactions',
			icon: 'pi-send',
			text: 'Transactions'
		},
		{ 
			path: '/nodes',
			icon: 'pi-sitemap',
			text: 'Nodes'
		}
	])

	// Accessing the Pinia store
	const sidebarStore = useSidebarStore()
</script>