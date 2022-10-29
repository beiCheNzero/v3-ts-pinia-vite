// export const BASE_URL = 'http://codercba.com:8000'
// export const TIME_OUT = 10000

let BASE_URL = ''
let TIME_OUT = 10000

// console.log(import.meta.env.DEV) // true  开发环境
// console.log(import.meta.env.PROD) // false   生产环境
// console.log(import.meta.env.SSR) //  false 服务端渲染
// console.log(import.meta.env.MODE) // 模式 development/production

if (import.meta.env.DEV) {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://152.136.185.210:4000'
}

/*
 * 通过.env创建变量
 */
// console.log(import.meta.env)
// 开发环境
// VITE_BASE_URL:"http://codercba.com:development"
// VITE_NAME:"ALL MODE"

// 生产环境
// VITE_BASE_URL:"http://codercba.com:production"
// VITE_NAME:"ALL MODE"

export { BASE_URL, TIME_OUT }
