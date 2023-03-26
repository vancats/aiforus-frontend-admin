import { NPopconfirm, NSpace } from 'naive-ui'
import type { PromptInfo } from './type'
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
  prompt: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入prompt',
  },
  input: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入',
  },
  usageVideoUrl: {
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
  row: PromptInfo,
  deleteItem: (id: number) => void,
  editItem: (row: PromptInfo) => void,
  checkItem: (row: PromptInfo) => void,
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
  prompt: '',
  input: '',
  variableList: [],
  iconUrl: '',
  tagId: undefined,
  visible: false,
  hot: false,
  pageView: 0,
})
