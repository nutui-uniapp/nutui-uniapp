# Uploader 上传

### 介绍

用于将本地的图片或文件上传至服务器。

### 基础用法

```html
<template>
  <nut-uploader url="https://xxx.xx"></nut-uploader>
</template>
```

### 上传状态

```html
<template>
  <nut-uploader
    v-model:file-list="fileList"
    url="https://xxx.xx"
    maximum="3"
    multiple
  ></nut-uploader>
</template>
```

### 上传列表展示

```html
<template>
  <nut-uploader
    v-model:file-list="fileList"
    url="https://xxx.xx"
    maximum="10"
    multiple
    list-type="list"
  ></nut-uploader>
</template>
```

### 自定义上传样式

```html
<template>
  <nut-uploader url="https://xxx.xx">
    <nut-button type="success" size="small">上传文件</nut-button>
  </nut-uploader>
</template>
```

### 自定义上传使用默认进度条

```html
<template>
  <nut-uploader url="https://xxx.xx" @progress="onProgress">
    <nut-button type="success" size="small">上传文件</nut-button>
  </nut-uploader>

  <nut-progress
    :percentage="percentage"
    stroke-color="linear-gradient(270deg, rgb(18, 126, 255) 0%, rgb(32, 147, 255) 32%, rgb(13, 242, 204) 100%)"
    :status="percentage >= 100 ? '' : 'active'"
  ></nut-progress>
</template>
```

### 直接调起摄像头

```html
<template>
  <nut-uploader url="https://xxx.xx" :source-type="['camera']"></nut-uploader>
</template>
```

### 使用前摄像头拍摄 3s 视频并上传（仅微信小程序）

```html
<template>
  <nut-uploader
    url="https://xxx.xx"
    :source-type="['camera']"
    camera="front"
    max-duration="3"
  ></nut-uploader>
</template>
```

### 限制上传数量5个

```html
<template>
  <nut-uploader url="https://xxx.xx" multiple maximum="5"></nut-uploader>
</template>
```

### 限制上传大小（每个文件最大不超过 50kb）

```html
<template>
  <nut-uploader
    url="https://xxx.xx"
    multiple
    :maximize="1024 * 50"
    @oversize="onOversize"
  ></nut-uploader>
</template>
```

### 禁用状态

```html
<template>
  <nut-uploader disabled></nut-uploader>
</template>
```

### 自定义数据 FormData headers

```html
<template>
  <nut-uploader
    url="https://xxx.xx"
    :data="formData"
    :headers="headers"
    with-credentials
  ></nut-uploader>
</template>
```

### 自定义上传方式

```html
<template>
  <nut-uploader url="https://xxx.xx" :before-upload="beforeXhrUpload"></nut-uploader>
</template>
```

```ts
function beforeXhrUpload(UploadFile: any, options: any) {
  // UploadFile 是 uni.uploadFile，你也可以自定义设置其它函数
  const task = UploadFile({
    url: options.url,
    filePath: options.filePath,
    fileType: options.fileType,
    header: {
      "Content-Type": "multipart/form-data",
      ...options.headers
    },
    formData: options.formData,
    name: options.name,
    success(response: { errMsg: any; statusCode: number; data: string }) {
      if (options.xhrState === response.statusCode) {
        options.onSuccess?.(response, options);
      } else {
        options.onFailure?.(response, options);
      }
    },
    fail(error: any) {
      options.onFailure?.(error, options);
    }
  });

  options.onStart?.(options);

  task.progress((res: { progress: any; totalBytesSent: any; totalBytesExpectedToSend: any }) => {
    options.onProgress?.(res, options);
    // console.log("上传进度", res.progress);
    // console.log("已经上传的数据长度", res.totalBytesSent);
    // console.log("预期需要上传的数据总长度", res.totalBytesExpectedToSend);
  });

  // task.abort(); // 取消上传任务
}
```

### 选中文件后，通过按钮手动执行上传

```html
<template>
  <nut-uploader
    ref="uploaderEl"
    url="https://xxx.xx"
    :auto-upload="false"
  ></nut-uploader>

  <nut-button type="success" size="small" @click="upload()">手动执行上传</nut-button>
  <nut-button type="success" size="small" @click="clear()">手动清空上传</nut-button>
</template>
```

```ts
import type { UploaderInst } from "nutui-uniapp";

const uploaderEl = ref<UploaderInst>();

function upload() {
  uploaderEl.value.submit();
}

function clear() {
  uploaderEl.value.clearUploadQueue();
}
```

## API

### Props

| 参数                       | 说明                                                                                               | 类型              | 可选值                         | 默认值                          |
|--------------------------|--------------------------------------------------------------------------------------------------|-----------------|-----------------------------|------------------------------|
| name                     | 发到后台的文件参数名                                                                                       | string          | -                           | file                         |
| url                      | 上传服务器的接口地址                                                                                       | string          | -                           | -                            |
| v-model:file-list        | 默认已经上传的文件列表                                                                                      | Array           | -                           | `[]`                         |
| is-preview               | 是否上传成功后展示预览图                                                                                     | boolean         | -                           | `true`                       |
| is-deletable             | 是否展示删除按钮                                                                                         | boolean         | -                           | `true`                       |
| method                   | 上传 HTTP 请求方式                                                                                     | string          | -                           | post                         |
| list-type                | 上传列表的内建样式                                                                                        | string          | picture / list              | picture                      |
| maximize                 | 可以设定最大上传文件的大小（单位：字节）                                                                             | number / string | -                           | `Number.MAX_VALUE`           |
| maximum                  | 最多可以选择的文件个数                                                                                      | number / string | -                           | `9`                          |
| source-type              | [选择文件的来源](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)  | Array           | -                           | `["album", "camera"]`        |
| camera `MP-WEIXIN`       | 仅在 `source-type` 为 `camera` 时生效，使用前置或后置摄像头                                                       | string          | back / front                | back                         |
| size-type                | [是否压缩所选文件](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html) | Array           | -                           | `["original", "compressed"]` |
| media-type `MP-WEIXIN`   | [选择文件类型](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)   | Array           | -                           | `["image", "video", "mix"]`  |
| max-duration `MP-WEIXIN` | 拍摄视频最长拍摄时间（单位：秒）（时间范围为 3s 至 60s 之间，不限制相册）                                                        | number          | -                           | `60`                         |
| accept                   | 允许上传的文件类型                                                                                        | string          | image / media / video / all | image                        |
| headers                  | 设置上传的请求头部                                                                                        | object          | -                           | `{}`                         |
| data                     | 附加上传的信息 formData                                                                                 | object          | -                           | `{}`                         |
| xhr-state                | 接口响应的成功状态（status）值                                                                               | number          | -                           | `200`                        |
| disabled                 | 是否禁用文件上传                                                                                         | boolean         | -                           | `false`                      |
| auto-upload              | 是否在选取文件后立即进行上传                                                                                   | boolean         | -                           | `true`                       |
| multiple                 | 是否支持文件多选                                                                                         | boolean         | -                           | `true`                       |
| timeout                  | 超时时间（单位：毫秒）                                                                                      | number / string | -                           | `1000 * 30`                  |
| before-upload            | 执行 `uni.uploadFile` 上传时，自定义方法                                                                    | Function        | -                           | -                            |
| before-delete            | 移除文件时的回调，返回值为 false 时不移除。支持返回一个 `Promise` 对象，`Promise` 对象 `resolve(false)` 或 `reject` 时不移除       | Function        | -                           | -                            |
| mode                     | 预览图片的 mode 属性                                                                                    | string          | -                           | aspectFit                    |
| sortable `1.11.0`        | 是否启用拖拽排序                                                                                         | boolean         | -                           | `false`                      |

#### FileItem

| 参数         | 说明                                              | 类型     | 默认值                                                                            |
|------------|-------------------------------------------------|--------|--------------------------------------------------------------------------------|
| status     | 文件状态值（取值：`ready`、`uploading`、`success`、`error`） | string | ready                                                                          |
| message    | 提示语, 上传失败时显示                                    | string | -                                                                              |
| uid        | 文件的唯一标识                                         | string | `new Date().getTime().toString() + Math.random().toString(36).substring(2, 9)` |
| name       | 文件名称                                            | string | -                                                                              |
| url        | 文件地址                                            | string | -                                                                              |
| type       | 文件类型（取值：`image`、`video`、`audio`）                | string | -                                                                              |
| path       | 文件路径                                            | string | -                                                                              |
| size       | 文件大小                                            | number | -                                                                              |
| percentage | 上传百分比                                           | number | `0`                                                                            |

### Events

| 事件名             | 说明          | 类型                                             |
|-----------------|-------------|------------------------------------------------|
| start           | 文件上传开始      | `(option: UploadOptions) => void`              |
| progress        | 文件上传的进度     | `(evt: { event, option, percentage }) => void` |
| oversize        | 文件大小超过限制时触发 | `(files: ChooseFile[]) => void`                |
| success         | 上传成功        | `(event: { data, option, fileItem }) => void`  |
| failure         | 上传失败        | `(event: { data, option, fileItem }) => void`  |
| change          | 上传文件改变时的状态  | `(evt: { fileList, event }) => void`           |
| delete          | 文件删除事件      | `(event: { file, fileList, index }) => void`   |
| file-item-click | 文件上传成功后点击触发 | `(event: { fileItem }) => void`                |

### Slots

| 名称         | 说明            |
|------------|---------------|
| default    | 默认插槽自定义内容     |
| uploadIcon | 自定义上传按钮中间图标区域 |
| deleteIcon | 自定义右上角删除按钮区域  |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Uploader 实例并调用实例方法。

| 名称               | 说明                                | 类型                         |
|------------------|-----------------------------------|----------------------------|
| submit           | 手动上传模式，执行上传操作                     | `() => void`               |
| chooseImage      | 调用选择文件的方法，效果等同于点击 nut-uploader 组件 | `() => void`               |
| clearUploadQueue | 清空已选择的文件队列                        | `(index?: number) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                            | 默认值     |
|-------------------------------|---------|
| --nut-uploader-picture-width  | 100px   |
| --nut-uploader-picture-height | 100px   |
| --nut-uploader-background     | #f7f8fa |
