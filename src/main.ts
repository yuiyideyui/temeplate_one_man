import '@/assets/css/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/font/font.less'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import jsxTable from './Directives/vJsxTable'
import jsxDom from './Directives/vJsxDom'
const app = createApp(App)
app.directive('jsxTable', jsxTable)
app.directive('jsxDom', jsxDom)
app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
