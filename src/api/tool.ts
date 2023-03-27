import type { TagInfo, ToolInfo } from '~/pages/tool/type'
import axios from '~/utils/axios'

const TOOL_TYPE = 1

namespace ToolPage {
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
  return await axios.post<Array<TagInfo>>('/tag/query', { type: TOOL_TYPE }).then(res => res?.data)
}

export const modifyTag = async (params: ToolPage.InsertTagReqData) => {
  return await axios.post('/tag/modify', { ...params, type: TOOL_TYPE })
}

export const deleteTag = async () => {
  return await axios.post('/tag/delete', { type: TOOL_TYPE })
}

export const searchCard = async (params: ToolPage.SearchCardReqData) => {
  return await axios.post<Array<ToolInfo>>('/card/query', { ...params, type: TOOL_TYPE }).then(res => res?.data)
}

export const deleteCard = async (idList: number[]) => {
  return await axios.post('/card/delete', { idList, type: TOOL_TYPE })
}

export const modifyCard = async (params: ToolInfo) => {
  return await axios.post('/card/tool/modify', params)
}
