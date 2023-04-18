export interface TagInfo {
  id: number
  name: string
  count: number
}

export interface VariableInfo {
  variable: string
  description: string
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
  tagIdList: number[]
  visible: boolean
  hot: boolean
  pageView: number
  like: number
  comment: number
  collect: number
  manualPriority: number
}
