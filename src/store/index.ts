import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

function registerStore(app: App<Element>) {
  app.use(pinia)
  // 解决界面刷新数据丢失的问题。
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheActions()
}

export default registerStore
