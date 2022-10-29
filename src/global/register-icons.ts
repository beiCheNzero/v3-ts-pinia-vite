import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    if ('Menu' != key) {
      app.component(key, component)
    } else {
      app.component(key + 'Icon', component)
    }
  }
}

export default registerIcons
