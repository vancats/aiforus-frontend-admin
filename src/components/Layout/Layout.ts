interface TagType {
  id: number
  name: string
  active: boolean
}

interface CardType {
  id: number
  name: string
  explaining: string
  imageUrl: string
  pageView: number
  hot?: boolean
}

interface ListType {
  title: string
  icon: string
  cardList: CardType[]
}

export { TagType, CardType, ListType }
