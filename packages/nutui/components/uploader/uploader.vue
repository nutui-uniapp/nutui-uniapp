<script lang="ts" setup>
import { computed, defineComponent, reactive, ref, toRef, useSlots, watch } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import NutButton from '../button/button.vue'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import NutProgress from '../progress/progress.vue'
import type { FileItem } from './types'
import { uploaderEmits, uploaderProps } from './uploader'
import type { ChooseFile, OnProgressUpdateResult, UploadFileSuccessCallbackResult, UploadOptions } from './use-uploader'
import { chooseFile, createUploader } from './use-uploader'

const props = defineProps(uploaderProps)

const emit = defineEmits(uploaderEmits)

const slots = useSlots()

const disabled = useFormDisabled(toRef(props, 'disabled'))

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const fileList = ref<FileItem[]>(props.fileList)

const uploadQueue = ref<Promise<any>[]>([])

watch(() => props.fileList, () => {
  fileList.value = props.fileList
})

function handleFileItemClick(fileItem: FileItem) {
  emit('fileItemClick', { fileItem })
}

function executeUpload(fileItem: FileItem, index: number) {
  const { type, url } = fileItem

  const uploadOption: UploadOptions = {
    url: props.url || '',
    filePath: url,
    name: props.name,
    fileType: type,
    header: props.headers,
    timeout: Number(props.timeout),
    xhrState: Number(props.xhrState),
    formData: props.data,
    file: fileItem as any,
  }

  uploadOption.onStart = (option: UploadOptions) => {
    fileItem.status = 'ready'
    fileItem.message = translate('readyUpload')

    clearUploadQueue(index)

    emit('start', option)
  }

  uploadOption.onProgress = (event: OnProgressUpdateResult, option: UploadOptions) => {
    if (fileItem.status === 'success' || fileItem.status === 'error')
      return
    fileItem.status = 'uploading'
    fileItem.message = translate('uploading')
    fileItem.percentage = event?.progress

    emit('progress', { event, option, percentage: fileItem.percentage })
  }

  uploadOption.onSuccess = (data: UploadFileSuccessCallbackResult, option: UploadOptions) => {
    fileItem.status = 'success'
    fileItem.message = translate('success')

    emit('success', {
      data,
      responseText: data,
      option,
      fileItem,
    })
    emit('update:fileList', fileList.value)
  }

  uploadOption.onFailure = (data, option: UploadOptions) => {
    fileItem.status = 'error'
    fileItem.message = translate('error')

    emit('failure', {
      data,
      responseText: data,
      option,
      fileItem,
    })
  }

  const task = createUploader(uploadOption)

  if (props.beforeUpload) {
    props.beforeUpload(uni.uploadFile, uploadOption)
  }
  else if (props.autoUpload) {
    task.upload()
  }
  else {
    uploadQueue.value.push(
      new Promise((resolve) => {
        resolve(task)
      }),
    )
  }
}

function clearUploadQueue(index = -1) {
  if (index > -1) {
    uploadQueue.value.splice(index, 1)
  }
  else {
    uploadQueue.value = []

    fileList.value.splice(0, fileList.value.length)
  }
}

function submit() {
  Promise.all(uploadQueue.value).then((res) => {
    res.forEach(item => item.upload())
  })
}

function readFile(files: ChooseFile[]) {
  files.forEach((file, index: number) => {
    let fileType = file.type

    const filepath = (file.tempFilePath || file.path || file.url) as string
    const fileItem = reactive({} as FileItem)

    if (file.fileType) {
      fileType = file.fileType
    }
    else {
      if (!fileType && (/\.(png|jpeg|jpg|webp|gif)$/i.test(filepath) || filepath.includes('data:image'))) {
        fileType = 'image'
      }
    }

    fileItem.uid = new Date().getTime().toString() + Math.random().toString(36).substring(2, 9)
    fileItem.path = filepath
    fileItem.name = file.name || filepath
    fileItem.status = 'ready'
    fileItem.message = translate('waitingUpload')
    fileItem.type = fileType!
    if (props.isPreview)
      fileItem.url = fileType === 'video' ? file.url : filepath

    fileList.value.push(fileItem)

    executeUpload(fileItem, index)
  })
}

function filterFiles(files: ChooseFile[]) {
  const maximum = Number(props.maximum)
  const maximize = Number(props.maximize)
  const oversizes = new Array<ChooseFile>()

  files = files.filter((file: ChooseFile) => {
    if (file.size > maximize) {
      oversizes.push(file)
      return false
    }
    return true
  })

  if (oversizes.length)
    emit('oversize', oversizes)

  const currentLength = files.length + fileList.value.length
  if (currentLength > maximum)
    files.splice(files.length - (currentLength - maximum))

  return files
}

async function onDelete(file: FileItem, index: number) {
  clearUploadQueue(index)

  if (props.beforeDelete == null || await props.beforeDelete(file, fileList)) {
    fileList.value.splice(index, 1)

    emit('delete', {
      file,
      fileList: fileList.value,
      index,
    })
  }
}

function chooseImage(event: any) {
  if (disabled.value)
    return

  const maximum = Number(props.maximum)

  chooseFile({
    accept: props.accept,
    multiple: props.multiple,
    capture: props.capture,
    maxDuration: Number(props.maxDuration),
    sizeType: props.sizeType,
    camera: props.camera,
    maxCount: maximum - fileList.value.length,
  }, props, fileList.value).then((files) => {
    const filteredFiles: ChooseFile[] = filterFiles(
      new Array<ChooseFile>().slice.call(files),
    )

    readFile(filteredFiles)

    emit('change', { fileList: fileList.value, event })
  })
}

defineExpose({
  submit,
  chooseImage,
  clearUploadQueue,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-uploader`

const { translate } = useTranslate(componentName)

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view v-if="slots.default" class="nut-uploader__slot">
      <slot />

      <template v-if="fileList.length < Number(props.maximum)">
        <NutButton custom-class="nut-uploader__input" @click="chooseImage" />
      </template>
    </view>

    <view
      v-for="(item, index) in fileList"
      :key="item.uid"
      class="nut-uploader__preview"
      :class="[props.listType]"
    >
      <view v-if="props.listType === 'picture' && !slots.default" class="nut-uploader__preview-img">
        <view v-if="item.status !== 'success'" class="nut-uploader__preview__progress">
          <template v-if="item.status !== 'ready'">
            <NutIcon v-if="item.status === 'error'" name="failure" custom-color="#fff" />

            <NutIcon v-else name="loading" custom-color="#fff" />
          </template>

          <view class="nut-uploader__preview__progress__msg">
            {{ item.message }}
          </view>
        </view>

        <view v-if="props.isDeletable && !disabled" class="close" @click="onDelete(item, index)">
          <slot v-if="slots.deleteIcon" name="deleteIcon" />

          <NutIcon v-else name="failure" />
        </view>

        <image
          v-if="item.type === 'image' && item.url"
          class="nut-uploader__preview-img__c"
          :mode="props.mode"
          :src="item.url"
          @click="handleFileItemClick(item)"
        />
        <video 
          v-else-if="item.type === 'video' && item.url"
          class="nut-uploader__preview-img__c"
          :mode="props.mode"
          :src="item.url"
          @click="handleFileItemClick(item)"
         />

        <view v-else class="nut-uploader__preview-img__file">
          <view class="nut-uploader__preview-img__file__name" @click="handleFileItemClick(item)">
            <view class="file-name__tips">
              {{ item.name }}
            </view>
          </view>
        </view>

        <view class="tips">
          {{ item.name }}
        </view>
      </view>

      <view v-else-if="props.listType === 'list'" class="nut-uploader__preview-list">
        <view class="nut-uploader__preview-img__file__name" :class="[item.status]" @click="handleFileItemClick(item)">
          <NutIcon custom-class="nut-uploader__preview-img__file__link" name="link" />

          <view class="file-name__tips">
            {{ item.name }}
          </view>

          <NutIcon
            v-if="props.isDeletable && !disabled"
            custom-class="nut-uploader__preview-img__file__del"
            name="del"
            custom-color="#808080"
            @click.stop="onDelete(item, index)"
          />
        </view>

        <NutProgress
          v-if="item.status === 'uploading'"
          size="small"
          :percentage="item.percentage"
          stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%, rgba(32,147,255,1) 32.815625%, rgba(13,242,204,1) 100%)"
          :show-text="false"
        />
      </view>
    </view>

    <view
      v-if="props.listType === 'picture' && !slots.default && fileList.length < Number(props.maximum)"
      class="nut-uploader__upload"
      :class="[props.listType]"
    >
      <slot v-if="slots.uploadIcon" name="uploadIcon" />

      <NutIcon v-else name="photograph" custom-color="#808080" />

      <NutButton :custom-class="`nut-uploader__input ${disabled ? 'disabled' : ''}`" @click="chooseImage" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
