# watermark 水印

### 介绍

页面上添加特定的文字或图案，可用于防止信息盗用。

### 基础用法

```html
<template>
  <nut-cell class="wrap">
    <nut-button @click="showTextMark">文字水印</nut-button>
    <nut-button @click="showImageMark">图片水印</nut-button>
    <nut-watermark v-if="!flag" class="mark1" :z-index="1" content="nut-ui-water-mark"></nut-watermark>
    <nut-watermark
      v-if="flag"
      class="mark1"
      :image-width="60"
      :image-height="23"
      :z-index="1"
      :image="imgSrc"
    ></nut-watermark>
  </nut-cell>
</template>
<script lang="ts">
  import { ref } from "vue";
  export default {
    setup() {
      const imgSrc = ref('//img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png');
      const flag = ref(false);
      const showTextMark = () => {
        flag.value = false;
      };
      const showImageMark = () => {
        flag.value = true;
      };
      return { imgSrc, showTextMark, showImageMark, flag };
    }
  };
</script>
<style lang="scss">
  .wrap {
    width: 100%;
    height: 240px;
    display: block;
    background: #fff;
    >img {
      width: 100%;
    }
    .mark1 {
      width: 100%;
      top: 50px;
    }
    .nut-button{
      margin-right: 10px;
    }
  }
</style>
```

### 局部用法

```html
<template>
  <nut-cell class="wrap">
    <img :src="src" alt="" />
    <nut-watermark :fullPage="false" font-color="#fa2c19" content="nut-ui"></nut-watermark>
  </nut-cell>
</template>
<script lang="ts">
  import { ref } from "vue";
  export default {
    setup() {
     const src = ref('//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg');
      return { src };
    }
  };
</script>
<style lang="scss">
  .wrap {
    width: 100%;
    height: 240px;
    display: block;
    background: #fff;
     > img {
      width: 100%;
    }
  }
</style>
```

### 多行水印

content属性传入string数组，展示的则是多行水印

```vue
<template>
  <nut-cell class="wrap">
    <nut-watermark
      :full-page="false"
      :gap-y="24"
      font-color="#fa2c19"
      :content="['nut-ui', 'water-mark']"
    />
  </nut-cell>
</template>

<style>
.wrap {
  width: 100%;
  height: 240px;
  display: block;
  background: #fff;
}
</style>
```

## API

### Props

| 参数         | 说明                                                 | 类型               | 默认值               |
| ------------ | ---------------------------------------------------- | ------------------ | -------------------- |
| width        | 水印的宽度                                           | number             | `120`                |
| height       | 水印的高度                                           | number             | `64`                 |
| rotate       | 水印绘制时，旋转的角度                               | number             | `-22`                |
| image        | 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 | string             | -                    |
| image-width  | 图片宽度                                             | number             | `120`                |
| image-height | 图片高度                                             | number             | `64`                 |
| z-index      | 追加的水印元素的 z-index                             | number             | `2000`               |
| content      | 水印文字内容                                         | string \| string[] | -                    |
| font-color   | 水印文字颜色                                         | string             | `rgba(0, 0, 0, .15)` |
| font-size    | 文字大小                                             | string \| number   | `16`                 |
| gap-x        | 水印之间的水平间距                                   | number             | `24`                 |
| gap-y        | 水印之间的垂直间距                                   | number             | `48`                 |
| full-page    | 是否覆盖整个页面                                     | boolean            | `true`               |
| font-family  | 水印文字字体                                         | boolean            | `true`               |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                    | 默认值 |
| ----------------------- | ------ |
| --nut-watermark-z-index | 2000   |
