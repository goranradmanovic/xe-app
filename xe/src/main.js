import '@maptiler/sdk/dist/maptiler-sdk.css'
import 'primeicons/primeicons.css'
import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// PrimeVue Components
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Chart from 'primevue/chart'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			prefix: 'p',
			darkModeSelector: 'light',
			cssLayer: false
		}
	}
})

app.component('Panel', Panel)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Chart', Chart)

app.mount('#app')
