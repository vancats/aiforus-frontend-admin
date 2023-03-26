export interface TagInfo {
  id: number
  name: string
  count: number
}

export interface VariableInfo {
  key: string
  title: string
  value: string
}

export interface PromptInfo {
  id: number
  name: string
  description: string
  brief: string
  prompt: string
  input: string
  variableList: Array<VariableInfo>
  iconUrl: string
  tagId?: number
  visible: boolean
  hot: boolean
  pageView: number
}
