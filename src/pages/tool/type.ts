export interface TagInfo {
  id: number
  name: string
  count: number
}

export interface ToolInfo {
  id: number
  name: string
  description: string
  brief: string
  usageContext: string
  outsideUrl: string
  usageImageUrl: string
  usageVideoUrl: string
  qrcodeUrl: string
  iconUrl: string
  tagIdList: number[]
  hot: boolean
  pageView: number
  like: number
  comment: number
  collect: number
  manualPriority: number
}
