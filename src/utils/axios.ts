import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import naiveui from '~/utils/naiveui'

// 定义请求响应参数，不含data
interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T
}

const URL = import.meta.env.VITE_BASEURL

enum RequestEnums {
  TIMEOUT = 10000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}

const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  router: Router
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    this.router = useRouter()

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token') || ''
        if (token)
          config.headers.set('Authorization', token)
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
        // if (data.code === RequestEnums.OVERDUE) {
        //   // 登录信息失效，应跳转到登录页面，并清空本地的token
        //   localStorage.setItem('token', '')
        //   this.router.replace({
        //     path: '/login',
        //   })
        //   return Promise.reject(data)
        // }
        // // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        // if (data.code && data.code !== RequestEnums.SUCCESS) {
        //   naiveui.message.error(data) // 此处也可以使用组件提示报错信息
        //   return Promise.reject(data)
        // }
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response)
          this.handleCode(response.status)

        if (!window.navigator.onLine)
          naiveui.message.error('网络连接失败')
        // 可以跳转到错误页面，也可以不做操作
        // return this.router.replace({
        //   path: '/404',
        // })
      },
    )
  }

  handleCode(code: number): void {
    switch (code) {
      case 401:
        naiveui.message.error('登录失败，请重新登录')
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

  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
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
