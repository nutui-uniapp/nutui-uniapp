# Progress 进度条

### 介绍

展示操作或任务的当前进度。

### 基础用法

```html
<template>
  <nut-cell>
     <nut-progress percentage="30" />
  </nut-cell>
</template>
```

### 设置高度和颜色

```html
<template>
  <nut-cell>
    <nut-progress percentage="30" stroke-color=" rgba(250,44,25,0.47)" stroke-width="20" text-color="red" />
   </nut-cell>
</template>
```

### 设置百分比不显示

```html
<template>
  <nut-cell>
     <nut-progress percentage="50" :show-text="false" stroke-height="24" />
  </nut-cell>
</template>
```

### 设置百分比内显

```html
<template>
     <nut-cell>
        <nut-progress percentage="60" :text-inside="true" />
      </nut-cell>
</template>
```

### 设置百分比内显自定义内容

```html
<template>
     <nut-cell>
        <nut-progress percentage="60" :text-inside="true">
          <img
            src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
            style="display: block; width: 30px; height: 30px"
          />
        </nut-progress>
      </nut-cell>
</template>
```

### 设置自定义尺寸

内置 **small**，**base**，**large** 三种规格供使用。

```html
<template>
  <nut-cell>
        <nut-progress percentage="30" :text-inside="true" size="small"> </nut-progress>
      </nut-cell>
      <nut-cell>
        <nut-progress percentage="50" :text-inside="true" size="base"> </nut-progress>
      </nut-cell>
      <nut-cell>
        <nut-progress percentage="70" :text-inside="true" size="large"> </nut-progress>
      </nut-cell>
</template>
```

### 设置状态显示

```html
<template>
   <div>
      <nut-cell>
        <nut-progress
          percentage="30"
          stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
          status="active"
        />
      </nut-cell>
      <nut-cell>
        <nut-progress percentage="50" :stroke-width="strokeWidth" status="icon" />
      </nut-cell>
      <nut-cell>
        <nut-progress
          percentage="100"
          stroke-color="linear-gradient(90deg, rgba(180,236,81,1) 0%,rgba(66,147,33,1) 100%)"
          stroke-width="15"
          status="icon"
        >
          <template #iconName>
            <nut-icon  name="issue" color="red" width="15px" height="15px" />
          </template>
        </nut-progress>
      </nut-cell>
    </div>
</template>
```

### 动态改变

```html
<template>
   <div>
    <nut-cell>
      <nut-progress :percentage="val" />
    </nut-cell>
    <nut-cell>
      <nut-button type="default" @click="setReduceVal">减少</nut-button>
      <nut-button type="primary" @click="setAddVal">增加</nut-button>
    </nut-cell>
    </div>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default{
    setup() {
    const val = ref(0);
    const setAddVal = () => {
      if (val.value >= 100) {
        return false;
      }
      val.value += 10;
    };
    const setReduceVal = () => {
      if (val.value <= 0) {
        return false;
      }
      val.value -= 10;
    };
    return {
      val,
      setAddVal,
      setReduceVal,
    };
  }

  }
</script>
```

## API

### Props

| 参数               | 说明                                                              | 类型    | 默认值  |
| ------------------ | ----------------------------------------------------------------- | ------- | ------- |
| percentage         | 百分比                                                            | number  | `0`     |
| is-show-percentage | 是否需要展示百分号                                                | boolean | `true`  |
| stroke-color       | 进度条背景色                                                      | string  | `#f30`  |
| stroke-width       | 进度条宽度                                                        | string  | -       |
| size               | 进度条及文字尺寸，可选值 `small` `base` `large`                   | string  | `base`  |
| show-text          | 是否显示进度条文字内容                                            | boolean | `true`  |
| text-inside        | 进度条文字显示位置(false:外显，true:内显)                         | boolean | `false` |
| text-color         | 进度条文字颜色设置                                                | string  | `#333`  |
| text-background    | 进度条文字背景颜色设置                                            | string  | -       |
| status             | 进度条当前状态，可选值`active(展示动画效果)` `icon(展示icon标签)` | string  | `text`  |

### Slots

| 名称     | 说明             | 作用域参数 |
| -------- | ---------------- | ---------- |
| iconName | 右侧 `icon` 内容 | -          |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| --nut-progress-inner-background-color   | linear-gradient(135deg,var(--nut-primary-color) 0%,var(--nut-primary-color-end) 100%) |
| --nut-progress-insidetext-background    | var(--nut-progress-inner-background-color)                                            |
| --nut-progress-outer-background-color   | #f3f3f3                                                                               |
| --nut-progress-outer-border-radius      | 12px                                                                                  |
| --nut-progress-insidetext-border-radius | 5px                                                                                   |
| --nut-progress-insidetext-padding       | 3px 5px 3px 6px                                                                       |
| --nut-progress-small-height             | 5px                                                                                   |
| --nut-progress-small-text-font-size     | 7px                                                                                   |
| --nut-progress-small-text-line-height   | 10px                                                                                  |
| --nut-progress-small-text-padding       | 2px 4px                                                                               |
| --nut-progress-base-height              | 10px                                                                                  |
| --nut-progress-base-text-font-size      | 9px                                                                                   |
| --nut-progress-base-text-line-height    | 13px                                                                                  |
| --nut-progress-base-text-padding        | var(--nut-progress-insidetext-padding)                                                |
| --nut-progress-large-height             | 15px                                                                                  |
| --nut-progress-large-text-font-size     | 13px                                                                                  |
| --nut-progress-large-text-line-height   | 18px                                                                                  |
| --nut-progress-large-text-padding       | var(--nut-progress-insidetext-padding)                                                |
