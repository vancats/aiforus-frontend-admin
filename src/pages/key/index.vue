<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { reactive } from 'vue'
import naiveui from '~/utils/naiveui'

interface RowData {
  key: number
  name: string
  age: string
  address: string
}

interface Action {
  row: any
  action: Function
  title: string
  style?: string
}

const sendMail = (rowData: RowData) => {
  naiveui.message.info(`send mail to ${rowData.name}`)
}

const createAction = ({ row, action, title, style = 'text-blue cursor' }: Action) => {
  return h('span',
    {
      className: style,
      onClick: () => action(row),
    },
    { default: () => title },
  )
}

const createActions = (row: any) => {
  const actions: Action[] = [
    { row, action: sendMail, title: '查看 | ' },
    { row, action: sendMail, title: '编辑 | ' },
    { row, action: sendMail, title: '删除' },
  ]
  return h('div', null, actions.map(createAction))
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    type: 'selection',
    disabled(row: RowData) {
      return row.name === 'Edward King 3'
    },
  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: '标签',
    key: 'label',
  },
  {
    title: 'Action',
    key: 'actions',
    render(row, context) {
      return createActions(row)
    },
  },
]

const columns = createColumns()

const data = Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  id: 32,
  name: `Edward King ${index}`,
  label: `London, Park Lane no. ${index}`,
}))

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
</script>
