import axios from '~/utils/axios'

const ChatGPT_KEY = 0

export const getKeys = async () => {
  return await axios.post<Array<{ key: string }>>('/key/query', { type: ChatGPT_KEY }).then(res => res.data)
}

export const insertKey = async (key: string) => {
  return await axios.post('/key/insert', { key, type: ChatGPT_KEY })
}
