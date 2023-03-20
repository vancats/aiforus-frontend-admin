<template>
  <div fixed left-0 top-0 p-5 pr-10 w-full h-16 text-white text-xl flex-center-between>
    <div flex-center cursor @click="goHome">
      <div i-mingcute:planet-line mx-2 py-1 />
      <div>AI FOR US</div>
    </div>
    <div ref="searchEl" web-only @click="onChange">
      <template v-if="searchFocus">
        <n-input
          v-model="modelValue"
          class="px-2 py-1 w-[600px]! rounded-lg"
          placeholder="搜索你想找的相关应用" size="small" clearable
          :on-input="handleChange"
        >
          <template #prefix>
            <span i-carbon:search text-white />
          </template>
        </n-input>
      </template>
      <template v-else>
        <span i-carbon:search />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({ name: 'NavBar' })

const router = useRouter()
const goHome = () => router.push('/')

const { modelValue } = defineModel<{ modelValue: string }>()

const searchFocus = ref(false)

const searchEl = ref(null)
onClickOutside(searchEl, () => searchFocus.value = false)
const onChange = () => searchFocus.value = true

const handleChange = () => {

}
</script>
