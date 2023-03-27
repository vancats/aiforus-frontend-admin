import type { PromptInfo, TagInfo } from '~/pages/prompt/type'
import axios from '~/utils/axios'

const Prompt_TYPE = 0

namespace PromptPage {
  export interface InsertTagReqData {
    name: string
    id: number
  }
  export interface SearchCardReqData {
    context: string
    tagId: number
  }
}

export const searchTag = async () => {
  return await axios.post<Array<TagInfo>>('/tag/query', { type: Prompt_TYPE }).then(res => res?.data)
}

export const modifyTag = async (params: PromptPage.InsertTagReqData) => {
  return await axios.post('/tag/modify', { ...params, type: Prompt_TYPE })
}

export const deleteTag = async () => {
  return await axios.post('/tag/delete', { type: Prompt_TYPE })
}

export const searchCard = async (params: PromptPage.SearchCardReqData) => {
  return await axios.post<Array<PromptInfo>>('/card/query', { ...params, type: Prompt_TYPE }).then(res => res?.data)
}

export const deleteCard = async (idList: number[]) => {
  return await axios.post('/card/delete', { idList, type: Prompt_TYPE })
}

export const modifyCard = async (params: PromptInfo) => {
  return await axios.post('/card/prompt/modify', params)
}
