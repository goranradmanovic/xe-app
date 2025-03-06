<template>
	<aside class="sidebar h-screen flex flex-column gap-6 align-items-center px-2 py-4 transition-duration-400 transition-ease-in" :style="{ width: sidebarStore.getSidebarWidth }">
		<img src="../../assets/images/xe-logo.svg" alt="logo" />

		<nav class="flex flex-column gap-3 w-full">
			<SidebarLink to="/" icon="pi-home">Dashboard</SidebarLink>
			<SidebarLink to="/blocks" icon="pi-th-large">Blocks</SidebarLink>
		</nav>

		<span @click="sidebarStore.toggleSidebar" class="sidebar__collapse">
			<i class="text-2xl pi" :class="{ 'pi-chevron-left': !sidebarStore.getCollapsed, 'pi-chevron-right': sidebarStore.getCollapsed}"></i>
		</span>
	</aside>
</template>

<script setup>
	import { useSidebarStore } from '@/stores/sidebar'
	import SidebarLink from './SidebarLink.vue'

	// Accessing the Pinia store
	const sidebarStore = useSidebarStore()
</script>