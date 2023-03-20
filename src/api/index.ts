import axios from '~/utils/axios'

namespace HomePage {
  // 用户返回标签
  export interface TagResData {
    tag_list: Array<{
      ID: number
      Name: string
    }>
  }
}

// 用户登录
export const getTags = () => {
  // 返回的数据格式可以和服务端约定
  return axios.get<HomePage.TagResData>('/tag')
}
