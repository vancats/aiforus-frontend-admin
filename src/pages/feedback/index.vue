<template>
  <div h-8vh />
  <div layout-content pr-10vw min-h-92vh>
    <!-- Input -->
    <n-input
      :value="searchValue"
      mt-4 p-2 rounded-lg
      placeholder="搜索你想找的相关应用" size="small" clearable
      :theme-overrides="feedbackInputTheme"
      :on-input="handleInput"
      @keydown.enter="handleSearch"
    >
      <template #prefix>
        <span i-carbon:search style="color: #3A50FF" />
      </template>
    </n-input>

    <!-- Content -->
    <div v-if="hotList.length">
      <Content :tags="tags" :lists-data="listsData" @tag-change="tagChange" />
    </div>
    <div v-else flex justify-center items-center>
      <div i-mingcute:planet-line mr-2 text="#3A50FF" />
      老板，没有应用可以“用Chat GPT写商业计划书”，换个关键词试试
    </div>

    <!-- Feedback -->
    <div py-6 text="#3A50FF center">
      <span cursor @click="openFeedbackDialog">
        没有找到可用ai应用？点击向我们反馈
      </span>
    </div>

    <!-- Feedback Modal -->
    <n-modal v-model:show="showModal" preset="dialog" type="info" auto-focus close-on-esc title="反馈">
      <n-input
        type="textarea"
        :value="textValue"
        :theme-overrides="feedbackTextareaTheme"
        :on-input="handleChange"
        :autosize="{ minRows: 3 }"
      />
      <template #action>
        <button btn>
          提交
        </button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang='ts'>
import type { CardType, ListType, TagType } from '~/components/Layout/Layout'
import { hotLimitNum } from '~/config/index.js'
import hot from '~/assets/hot.png'
import application from '~/assets/application.png'
import { feedbackInputTheme, feedbackTextareaTheme } from '~/config/themeOverrides'

defineOptions({ name: 'FeedbackPage' })

const showModal = ref(false)
const textValue = ref('123')

const handleChange = (value: string) => {
  textValue.value = value
}

const searchValue = ref('')

const handleInput = (value: string) => searchValue.value = value

const handleSearch = useThrottleFn(() => {
  // TODO 发起请求
}, 1000)

// 获取 tag
const tags: TagType[] = reactive([
  {
    id: 0,
    name: '全部应用',
    active: true,
  },
  {
    id: 1,
    name: '学习',
    active: false,
  },
  {
    id: 2,
    name: '职业规划',
    active: false,
  },
  {
    id: 3,
    name: '娱乐',
    active: false,
  },
  {
    id: 4,
    name: '教育',
    active: false,
  },
  {
    id: 5,
    name: '互联网',
    active: false,
  },
])

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
  tags.forEach((tag) => {
    if (tag.id === id)
      tag.active = true
    else
      tag.active = false
  })

  // TODO 发送请求
}

const openFeedbackDialog = () => {
  showModal.value = true
}
</script>
