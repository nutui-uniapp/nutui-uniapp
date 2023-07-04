<script setup lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { PREFIX } from '../_utils'
import { useTranslate } from '../../locale'
import NutProgress from '../progress/progress.vue'
import NutIcon from '../icon/icon.vue'
import NutButton from '../button/button.vue'
import { uploaderEmits, uploaderProps } from './uploader'
import { type ChooseFile, type GeneralCallbackResult, type OnProgressUpdateResult, type UploadFileSuccessCallbackResult, type UploadOptions, chooseFile, createUploader } from './use-uploader'
import type { FileItem } from './type'

const props = defineProps(uploaderProps)
const emit = defineEmits(uploaderEmits)

const fileList = reactive(props.fileList) as Array<FileItem>
let uploadQueue: Promise<{ upload: () => void }>[] = []

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

function fileItemClick(fileItem: FileItem) {
  emit('fileItemClick', { fileItem })
}

function executeUpload(fileItem: FileItem, index: number) {
  const { type, url, name, formData } = fileItem
  const uploadOption: UploadOptions = {
    url: props.url,
    filePath: url,
    name,
    fileType: type,
    header: props.headers,
    timeout: +props?.timeout,
    xhrState: +props.xhrState,
    formData,
    file: fileItem as any,
  }

  uploadOption.onStart = (option: UploadOptions) => {
    fileItem.status = 'ready'
    fileItem.message = translate('readyUpload')
    clearUploadQueue(index)
    emit('start', option)
  }
  uploadOption.onProgress = (event: OnProgressUpdateResult, option: UploadOptions) => {
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
    emit('update:fileList', fileList)
  }
  uploadOption.onFailure = (data: GeneralCallbackResult, option: UploadOptions) => {
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
  if (props.autoUpload) {
    task.upload()
  }
  else {
    uploadQueue.push(
      new Promise((resolve, reject) => {
        resolve(task)
      }),
    )
  }
}

function clearUploadQueue(index = -1) {
  if (index > -1) {
    uploadQueue.splice(index, 1)
  }
  else {
    uploadQueue = []
    fileList.splice(0, fileList.length)
  }
}
function submit() {
  Promise.all(uploadQueue).then((res) => {
    res.forEach(i => i.upload())
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
      const imgReg = /\.(png|jpeg|jpg|webp|gif)$/i
      if (!fileType && (imgReg.test(filepath) || filepath.includes('data:image')))
        fileType = 'image'
    }
    fileItem.uid = new Date().getTime().toString()
    fileItem.path = filepath
    fileItem.name = filepath ?? file.name
    fileItem.status = 'ready'
    fileItem.message = translate('waitingUpload')
    fileItem.type = fileType!
    fileItem.formData = props.data
    if (props.isPreview)
      fileItem.url = fileType === 'video' ? file.thumbTempFilePath : filepath

    fileList.push(fileItem)
    executeUpload(fileItem, index)
  })
}

function filterFiles(files: ChooseFile[]) {
  const maximum = (props.maximum as number) * 1
  const maximize = (props.maximize as number) * 1
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

  const currentFileLength = files.length + fileList.length
  if (currentFileLength > maximum)
    files.splice(files.length - (currentFileLength - maximum))

  return files
}

function onDelete(file: FileItem, index: number) {
  clearUploadQueue(index)
  if (props.beforeDelete(file, fileList)) {
    fileList.splice(index, 1)
    emit('delete', {
      file,
      fileList,
      index,
    })
  }
  else {
    // console.log('用户阻止了删除！');
  }
}

function onChange(event: InputEvent) {
  if (props.disabled)
    return

  const maximum = (props.maximum as number) * 1

  chooseFile({
    accept: props.accept,
    multiple: props.multiple,
    capture: props.capture,
    maxDuration: +props.maxDuration,
    sizeType: props.sizeType,
    camera: props.camera,
    maxCount: maximum - fileList.length,
  }, props).then((files) => {
    if (props.beforeUpload) {
      props.beforeUpload(files).then((f: ChooseFile[]) => {
        const filteredFiles: ChooseFile[] = filterFiles(new Array<ChooseFile>().slice.call(f))
        readFile(filteredFiles)
      })
    }
    else {
      const filteredFiles: ChooseFile[] = filterFiles(
        new Array<ChooseFile>().slice.call(files),
      )

      readFile(filteredFiles)
    }

    emit('change', { fileList, event })
  })
}
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
  <view :class="classes">
    <view v-if="$slots.default" class="nut-uploader__slot">
      <slot />
      <template v-if="Number(maximum) - fileList.length">
        <NutButton custom-class="nut-uploader__input" @click="(onChange as any)" />
      </template>
    </view>

    <view v-for="(item, index) in fileList" :key="item.uid" class="nut-uploader__preview" :class="[listType]">
      <view v-if="listType === 'picture' && !$slots.default" class="nut-uploader__preview-img">
        <view v-if="item.status !== 'success'" class="nut-uploader__preview__progress">
          <template v-if="item.status !== 'ready'">
            <NutIcon v-if="item.status === 'error'" name="failure" custom-color="#fff" />
            <NutIcon v-else name="loading" custom-color="#fff" />
          </template>
          <view class="nut-uploader__preview__progress__msg">
            {{ item.message }}
          </view>
        </view>

        <view v-if="isDeletable" class="close" @click="onDelete(item, index)">
          <slot name="delete-icon">
            <NutIcon name="failure" />
          </slot>
        </view>

        <img
          v-if="(item?.type?.includes('image') || item?.type?.includes('video')) && item.url"
          class="nut-uploader__preview-img__c"
          mode="aspectFit"
          :src="item.url"
          @click="fileItemClick(item)"
        >
        <view v-else class="nut-uploader__preview-img__file">
          <view class="nut-uploader__preview-img__file__name" @click="fileItemClick(item)">
            <view class="file-name__tips">
              {{ item.name }}
            </view>
          </view>
        </view>
        <view class="tips">
          {{ item.name }}
        </view>
      </view>
      <view v-else-if="listType === 'list'" class="nut-uploader__preview-list">
        <view class="nut-uploader__preview-img__file__name" :class="[item.status]" @click="fileItemClick(item)">
          <NutIcon name="link" custom-class="nut-uploader__preview-img__file__link" />
          <view class="file-name__tips">
            {{ item.name }}
          </view>
          <NutIcon
            v-if="isDeletable"
            name="del"
            custom-color="#808080"
            custom-class="nut-uploader__preview-img__file__del"
            @click="onDelete(item, index)"
          />
        </view>

        <NutProgress
          v-if="item.status === 'uploading'"
          size="small"
          :percentage="item.percentage"
          stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
          :show-text="false"
        />
      </view>
    </view>
    <view
      v-if="listType === 'picture' && !$slots.default && Number(maximum) - fileList.length"
      class="nut-uploader__upload"
      :class="[listType]"
    >
      <slot name="upload-icon">
        <NutIcon name="photograph" custom-color="#808080" />
      </slot>
      <NutButton custom-class="nut-uploader__input" :class="{ disabled }" @click="(onChange as any)" />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
