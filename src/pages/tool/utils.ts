import { NPopconfirm, NSpace } from 'naive-ui'
import type { ToolInfo } from './type'
import { createAction } from '~/utils'
import type { Action } from '~/utils/type'

export const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称',
  },
  description: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入描述',
  },
  brief: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入简介',
  },
  usageContext: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入说明使用文本',
  },
  outsideUrl: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入外链路径',
  },
  usageImageUrl: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入',
  },
  usageVideoUrl: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入',
  },
  qrcodeUrl: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入',
  },
  iconUrl: {
    required: true,
    message: '请输入',
  },
  tagId: {
    required: true,
    message: '请选择',
  },
  pageView: {
    required: true,
    message: '请输入',
  },
}

export function createActions(
  row: ToolInfo,
  deleteItem: (id: number) => void,
  editItem: (row: ToolInfo) => void,
  checkItem: (row: ToolInfo) => void,
) {
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

export const initModel = () => ({
  id: 0,
  name: '',
  description: '',
  brief: '',
  usageContext: '',
  outsideUrl: '',
  usageImageUrl: '',
  usageVideoUrl: '',
  qrcodeUrl: '',
  iconUrl: '',
  tagId: undefined,
  hot: false,
  pageView: 0,
})
