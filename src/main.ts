import { createApp } from 'vue'
// 重置样式
import 'normalize.css'
import './assets/css/index.less'
// 全局注册图标
import icons from './global/register-icons'
// 针对ElMessage和ElLoading等组件引入样式
import 'element-plus/theme-chalk/el-message.css'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// 注册全局组件(全局注册图标)
app.use(icons)
app.use(store)
app.use(router)

app.mount('#app')
