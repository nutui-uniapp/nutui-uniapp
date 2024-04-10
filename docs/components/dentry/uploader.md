# Uploader 上传

### 介绍

用于将本地的图片或文件上传至服务器。

### 基础用法

``` html
<nut-uploader :url="uploadUrl"></nut-uploader>
```

### 上传状态

``` html
<nut-uploader :url="uploadUrl" v-model:file-list="defaultFileList" maximum="3" multiple></nut-uploader>
```

### 基础用法-上传列表展示

``` html
<nut-uploader :url="uploadUrl" v-model:file-list="defaultFileList" maximum="10" multiple list-type='list'>
  <nut-button type="success" size="small">上传文件</nut-button>
</nut-uploader>
```

### 自定义上传样式

``` html
<nut-uploader :url="uploadUrl">
  <nut-button type="success" size="small">上传文件</nut-button>
</nut-uploader>
```

### 自定义上传使用默认进度条

``` html
<nut-uploader :url="uploadUrl" @progress="onProgress">
  <nut-button type="success" size="small">上传文件</nut-button>
</nut-uploader>
<br />
<nut-progress :percentage="progressPercentage"
  stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
  :status="progressPercentage==100?'':'active'">
</nut-progress>
```

### 直接调起摄像头 camera

``` html
<nut-uploader :url="uploadUrl" :source-type="['camera']" ></nut-uploader>
```

### 使用前摄像头拍摄3s视频并上传(仅支持微信小程序)

``` html
<nut-uploader max-duration="3" :source-type="['camera']" camera="front" :url="uploadUrl"></nut-uploader>
```

### 限制上传数量5个

``` html
<nut-uploader :url="uploadUrl" multiple maximum="5"></nut-uploader>
```

### 限制上传大小（每个文件最大不超过 50kb）

``` html
<nut-uploader :url="uploadUrl" multiple :maximize="1024 * 50" @oversize="onOversize"></nut-uploader>
```

### 自定义数据 FormData headers

``` html
<nut-uploader :url="uploadUrl" :data="formData" :headers="formData" :with-Credentials="true"></nut-uploader>
```

### 自定义上传方式(before-upload)

```html
<template>
  <nut-uploader url="https://xxxx" :before-upload="beforeXhrUpload"></nut-uploader>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    // source file https://github.com/jdf2e/nutui/blob/v4/src/packages/__VUE/uploader/uploader.ts#L6
    const beforeXhrUpload = (UploadFile: any, options: any) => {
      //UploadFile  是 uni.uploadFile ， 你也可以自定义设置其它函数
      const uploadTask = UploadFile({
        url: options.url,
        filePath: options.taroFilePath,
        fileType: options.fileType,
        header: {
          'Content-Type': 'multipart/form-data',
          ...options.headers
        }, //
        formData: options.formData,
        name: options.name,
        success(response: { errMsg: any; statusCode: number; data: string }) {
          if (options.xhrState == response.statusCode) {
            options.onSuccess?.(response, options);
          } else {
            options.onFailure?.(response, options);
          }
        },
        fail(e: any) {
          options.onFailure?.(e, options);
        }
      });
      options.onStart?.(options);
      uploadTask.progress((res: { progress: any; totalBytesSent: any; totalBytesExpectedToSend: any }) => {
        options.onProgress?.(res, options);
        // console.log('上传进度', res.progress);
        // console.log('已经上传的数据长度', res.totalBytesSent);
        // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
      });
      // uploadTask.abort(); // 取消上传任务
    };
     return {
      beforeXhrUpload
    };
  }
}
</script>
```

### 选中文件后，通过按钮手动执行上传

``` html
<nut-uploader :url="uploadUrl" maximum="5" :auto-upload="false" ref="uploadRef"></nut-uploader>
<br />
<nut-button type="success" size="small" @click="submitUpload">手动执行上传</nut-button>
<nut-button type="success" size="small" @click="clearUpload">手动清空上传</nut-button>
```

### 禁用状态

``` html
<nut-uploader disabled></nut-uploader>
```

``` javascript
import { ref,reactive } from 'vue';
setup() {
  const uploadUrl = 'http://服务器地址';
  const progressPercentage = ref<string | number>(0);
  const formData = {
    custom: 'test'
  };
  const defaultFileList = reactive([
    {
      name: '文件1.png',
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      status: 'success',
      message: '上传成功',
      type: 'image'
    },
    {
      name: '文件2.png',
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      status: 'error',
      message: '上传失败',
      type: 'image'
    },
    {
      name: '文件3.png',
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      status: 'uploading',
      message: '上传中...',
      type: 'image'
    }
  ]);
  const fileToDataURL = (file: Blob): Promise<any> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = (e) => resolve((e.target as FileReader).result);
      reader.readAsDataURL(file);
    });
  };
  const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = dataURL;
    });
  };
  const canvastoFile = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality));
  };
  const onOversize = (files: File[]) => {
    console.log('oversize 触发 文件大小不能超过 50kb', files);
  };
  const onDelete = (obj: any) => {
    console.log('delete 事件触发', obj);
  };
  const onProgress = ({ event, options, percentage }: any) => {
    progressPercentage.value = percentage;
    console.log('progress 事件触发', percentage);
  };
  const uploadRef = ref<any>(null);
  const submitUpload = () => {
    uploadRef.value.submit();
  };
  const clearUpload = () => {
    uploadRef.value.clearUploadQueue();
  };
  return {
    onOversize,
    onDelete,
    onProgress,
    progressPercentage,
    uploadUrl,
    defaultFileList,
    formData,
    uploadRef,
    submitUpload,
    clearUpload
  };
}
```

## API

### Props

| 参数                      | 说明                                                                                                                   | 类型                                                                 | 默认值                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------- |
| auto-upload               | 是否在选取文件后立即进行上传，`false` 时需要手动执行 ref submit 方法进行上传                                           | Boolean                                                              | `true`                            |
| name                      | 发到后台的文件参数名                                                                                                   | String                                                               | `file`                            |
| url                       | 上传服务器的接口地址                                                                                                   | String                                                               | `-`                               |
| v-model:file-list         | 默认已经上传的文件列表                                                                                                 | FileItem[]                                                           | `[]`                              |
| is-preview                | 是否上传成功后展示预览图                                                                                               | Boolean                                                              | `true`                            |
| is-deletable              | 是否展示删除按钮                                                                                                       | Boolean                                                              | `true`                            |
| method                    | 上传请求的 http method                                                                                                 | String                                                               | `post`                            |
| list-type                 | 上传列表的内建样式，支持两种基础样式 `picture`、`list`                                                                 | String                                                               | `picture`                         |
| maximize                  | 可以设定最大上传文件的大小（字节）                                                                                     | Number \| String                                                     | `Number.MAX_VALUE`                |
| maximum                   | 最多可以选择的文件个数，微信基础库2.25.0前，最多可支持9个文件，2.25.0及以后最多可支持20个文件                          | Number \| String                                                     | `1`                               |
| source-type               | [选择文件的来源](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)                 | Array                                                                | `['album','camera']`              |
| camera`仅支持WEAPP`       | 仅在 `source-type` 为 `camera` 时生效，使用前置或后置摄像头                                                            | String                                                               | `back`                            |
| size-type                 | [是否压缩所选文件](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)               | Array                                                                | `['original','compressed']`       |
| media-type`仅支持WEAPP`   | [选择文件类型](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)                   | Array                                                                | `['image', 'video', 'mix']`       |
| max-duration`仅支持WEAPP` | 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册。                                                  | Number                                                               | 10                                |
| accept                    | 允许上传的文件类型                                                                                                     | String                                                               | `['image','media','video','all']` |
| headers                   | 设置上传的请求头部                                                                                                     | object                                                               | `{}`                              |
| data                      | 附加上传的信息 formData                                                                                                | object                                                               | `{}`                              |
| xhr-state                 | 接口响应的成功状态（status）值                                                                                         | Number                                                               | `200`                             |
| disabled                  | 是否禁用文件上传                                                                                                       | Boolean                                                              | `false`                           |
| multiple                  | 是否支持文件多选                                                                                                       | Boolean                                                              | `true`                            |
| timeout                   | 超时时间，单位为毫秒                                                                                                   | Number \| String                                                     | `1000 * 30`                       |
| before-upload             | 执行 `uni.uploadFile` 上传时，自定义方法                                                                               | Function(uni.uploadFile，option)                                     | `null`                            |
| before-delete             | 除文件时的回调，返回值为 false 时不移除。支持返回一个 `Promise` 对象，`Promise` 对象 resolve(false) 或 reject 时不移除 | Function(file): boolean 丨 Promise                                   | -                                 |
| mode                      | 预览图片的 mode 属性                                                                                                   | 查阅 uniapp[文档](https://uniapp.dcloud.net.cn/component/image.html) | `aspectFit`                       |

### FileItem

| 名称       | 说明                                                  | 默认值                            |
| ---------- | ----------------------------------------------------- | --------------------------------- |
| status     | 文件状态值，可选`ready`,`uploading`,`success`,`error` | `ready`                           |
| message    | 提示语, 上传失败时显示                                | -                                 |
| uid        | 文件的唯一标识                                        | `new Date().getTime().toString()` |
| name       | 文件名称                                              | -                                 |
| url        | 文件路径                                              | -                                 |
| type       | 文件类型,可选`image`,`video`,`audio`                  | -                                 |
| formData   | 上传所需的data                                        | `{}`                              |
| percentage | 上传百分比                                            | `0`                               |

### Events

| 事件名          | 说明                   | 回调参数                    |
| --------------- | ---------------------- | --------------------------- |
| start           | 文件上传开始           | `options`                   |
| progress        | 文件上传的进度         | `{event,option,percentage}` |
| oversize        | 文件大小超过限制时触发 | `files`                     |
| success         | 上传成功               | `{data,option,fileItem}`    |
| failure         | 上传失败               | `{data,option,fileItem}`    |
| change          | 上传文件改变时的状态   | `{fileList,event}`          |
| delete          | 文件删除事件           | `{files,fileList,index}`    |
| file-item-click | 文件上传成功后点击触发 | `{fileItem}`                |

### Uploader Slots

| 名称       | 说明                         |
| ---------- | ---------------------------- |
| default    | 默认插槽自定义内容           |
| uploadIcon | 自定义上传按钮中间`icon`区域 |
| deleteIcon | 自定义右上角删除按钮区域     |

### Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Uploader 实例并调用实例方法

| 方法名           | 说明                                                       | 参数  | 返回值 |
| ---------------- | ---------------------------------------------------------- | ----- | ------ |
| submit           | 手动上传模式，执行上传操作                                 | -     | `-`    |
| chooseImage      | 调用选择文件的方法，效果等同于点击 nut-uploader 组件       | -     | -      |
| clearUploadQueue | 清空已选择的文件队列（该方法一般配合在手动模式上传时使用） | index | `-`    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                          | 默认值  |
| ----------------------------- | ------- |
| --nut-uploader-picture-width  | 100px   |
| --nut-uploader-picture-height | 100px   |
| --nut-uploader-background     | #f7f8fa |
