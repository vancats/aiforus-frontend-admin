<template>
  <n-upload
    list-type="image-card"
    :custom-request="customRequest"
    :default-file-list="previewFileList"
    :max="max"
  >
    点击上传
  </n-upload>
</template>

<script setup lang="ts">
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { uploadFile } from '~/api'

const { max } = withDefaults(defineProps<{
  max?: number
}>(), {
  max: 1,
})

const { url } = defineModel<{
  url: string
}>()

const customRequest = async ({ file }: UploadCustomRequestOptions) => {
  const formData = new FormData()
  formData.append('file', file.file as File)
  try {
    const res = await uploadFile(formData)
    if (res?.url) {
      url.value = res.url
    }
    else {
      url.value = ''
    }
  }
  catch (e) {
    url.value = ''
    console.warn(e)
  }
}

const previewFileList = computed(() => {
  if (!url.value) return []
  return [
    {
      id: '1',
      name: '1',
      status: 'finished',
      url: url.value,
    },
  ] as UploadFileInfo[]
})
</script>
