<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as maptilersdk from '@maptiler/sdk'

const props = defineProps({
  markers: {
    type: Array,
    required: false,
    default: [],
  },
})

const MAPTILER_API_KEY = import.meta.env.VITE_MAP_API_KEY
const mapContainer = ref(null)
let mapInstance = null

// Watch for changes in props.markers and initialize the map only when it's not empty
watch(() => props.markers, (newMarkers) => {
    if (newMarkers.length > 0) {
      initMap()
    }
  },
  { immediate: true, deep: true } // Runs immediately if markers are already available
)

const initMap = () => {
  // Prevent re-initialization
  if (mapInstance) {
    mapInstance.remove() // Remove existing map before reloading with new markers
  }

  maptilersdk.config.apiKey = MAPTILER_API_KEY

  // Initialize map
  mapInstance = new maptilersdk.Map({
    container: mapContainer.value,
    style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
    center: [27.7349611, 15.851979], // [lng, lat]
    zoom: 1.5,
  })

  // Add markers dynamically
  props.markers.forEach(item => {
    if (item) {
      const marker = new maptilersdk.Marker({ color: '#0ECC5F' }).setLngLat([item.lng, item.lat]).addTo(mapInstance)
      const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(`<h3>${item?.country}, ${item?.city}</h3>`)

      marker.getElement().addEventListener('mouseenter', () => {
        popup.setLngLat([item.lng, item.lat]).addTo(mapInstance)
      })

      marker.getElement().addEventListener('mouseleave', () => {
        popup.remove()
      })

      // Cleanup when the map is removed
      mapInstance.on('remove', () => {
        marker.remove()
        popup.remove()
      })
    }
  })
}
</script>