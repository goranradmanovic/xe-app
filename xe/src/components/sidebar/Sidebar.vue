<template>
    <aside class="sidebar min-h-screen flex flex-column gap-6 align-items-center px-2 py-4 " :class="{ 'open__menu': !sidebarStore.getCollapsed, 'close__menu': sidebarStore.getCollapsed }">
        <img src="@/assets/images/logo.svg" alt="logo" class="sidebar__logo" />

        <nav class="flex flex-column gap-3 w-full">
            <template v-for="link in links" :key="link.text">
                <SidebarLink :to="link.path" :icon="link.icon">{{ link.text }}</SidebarLink>
            </template>
        </nav>

        <Button :icon="btnIcon" aria-label="Menu" class="sidebar__collapse" @click="sidebarStore.toggleSidebar" />
    </aside>
</template>

<script setup>
    import { ref, computed } from 'vue'
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
        },
        { 
            path: '/settings',
            icon: 'pi-cog',
            text: 'Settings'
        },
        { 
            path: '/profile',
            icon: 'pi-user',
            text: 'Profile'
        }
    ])

    // Accessing the Pinia store
    const sidebarStore = useSidebarStore()

    const btnIcon = computed(() => !sidebarStore.getCollapsed ? 'pi pi-chevron-left' : 'pi pi-chevron-right')
</script>