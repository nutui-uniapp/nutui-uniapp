<script lang="ts">
import { reactive, ref } from 'vue'

export default {

  setup() {
    const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
    const progressPercentage = ref<string | number>(0)
    const formData = {
      custom: 'test',
    }
    const defaultFileList = reactive([
      {
        name: '文件1.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'success',
        message: '上传成功',
        type: 'image',
      },
      {
        name: '文件2.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'error',
        message: '上传失败',
        type: 'image',
      },
      {
        name: '文件3.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'uploading',
        message: '上传中...',
        type: 'image',
      },
    ])
    const defaultFileList1 = reactive([
      {
        name: '文件1.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'success',
        message: '上传成功',
        type: 'image',
      },
      {
        name: '文件2.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'error',
        message: '上传失败',
        type: 'image',
      },
      {
        name: '文件3.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'uploading',
        message: '上传中...',
        type: 'image',
      },
    ])
    /* eslint-disable no-console */
    const onOversize = (files: File[]) => {
      console.log('oversize 触发 文件大小不能超过 50kb', files)
    }
    const onDelete = (res: { file: any; fileList: any[]; index: number }) => {
      console.log('delete 事件触发', res.file, res.fileList)
    }
    const onProgress = ({ event, options, percentage }: any) => {
      progressPercentage.value = percentage
      console.log('progress 事件触发', percentage)
    }
    const uploadRef = ref<any>(null)
    const submitUpload = () => {
      uploadRef.value.submit()
    }
    const clearUpload = () => {
      uploadRef.value.clearUploadQueue()
    }

    const beforeXhrUpload = (taroUploadFile: any, options: any) => {
      console.log(taroUploadFile, options)

      // taroUploadFile  是 uni.uploadFile ， 你也可以自定义设置其它函数
      const uploadTask = taroUploadFile({
        url: options.url,
        filePath: options.taroFilePath,
        fileType: options.fileType,
        header: {
          'Content-Type': 'multipart/form-data',
          ...options.headers,
        }, //
        formData: options.formData,
        name: options.name,
        success(response: { errMsg: any; statusCode: number; data: string }) {
          if (options.xhrState === response.statusCode)
            options.onSuccess?.(response, options)
          else
            options.onFailure?.(response, options)
        },
        fail(e: any) {
          options.onFailure?.(e, options)
        },
      })
      options.onStart?.(options)
    }

    return {
      onOversize,
      onDelete,
      onProgress,
      progressPercentage,
      uploadUrl,
      defaultFileList,
      defaultFileList1,
      formData,
      uploadRef,
      submitUpload,
      clearUpload,
      beforeXhrUpload,
    }
  },
}
</script>

<template>
  <div class="demo bg-w">
    <h2 class="title">
      基础用法
    </h2>
    <nut-uploader :url="uploadUrl" />
    <h2 class="title">
      上传状态
    </h2>
    <nut-uploader v-model:file-list="defaultFileList" :url="uploadUrl" maximum="3" multiple @delete="onDelete" />
    <h2 class="title">
      基础用法-上传列表展示
    </h2>
    <nut-uploader v-model:file-list="defaultFileList1" :url="uploadUrl" maximum="10" multiple list-type="list">
      <nut-button type="success" size="small">
        上传文件
      </nut-button>
    </nut-uploader>
    <h2 class="title">
      自定义上传样式
    </h2>
    <nut-uploader :url="uploadUrl">
      <nut-button type="success" size="small">
        上传文件
      </nut-button>
    </nut-uploader>
    <h2 class="title">
      自定义上传使用默认进度条
    </h2>
    <nut-uploader :url="uploadUrl" @progress="onProgress">
      <nut-button type="success" size="small">
        上传文件
      </nut-button>
    </nut-uploader>
    <br>
    <nut-progress
      :percentage="progressPercentage"
      stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
      :status="progressPercentage === 100 ? '' : 'active'"
    />
    <!--
      album 从相册选图
      camera 使用相机
      environment 使用后置摄像头(仅H5纯浏览器)
      -->
    <h2 class="title">
      直接调起摄像头 camera
    </h2>
    <nut-uploader :source-type="['camera']" />
    <h2 class="title">
      使用前摄像头拍摄3s视频并上传(仅支持微信小程序)
    </h2>
    <nut-uploader :media-type="['video']" max-duration="3" :source-type="['camera']" camera="front" :url="uploadUrl" />
    <h2 class="title">
      上传状态
    </h2>
    <nut-uploader :url="uploadUrl" @delete="onDelete" />
    <h2 class="title">
      限制上传数量5个
    </h2>
    <nut-uploader :url="uploadUrl" maximum="5" />
    <h2 class="title">
      限制上传大小（每个文件最大不超过 50kb）
    </h2>
    <nut-uploader :url="uploadUrl" :maximize="1024 * 50" @oversize="onOversize" />
    <h2 class="title">
      自定义数据 FormData 、 headers
    </h2>
    <nut-uploader :url="uploadUrl" :data="formData" :headers="formData" :with-credentials="true" />
    <h2 class="title">
      自定义 uni.uploadFile 上传方式(before-xhr-upload)
    </h2>
    <nut-uploader :url="uploadUrl" :before-upload="beforeXhrUpload" />
    <h2 class="title">
      选中文件后，通过按钮手动执行上传
    </h2>
    <nut-uploader ref="uploadRef" :url="uploadUrl" maximum="5" :auto-upload="false" />
    <br>
    <nut-button type="success" size="small" @click="submitUpload">
      手动执行上传
    </nut-button>
    <nut-button type="danger" size="small" @click="clearUpload">
      手动清空上传
    </nut-button>
    <h2 class="title">
      禁用状态
    </h2>
    <nut-uploader disabled />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Uploader"
  }
}
</route>
