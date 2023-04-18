export interface Action {
  row: any
  action: Function
  title: string
  style?: string
}

export interface WeightInfo {
  cardType: number
  weightType: string
  value: number
}
