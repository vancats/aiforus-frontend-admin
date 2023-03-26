import axios from '~/utils/axios'

namespace Login {
  export interface LoginReqData {
    username: string
    password: string
  }
  export interface LoginResData {
    token: string
  }
}

export const login = (params: Login.LoginReqData) => {
  return axios.post<Login.LoginResData>('/login', params)
}
