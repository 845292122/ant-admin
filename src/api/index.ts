import { message } from 'antd'
import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'
import { getDefaultStore } from 'jotai'
import { authJotai } from '~/store'

export class Request {
  service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API
      // timeout: 5000
    })

    // * 请求拦截器
    this.service.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        const store = getDefaultStore()
        const token = store.get(authJotai.tokenAtom)
        if (token) {
          request.headers['Authorization'] = 'Bearer ' + token
        }

        return request
      },
      (error: AxiosError) => {
        Promise.reject(error)
      }
    )

    // * 响应拦截器
    this.service.interceptors.response.use(
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
        const status = error.response?.status
        const errMsg = error.response?.data as string

        let msg: string

        // * 错误处理
        switch (status) {
          case 400:
            msg = errMsg ?? '请求失败'
            break
          case 401:
            msg = errMsg ?? '登录失效，请重新登录'
            break
          case 403:
            msg = errMsg ?? '权限不足，请联系管理员'
            break
          default:
            msg = errMsg ?? 'Internal Server Error'
            break
        }

        message.error(msg)
        return Promise.reject(msg)
      }
    )
  }

  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.service.get(url, config)
  }

  post<T = unknown>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T> {
    return this.service.post(url, data, config)
  }

  put<T = unknown>(url: string, data: T, config?: AxiosRequestConfig): Promise<T> {
    return this.service.put(url, data, config)
  }

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.service.delete(url, config)
  }

  // TODO: 上传文件
}

export default new Request()

// * 导出api模块
export * from './auth.api'
export * from './user.api'
export * from './perm.api'
export * from './tenant.api'
