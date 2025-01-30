import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAtomValue } from 'jotai'
import { authJotai } from '~/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
  // timeout: 5000,
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = useAtomValue(authJotai.tokenAtom)
    if (token) {
      request.headers['Authorization'] = 'Bearer ' + token
    }

    return request
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response.data

    // 文件对象直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }

    return Promise.resolve(data)
  },
  (error: AxiosError) => {
    const { status, message } = error

    let errMsg: string

    // * 错误处理
    if (status === 401) {
      errMsg = message ?? '登录失效，请重新登录'
    } else if (status === 403) {
      errMsg = message ?? '权限不足，请联系管理员'
    } else {
      if (message == 'Network Error') {
        errMsg = '后端接口连接异常'
      } else if (message.includes('timeout')) {
        errMsg = '系统接口请求超时'
      } else if (message.includes('Request failed with status code')) {
        errMsg = '系统接口' + message.substr(message.length - 3) + '异常'
      }
      errMsg = '请求失败，请联系管理员'
    }

    // TODO: 弹窗显示错误
    return Promise.reject(errMsg)
  }
)

// TODO: 通用下载方法

export default service

// * 导出api模块
export * from './modules/auth'
