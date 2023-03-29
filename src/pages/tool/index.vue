<template>
  <NSpace mb-4>
    <n-tag
      v-for="tag in allTags" :key="tag.id" tag
      :class="tag.id === activeTag && 'border-blue'"
      @click="onTagChange(tag.id)"
    >
      {{ tag.name }}({{ tag.count }})
    </n-tag>
  </NSpace>
  <div mb-4 flex-center-between>
    <n-input-group w-100>
      <n-input-group-label>输入搜索：</n-input-group-label>
      <n-input v-model:value="searchVal" @keydown.enter="fetchList" />
    </n-input-group>
    <NSpace>
      <NButton @click="deleteMultipleItem">
        批量删除
      </NButton>
      <NButton @click="insertItem">
        新增 Tool
      </NButton>
    </NSpace>
  </div>
  <n-data-table :columns="columns" :data="listData" :row-key="(row: ToolInfo) => row.id" :pagination="pagination" @update:checked-row-keys="handleCheck" />

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="编辑"
    w="180!"
    :show-icon="false"
    :mask-closable="false"
    positive-text="确认"
    negative-text="取消"
    :on-positive-click="confirm"
  >
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      :disabled="formDisabled"
      require-mark-placement="left"
      size="medium" px-5
      :style="{ maxWidth: '640px' }"
    >
      <n-form-item label="名称:" path="name">
        <n-input v-model:value="model.name" maxlength="30" placeholder="请输入" />
      </n-form-item>
      <n-form-item label="简介:" path="brief">
        <n-input v-model:value="model.brief" type="textarea" maxlength="200" placeholder="请输入" />
      </n-form-item>
      <n-form-item label="使用说明文本:" path="usageContext">
        <n-input v-model:value="model.usageContext" type="textarea" maxlength="200" placeholder="请输入" />
      </n-form-item>
      <n-form-item label="外链路径:" path="outsideUrl">
        <n-input v-model:value="model.outsideUrl" placeholder="请输入" />
      </n-form-item>
      <n-form-item label="使用说明图片:">
        <Upload v-model:url="model.usageImageUrl" />
      </n-form-item>
      <n-form-item label="使用说明视频:">
        <Upload v-model:url="model.usageVideoUrl" />
      </n-form-item>
      <n-form-item label="二维码图片:">
        <Upload v-model:url="model.qrcodeUrl" />
      </n-form-item>
      <n-form-item label="icon图片:" path="iconUrl">
        <Upload v-model:url="model.iconUrl" />
      </n-form-item>
      <n-form-item label="标签" path="tagIdList">
        <n-checkbox-group v-model:value="model.tagIdList">
          <n-checkbox v-for="tag in tags" :key="tag.id" :value="tag.id" :label="tag.name" />
        </n-checkbox-group>
      </n-form-item>
      <n-form-item label="是否为热门内容" path="hot">
        <n-switch v-model:value="model.hot" />
      </n-form-item>
      <n-form-item label="浏览量" path="pageView">
        <n-input-number v-model:value="model.pageView" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import type { DataTableColumns, DataTableRowKey, FormInst } from 'naive-ui'
import { NButton, NSpace } from 'naive-ui'
import type { TagInfo, ToolInfo } from './type'
import { createActions, initModel, rules } from './utils'
import { deleteCard, modifyCard, searchCard, searchTag } from '~/api/tool'
import naiveui from '~/utils/naiveui'
import { createOptionalColumn } from '~/utils'
defineOptions({ name: 'ToolPage' })

const tags = ref<TagInfo[]>([])
const allTags = computed(() => {
  const count = tags.value.reduce((p, v) => p + v.count, 0)
  const all = { id: 0, name: '全部', count }
  return [all, ...tags.value]
})
const activeTag = ref(0)
const searchVal = ref('')

const listData = ref<ToolInfo[]>([])

const showModal = ref(false)
const model = ref<ToolInfo>(initModel())
const formDisabled = ref(false)

const fetchTag = async () => {
  try {
    const data = await searchTag()
    tags.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
const fetchList = async () => {
  try {
    const data = await searchCard({ context: searchVal.value, tagId: activeTag.value })
    listData.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
const onTagChange = (id: number) => {
  if (activeTag.value === id) return
  activeTag.value = id
  fetchList()
}
const checkedRowKeys = ref<DataTableRowKey[]>([])
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeys.value = rowKeys
}
const insertItem = () => {
  model.value = initModel()
  showModal.value = true
  formDisabled.value = false
}
const editItem = (row: ToolInfo) => {
  model.value = row
  showModal.value = true
  formDisabled.value = false
}
const checkItem = (row: ToolInfo) => {
  formDisabled.value = true
  model.value = row
  showModal.value = true
}

const deleteItem = async (id: number) => {
  try {
    await deleteCard([id])
    naiveui.message.success('删除成功！')
    location.reload()
  }
  catch (e) {
    console.warn(e)
  }
}
const deleteMultipleItem = async () => {
  try {
    if (checkedRowKeys.value.length) {
      naiveui.dialog.warning({
        title: '删除确定',
        content: '确定删除吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          const idList = listData.value.filter(item => checkedRowKeys.value.includes(item.id)).map(i => i.id)
          await deleteCard(idList)
          naiveui.message.success('删除成功！')
          location.reload()
        },
      })
    }
    else {
      naiveui.message.warning('请先选择！')
    }
  }
  catch (e) {
    console.warn(e)
  }
}

const columns: DataTableColumns<ToolInfo> = [
  { type: 'selection' },
  createOptionalColumn('id', 'ID'),
  createOptionalColumn('name', '名称'),
  createOptionalColumn('tag', '标签', {
    render: (row: ToolInfo) => tags.value.filter(i => row.tagIdList?.includes(i.id)).map(i => i.name).join(','),
  }),
  createOptionalColumn('action', '操作', {
    width: 180,
    render: row => createActions(row, deleteItem, editItem, checkItem),
  }),
]
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

const formRef = ref<FormInst | null>(null)
const confirm = () => {
  if (model.value.tagIdList.length > 1) {
    naiveui.message.warning('当前版本只能选择一个标签！')
    return false
  }
  return formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        await modifyCard(model.value)
        naiveui.message.success('操作成功')
        location.reload()
      }
      catch (e) {
        console.warn(e)
      }
    }
    else {
      naiveui.message.warning('请完成输入！')
      return false
    }
  })
}

onMounted(async () => {
  await fetchTag()
  await fetchList()
})
</script>
