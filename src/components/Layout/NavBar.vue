<template>
  <div h-10vh p-8 bg-gray-200 flex-center-between>
    <div flex-center cursor text-xl @click="goHome">
      <div i-mingcute:planet-line mx-2 py-1 />
      <div>
        后台管理系统 - AI FOR US
      </div>
    </div>
    <div text-lg cursor @click="login">
      登陆
    </div>
  </div>

  <!-- Feedback Modal -->
  <n-modal v-model:show="showModal" preset="dialog" type="success" auto-focus close-on-esc title="登陆">
    <n-space vertical>
      <n-input-group>
        <n-input-group-label>帐号：</n-input-group-label>
        <n-input
          v-model:value="account"
          w-full
          autosize
        />
      </n-input-group>
      <n-input-group>
        <n-input-group-label>密码：</n-input-group-label>
        <n-input
          v-model:value="password"
          w-full
          autosize
        />
      </n-input-group>
    </n-space>
    <template #action>
      <button btn>
        提交
      </button>
    </template>
  </n-modal>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({ name: 'NavBar' })

const router = useRouter()
const goHome = () => router.push('/')

const showModal = ref(false)
const login = () => showModal.value = true

const account = ref('admin')
const password = ref('password')
</script>
