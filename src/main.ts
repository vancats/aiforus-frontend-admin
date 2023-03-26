// import '@unocss/reset/antfu.css'
import './styles/reset.css'
import './styles/main.css'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)
app.mount('#app')
