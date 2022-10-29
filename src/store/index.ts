import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)
  // 解决界面刷新数据丢失的问题。
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheActions()
}

export default registerStore
