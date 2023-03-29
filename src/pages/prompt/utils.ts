export const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称',
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
  tagIdList: {
    required: true,
    message: '请选择',
  },
  pageView: {
    required: true,
    message: '请输入',
  },
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
  tagIdList: [],
  visible: false,
  hot: false,
  pageView: 0,
})
