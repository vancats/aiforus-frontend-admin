import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import router from '../router'
import { convertObjectKeysToCamelCase, convertObjectKeysToSnakeCase, getLocalItem, removeLocalItem } from '.'
import naiveui from '~/utils/naiveui'
import { FILE_URL } from '~/api'

// 定义请求响应参数，不含data
interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T
}

const URL = import.meta.env.VITE_BASE_URL

enum RequestEnums {
  SUCCESS = 200, // 请求成功
  FAIL = 400, // 请求失败
  OVERDUE = 401, // 登录失效
  TIMEOUT = 10000,
}

const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  //   timeout: RequestEnums.TIMEOUT,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getLocalItem('token') || ''
        if (token) config.headers.set('Authorization', `Bearer ${token}`)
        if (config.url !== FILE_URL) {
          // 将接口的 key 转为 snake case
          config.data = convertObjectKeysToSnakeCase(config.data)
        }
        return config
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      },
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response // 解构
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          removeLocalItem('token')
          router.push('/login')
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data?.code !== RequestEnums.SUCCESS) {
          naiveui.message.warning('请求失败')
          return Promise.reject(data)
        }
        // 将接口的 key 转为小驼峰
        return convertObjectKeysToCamelCase(data)
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) this.handleCode(response.status)
        if (!window.navigator.onLine) naiveui.message.error('网络连接失败')
      },
    )
  }

  handleCode = (code: number) => {
    switch (code) {
      case RequestEnums.FAIL:
        naiveui.message.error('请求失败')
        break
      case RequestEnums.OVERDUE:
        removeLocalItem('token')
        router.push('/login')
        break
      default:
        naiveui.message.error('请求失败')
        break
    }
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object, config?: object): Promise<ResultData<T>> {
    return this.service.post(url, params, config)
  }

  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default new RequestHttp(config)
