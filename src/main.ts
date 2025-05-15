import '@/assets/css/main.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/font/font.less'
import App from './App.vue'
import router from './router'
// element-plus
import ElementPlus from 'element-plus'
// import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/dist/index.css'
// import 'dayjs/locale/zh-cn' // 中文
import locale from 'element-plus/es/locale/lang/zh-cn' // 中文
import { VueQueryPlugin } from '@tanstack/vue-query'
import jsxTable from './Directives/vJsxTable'
import jsxDom from './Directives/vJsxDom'
const app = createApp(App)
app.directive('jsxTable', jsxTable)
app.directive('jsxDom', jsxDom)
app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app')
