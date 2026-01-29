import '@/assets/css/main.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/font/font.less'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// element-plus
import ElementPlus from 'element-plus'
// import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/dist/index.css'
// import 'dayjs/locale/zh-cn' // 中文
import locale from 'element-plus/es/locale/lang/zh-cn' // 中文
import { VueQueryPlugin } from '@tanstack/vue-query'
import jsxTable from './Directives/vJsxTable'
import transitionText from './Directives/vTransitionText'
import jsxDom from './Directives/vJsxDom'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.directive('jsxTable', jsxTable)
app.directive('transition-text', transitionText)
app.directive('jsxDom', jsxDom)
app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app')
