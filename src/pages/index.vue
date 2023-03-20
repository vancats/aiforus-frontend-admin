<template>
  <header layout pt-20>
    <SearchBar v-model:searchValue="searchValue" />
  </header>
  <div layout-content pr-10vw>
    <Content :tags="tags" :lists-data="listsData" @tag-change="tagChange" />
  </div>
</template>

<script setup lang="ts">
import type { CardType, ListType, TagType } from '~/components/Layout/Layout'
import hot from '~/assets/hot.png'
import application from '~/assets/application.png'
import { hotLimitNum } from '~/config/index.js'
import { getTags } from '~/api'

defineOptions({ name: 'IndexPage' })

const searchValue = ref('')

// 获取 tag
const tags = ref<TagType[]>([])

const fetchTags = async () => {
  const data = await getTags()
  const temp = [{
    id: 0,
    name: '全部应用',
    active: true,
  }]
  if (Array.isArray(data.data?.tag_list)) {
    data.data?.tag_list.forEach((item) => {
      temp.push({
        id: item.ID,
        name: item.Name,
        active: false,
      })
    })
  }
  tags.value = temp
}

onMounted(async () => {
  await fetchTags()
})

const data: CardType[] = []
for (let i = 0; i < 30; i++) {
  data.push({
    id: i,
    name: 'ChatGPT',
    explaining: '简单介简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍绍',
    imageUrl: '',
    pageView: Math.floor(Math.random() * 1000),
    hot: false,
  })
}

data.sort((a, b) => b.pageView - a.pageView)

const hotList: CardType[] = []
const normalList: CardType[] = []
for (const item of data) {
  if (item.hot)
    hotList.push(item)

  else
    normalList.push(item)
}

if (hotList.length < 4) {
  const subs = hotLimitNum - hotList.length
  hotList.push(...normalList.slice(0, subs))
  normalList.splice(0, subs)
}

// 获取 lists
const listsData: ListType[] = reactive([
  {
    title: '热门应用',
    icon: hot,
    cardList: hotList,
  },
  {
    title: '更多应用',
    icon: application,
    cardList: normalList,
  },
])

const tagChange = (id: number) => {
  tags.value.forEach((tag) => {
    if (tag.id === id)
      tag.active = true
    else
      tag.active = false
  })

  // TODO 发送请求
}
</script>
