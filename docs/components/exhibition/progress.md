# Progress 进度条

### 介绍

展示操作或任务的当前进度。

### 基础用法

```html
<template>
  <nut-progress percentage="30"></nut-progress>
</template>
```

### 设置高度和颜色

```html
<template>
  <nut-progress
    percentage="30"
    stroke-width="20"
    stroke-color="rgba(250, 44, 25, 0.47)"
    text-color="red"
  ></nut-progress>
</template>
```

### 设置百分比不显示

```html
<template>
  <nut-progress percentage="50" :show-text="false"></nut-progress>
</template>
```

### 设置百分比内显

```html
<template>
  <nut-progress percentage="60" text-inside></nut-progress>
</template>
```

### 设置百分比内显自定义内容

```html
<template>
  <nut-progress percentage="60" text-inside>
    <image src="https://xxx.xx"></image>
  </nut-progress>
</template>
```

### 设置自定义尺寸

内置 small、base、large 三种规格供使用。

```html
<template>
  <nut-progress percentage="30" size="small"></nut-progress>
  <nut-progress percentage="50" size="base"></nut-progress>
  <nut-progress percentage="70" size="large"></nut-progress>
</template>
```

### 设置状态显示

```html
<template>
  <nut-progress
    percentage="30"
    status="active"
    stroke-color="linear-gradient(270deg, rgb(18, 126, 255) 0%, rgb(32, 147, 255) 32%, rgb(13, 242, 204) 100%)"
  ></nut-progress>

  <nut-progress percentage="50" status="icon"></nut-progress>

  <nut-progress
    percentage="100"
    status="icon"
    stroke-width="15"
    stroke-color="linear-gradient(90deg, rgb(180, 236, 81) 0%, rgb(66, 147, 33) 100%)"
  >
    <template #iconName>
      <nut-icon
        name="issue"
        width="15px"
        height="15px"
        color="red"
      ></nut-icon>
    </template>
  </nut-progress>
</template>
```

### 动态改变

```html
<template>
  <nut-progress :percentage="percentage"></nut-progress>

  <nut-button @click="decrease()">减少</nut-button>
  <nut-button @click="increase()">增加</nut-button>
</template>
```

```ts
const percentage = ref(0);

function decrease() {
  if (percentage.value <= 0) {
    return;
  }

  percentage.value = Math.max(0, percentage.value - 10);
}

function increase() {
  if (percentage.value >= 100) {
    return;
  }

  percentage.value = Math.min(100, percentage.value + 10);
}
```

## API

### Props

| 参数                 | 说明          | 类型              | 可选值                  | 默认值     |
|--------------------|-------------|-----------------|----------------------|---------|
| percentage         | 百分比         | number / string | -                    | `0`     |
| is-show-percentage | 是否需要展示百分号   | boolean         | -                    | `true`  |
| stroke-color       | 进度条背景色      | string          | -                    | #f30    |
| stroke-width       | 进度条宽度       | number / string | -                    | -       |
| size               | 进度条及文字尺寸    | string          | small / base / large | base    |
| show-text          | 是否显示进度条文字内容 | boolean         | -                    | `true`  |
| text-inside        | 进度条文字是否内显   | boolean         | -                    | `false` |
| text-color         | 进度条文字颜色设置   | string          | -                    | #333    |
| text-background    | 进度条文字背景颜色设置 | string          | -                    | -       |
| status             | 进度条当前状态     | string          | text / active / icon | text    |

### Slots

| 名称       | 说明   |
|----------|------|
| iconName | 右侧图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                      | 默认值                                                                                   |
|-----------------------------------------|---------------------------------------------------------------------------------------|
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
