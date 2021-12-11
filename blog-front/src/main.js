import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from '@/api'

const app = createApp(App)

// style
import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// api
app.config.globalProperties.$api = api

app.use(router).use(ElementPlus)

app.mount('#app')
