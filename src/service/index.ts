import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import LjlRequest from './request'

const ljlRequest = new LjlRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers!.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})

// export const ljlRequest2 = new LjlRequest({
//   baseURL: 'http://codercba.com:1888/airbnb/api',
//   timeout: 8000,

//   interceptors: {
//     requestSuccessFn: (config) => {
//       return config
//     },
//     requestFailureFn: (err) => {
//       return err
//     },
//     responseSuccessFn: (res) => {
//       return res
//     },
//     responseFailureFn: (err) => {
//       return err
//     }
//   }
// })

export default ljlRequest
