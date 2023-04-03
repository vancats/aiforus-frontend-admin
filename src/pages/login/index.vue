<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="left"
    size="medium" px-5
    :style="{ maxWidth: '300px' }"
  >
    <n-form-item label="名称:" path="username">
      <n-input v-model:value="model.username" maxlength="30" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="密码:" path="password">
      <n-input v-model:value="model.password" maxlength="30" placeholder="请输入" />
    </n-form-item>
    <div style="display: flex; justify-content: flex-end">
      <n-button round type="primary" @click="onLogin">
        登陆
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { setLocalItem } from '../../utils/index'
import { login } from '~/api/login'
import naiveui from '~/utils/naiveui'

defineOptions({ name: 'LoginPage' })

const model = ref({
  username: 'aifocus',
  password: 'aifocus2023',
})

const rules = {
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入',
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入',
  },
}

const formRef = ref<FormInst | null>(null)
const router = useRouter()
const route = useRoute()
console.log(route.query.redirect)
const onLogin = () => {
  return formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await login(model.value)
      if (res.code !== 200 || !res.data?.token) {
        naiveui.message.warning('登陆失败')
      }
      else {
        naiveui.message.success('登陆成功')
        setLocalItem('token', res.data.token)
        router.push(route.query.redirect as string || '/')
      }
    }
    else {
      naiveui.message.warning('验证失败')
      return false
    }
  })
}
</script>
