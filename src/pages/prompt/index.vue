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
      <NInput v-model:value="searchVal" @keydown.enter="fetchList" />
    </n-input-group>
    <NSpace>
      <NButton @click="deleteMultipleItem">
        批量删除
      </NButton>
      <NButton @click="insertItem">
        新增 Prompt
      </NButton>
    </NSpace>
  </div>

  <n-data-table :columns="columns" :data="listData" :row-key="(row: PromptInfo) => row.id" h-70vh flex-height :pagination="pagination" @update:checked-row-keys="handleCheck" />

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
        <NInput v-model:value="model.name" maxlength="30" placeholder="请输入" />
      </n-form-item>
      <n-form-item label="简介:" path="brief">
        <NInput v-model:value="model.brief" type="textarea" maxlength="200" placeholder="请输入" />
      </n-form-item>
      <div text-red pl-30>
        prompt 中必须要有变量输入，变量用花括号包裹，如：I am a {xxx}，切记英文
      </div>
      <n-form-item label="prompt内容:" path="prompt">
        <NInput v-model:value="model.prompt" type="textarea" maxlength="200" placeholder="请输入" @input="onPrompt" />
      </n-form-item>
      <div text-red pl-30>
        key 和 prompt 对应，title 描述，value 值，多值用逗号隔开，切记英文
        <p>
          先输入 prompt 会清空变量，暂时不做优化
        </p>
        <p>
          如 title: 职业 value: 产品,前端
        </p>
      </div>
      <n-form-item label="添加变量:">
        <n-data-table :columns="variableColumns" :row-key="(row: VariableInfo) => row.variable" :data="variableList" />
      </n-form-item>
      <n-form-item label="用户默认输入:" path="input">
        <NInput v-model:value="model.input" type="textarea" maxlength="200" placeholder="请输入" />
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
      <n-form-item label="是否外显" path="visible">
        <n-switch v-model:value="model.visible" />
      </n-form-item>
      <n-form-item label="浏览量" path="pageView">
        <n-input-number v-model:value="model.pageView" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import type { DataTableColumns, DataTableRowKey, FormInst } from 'naive-ui'
import { NButton, NInput, NPopconfirm, NSpace } from 'naive-ui'
import type { PromptInfo, TagInfo, VariableInfo } from './type'
import { initModel, rules } from './utils'
import { deleteCard, modifyCard, searchCard, searchTag } from '~/api/prompt'
import naiveui from '~/utils/naiveui'
import { createAction, createOptionalColumn } from '~/utils'
import type { Action } from '~/utils/type'

defineOptions({ name: 'PromptPage' })

const tags = ref<TagInfo[]>([])
const allTags = computed(() => {
  const count = tags.value.reduce((p, v) => p + v.count, 0)
  const all = { id: 0, name: '全部', count }
  return [all, ...tags.value]
})
const activeTag = ref(0)
const searchVal = ref('')

const listData = ref<PromptInfo[]>([])

const variableList = ref<VariableInfo[]>([])

const showModal = ref(false)
const model = ref<PromptInfo>(initModel())
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

onMounted(async () => {
  await fetchTag()
  await fetchList()
})

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
  formDisabled.value = false
  showModal.value = true
}
const editItem = (row: PromptInfo) => {
  model.value = row
  formDisabled.value = false
  variableList.value = model.value.variableList || []
  showModal.value = true
}
const checkItem = (row: PromptInfo) => {
  model.value = row
  formDisabled.value = true
  variableList.value = model.value.variableList || []
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

const createActions = (
  row: PromptInfo,
  deleteItem: (id: number) => void,
  editItem: (row: PromptInfo) => void,
  checkItem: (row: PromptInfo) => void,
) => {
  const getDeleteConfirm = (id: number) => h(NPopconfirm, {
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => deleteItem(id),
  }, {
    trigger: () => h('span', { className: 'text-blue cursor' }, '删除'),
    default: () => '确定删除吗？',
  })
  const actions: Action[] = [
    { row, action: checkItem, title: '查看' },
    { row, action: editItem, title: '编辑' },
  ]
  return h(NSpace, null, () => [...actions.map(createAction), getDeleteConfirm(row.id)])
}

const columns: DataTableColumns<PromptInfo> = [
  { type: 'selection' },
  createOptionalColumn('id', 'ID'),
  createOptionalColumn('name', '名称'),
  createOptionalColumn('tag', '标签', {
    render: (row: PromptInfo) => tags.value.filter(i => row.tagIdList?.includes(i.id)).map(i => i.name).join(','),
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

const onPrompt = () => {
  const regex = /{([^}]+)}/g
  const matches = model.value.prompt.match(regex)
  if (matches) {
    const keys = matches.map(match => match.slice(1, -1))
    variableList.value = keys.map(variable => ({
      variable,
      description: '',
      value: '',
    }))
  }
}
const variableColumns: DataTableColumns<VariableInfo> = [
  createOptionalColumn('variable', 'variable'),
  createOptionalColumn('description', 'description', {
    render: (row, index) => h(NInput, {
      value: row.description,
      onUpdateValue(v) {
        variableList.value[index].description = v
      },
    }),
  }),
  createOptionalColumn('value', 'value', {
    render: (row, index) => h(NInput, {
      value: row.value,
      onUpdateValue(v) {
        variableList.value[index].value = v
      },
    }),
  }),
]

const formRef = ref<FormInst | null>(null)
const confirm = () => {
  for (const { variable, description, value } of variableList.value) {
    if ([variable, description, value].some(i => !i)) {
      naiveui.message.warning('请输入变量参数！')
      return false
    }
  }
  if (model.value.tagIdList.length > 1) {
    naiveui.message.warning('当前版本只能选择一个标签！')
    return false
  }
  return formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        model.value.variableList = variableList.value
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
</script>
