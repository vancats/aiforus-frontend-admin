import axios from '~/utils/axios'
import type { WeightInfo } from '~/utils/type'

export const FILE_URL = '/file/upload'
export const uploadFile = async (formData: FormData) => {
  return await axios.post<{ url: string }>(FILE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res?.data)
}

export const getWeight = async () => {
  return await axios.get<Array<WeightInfo>>('/weight/query').then(res => res?.data)
}

export const modifyWeight = async (weightInfo: WeightInfo) => {
  return await axios.post('/weight/update', weightInfo).then(res => res?.data)
}
