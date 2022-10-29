/// <reference types="vite/client" />

/*
 * 这里如果没有声明的话，默认导入.vue文件会报错。
 * 同时如果安装了TypeScript Vue Plugin(Volar)插件也会帮我们声明.vue文件。
 * 所以，我们自己来声明，是最保险的方式。
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const src: DefineComponent
  export default src
}
