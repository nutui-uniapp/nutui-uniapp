# ImagePreview 图片预览

### 介绍

支持全屏预览视频和图片

### 基础用法

```html
<template>
    <nut-image-preview :show="showPreview" :images="imgData" @close="hideFn"/>
    <nut-cell isLink title="展示图片预览" :showIcon="true" @click="showFn"></nut-cell>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
        const resData = reactive({
            showPreview: false,
            imgData: [
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg',
                },
            ]
        });

        const showFn = () => {
            resData.showPreview = true;
        }

        const hideFn = () => {
            resData.showPreview = false;
        }
        
        return {
            ...toRefs(resData),
            showFn,
            hideFn
        };
    }
  };
</script>
```

### 设置初始页码

```html
<template>
    <nut-image-preview :show="showPreview" :images="imgData" :init-no="3" @close="hideFn"/>
    <nut-cell isLink title="设置初始页码" :showIcon="true" @click="showFn"></nut-cell>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
        const resData = reactive({
            showPreview: false,
            imgData: [
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg',
                },
            ]
        });

        const showFn = () => {
            resData.showPreview = true;
        }

        const hideFn = () => {
            resData.showPreview = false;
        }
        
        return {
            ...toRefs(resData),
            showFn,
            hideFn
        };
    }
  };
</script>
```

### 设置轮播指示器及颜色

```html
<template>
    <nut-image-preview
        :show="showPreview"
        :images="imgData"
        :pagination-visible="true"
        pagination-color="red"
        @close="hideFn"
    />
    <nut-cell isLink title="设置轮播指示器及颜色" :showIcon="true" @click="showFn"></nut-cell>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
        const resData = reactive({
            showPreview: false,
            imgData: [
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg',
                },
                {
                    src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg',
                },
            ]
        });

        const showFn = () => {
            resData.showPreview = true;
        }

        const hideFn = () => {
            resData.showPreview = false;
        }
        
        return {
            ...toRefs(resData),
            showFn,
            hideFn
        };
    }
  };
</script>
```

### 长按图片事件，保存到相册

小程序中，需要给这两个API：`getImageInfo`,`saveImageToPhotosAlbum`，设置隐私权限；网络图片需先配置download域名才能生效。

:::demo

```html
<template>
  <nut-image-preview :show="showPreview" :images="imgData" @close="hideFn" @long-press="longPress" />
  <nut-cell isLink title="长按图片事件，保存到相册" :showIcon="true" @click="showFn"></nut-cell>
</template>

<script lang="ts" setup>
  import { reactive, toRefs } from 'vue';
  const resData = reactive({
    showPreview: false,
    imgData: [
      {
        src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg'
      },
      {
        src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png'
      },
      {
        src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg'
      },
      {
        src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg'
      }
    ]
  });
  const { showPreview, imgData } = toRefs(resData);
  const showFn = () => {
    resData.showPreview = true;
  };
  const hideFn = () => {
    resData.showPreview = false;
  };
  const longPress = (image: { src: string }) => {
    uni.getImageInfo({
      src: image.src,
      success: (res) => {
        uni.saveImageToPhotosAlbum({
          filePath: res.path,
          success: () => {
            uni.showToast({
              title: '保存成功'
            });
          }
        });
      }
    });
  };
</script>
```

## API

### Props

| 参数                | 说明                                                          | 类型                                                 | 默认值      |
| ------------------- | ------------------------------------------------------------- | ---------------------------------------------------- | ----------- |
| show                | 是否展示预览图片                                              | boolean                                              | `false`     |
| images              | 预览图片数组                                                  | ImageArray[]                                         | `[]`        |
| autoplay            | 自动轮播时长，0 表示不会自动轮播                              | number \| string                                     | `3000`      |
| init-no             | 初始页码                                                      | number                                               | `0`         |
| pagination-visible  | 分页指示器是否展示                                            | boolean                                              | `false`     |
| pagination-color    | 分页指示器选中的颜色                                          | string                                               | `#fff`      |
| content-close       | 点击图片可以退出预览                                          | boolean                                              | `true`      |
| show-index          | 是否显示页码                                                  | boolean                                              | `true`      |
| closeable           | 是否显示关闭图标                                              | boolean                                              | `false`     |
| close-icon-position | 关闭图标位置，可选值：`top-left`                              | string                                               | `top-right` |
| before-close        | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 `Promise` | (active: number) => boolean \| Promise&lt;`boolean`> | -           |
| is-Loop             | 是否循环播放                                                  | boolean                                              | `true`      |
| scale `v1.2.2`      | 是否支持双指缩放                                              | boolean                                              | `false`     |

### ImageArray 数据结构

| 键名 | 说明         | 类型   |
| ---- | ------------ | ------ |
| src  | 预览图片链接 | string |

### Events

| 事件名             | 说明                       | 回调参数                         |
| ------------------ | -------------------------- | -------------------------------- |
| close              | 点击遮罩关闭图片预览时触发 | 无                               |
| change             | 切换图片时触发             | index:当前图片索引               |
| long-press `1.4.0` | 小程序长按图片触发的事件   | (image: { src: string }) => void |

### Slots

| 名称      | 说明           |
| --------- | -------------- |
| closeIcon | 自定义关闭图片 |
