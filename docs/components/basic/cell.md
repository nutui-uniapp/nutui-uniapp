# Cell 单元格

### 介绍

列表项，可组成列表。

### 基础用法

```html
<template>
  <nut-cell title="我是标题" desc="描述文字"></nut-cell>

  <nut-cell title="我是标题"
            sub-title="副标题描述"
            desc="描述文字"></nut-cell>

  <!-- 自 1.7.14 开始支持 clickable 属性，可以启用点击效果 -->
  <nut-cell title="点击测试"
            clickable
            @click="testClick"></nut-cell>

  <nut-cell title="圆角设置 0" round-radius="0"></nut-cell>
</template>
```

### large尺寸

```html
<template>
  <nut-cell size="large"
            title="我是标题"
            desc="描述文字"></nut-cell>

  <nut-cell size="large"
            title="我是标题"
            sub-title="副标题描述"
            desc="描述文字"></nut-cell>
</template>
```

### 直接使用插槽

```html
<template>
  <nut-cell>
    <text>自定义内容</text>
  </nut-cell>
</template>
```

### 标题插槽

```html
<template>
  <nut-cell desc="描述文字">
    <template #title>
      <text>Title</text>
    </template>
  </nut-cell>
</template>
```

### 描述插槽

```html
<template>
  <nut-cell title="我是标题">
    <template #desc>
      <text>描述文字</text>
    </template>
  </nut-cell>
</template>
```

### 链接 / 分组用法

```html
<template>
  <nut-cell-group title="链接 / 分组用法">
    <nut-cell title="链接样式" is-link></nut-cell>
    <nut-cell title="路由跳转 “/” " to="/"></nut-cell>
  </nut-cell-group>
</template>
```

### 自定义右侧箭头区域

```html
<template>
  <nut-cell title="Switch">
    <template #link>
      <nut-switch></nut-switch>
    </template>
  </nut-cell>
</template>
```

### 自定义左侧图标区域

```html
<template>
  <nut-cell-group title="自定义左侧图标区域">
    <nut-cell title="图片">
      <template #icon>
        <image class="nut-icon" src=""></image>
      </template>
    </nut-cell>
  </nut-cell-group>
</template>
```

> 自 `1.7.14` 开始支持用过 `icon` 属性自定义左侧图标，之前的版本通过 `icon` 插槽修改

```html
<template>
  <nut-cell title="icon属性" icon="my" desc="张三"></nut-cell>

  <nut-cell title="icon插槽" desc="张三">
    <template #icon>
      <nut-icon name="my"></nut-icon>
    </template>
  </nut-cell>
</template>
```

### 只展示描述

可通过 `desc-text-align` 调整内容位置

```html
<template>
  <nut-cell desc="张三" desc-text-align="left"></nut-cell>
</template>
```

### 垂直居中

通过 `center` 属性可以让 Cell 的左右内容都垂直居中

```html
<template>
  <nut-cell title="我是标题"
            sub-title="副标题描述"
            desc="描述文字"
            center></nut-cell>
</template>
```

## API

### CellGroup Props

| 参数    | 说明   | 类型     | 默认值 |
|-------|------|--------|-----|
| title | 分组标题 | string | -   |
| desc  | 分组描述 | string | -   |

### CellGroup Slots

| 名称      | 说明               |
|---------|------------------|
| default | 自定义内容            |
| title   | 自定义 `title` 标题区域 |
| desc    | 自定义 `desc` 描述区域  |

### Cell Props

| 参数                   | 说明                                                                                 | 类型               | 默认值     |
|----------------------|------------------------------------------------------------------------------------|------------------|---------|
| title                | 标题名称                                                                               | string           | -       |
| sub-title            | 左侧副标题                                                                              | string           | -       |
| desc                 | 右侧描述                                                                               | string           | -       |
| desc-text-align      | 右侧描述文本对齐方式 [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp) | string           | `right` |
| is-link              | 是否展示右侧箭头并开启点击反馈                                                                    | boolean          | `false` |
| to `1.7.8`           | 跳转地址（uni.navigateTo的url参数）                                                         | string           | -       |
| round-radius         | 圆角半径                                                                               | number \| string | `6px`   |
| center               | 是否使内容垂直居中                                                                          | boolean          | `false` |
| size                 | 单元格大小，可选值为 `large`                                                                 | string           | -       |
| clickable `1.7.14`   | 是否启用点击效果（存在 `is-link` 或者 `to` 属性时会自动启用，也可以手动启用）                                    | boolean          | `false` |
| icon `1.7.14`        | 左侧图标（对应 `nut-icon` 的 `name` 属性）                                                    | string           | -       |
| title-width `1.7.17` | 标题宽度                                                                               | number \| string | -       |

### Cell Events

| 事件名   | 说明   | 回调参数           |
|-------|------|----------------|
| click | 点击事件 | `event: Event` |

### Cell Slots

| 名称           | 说明               |
|--------------|------------------|
| default      | 自定义内容            |
| title        | 自定义 `title` 标题区域 |
| icon         | 自定义左侧 `icon` 区域  |
| link         | 自定义右侧 `link` 区域  |
| desc `1.1.6` | 自定义 `desc` 描述区域  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                 | 默认值                                    |
|------------------------------------|----------------------------------------|
| --nut-cell-color                   | var(--nut-title-color2)                |
| --nut-cell-title-font              | var(--nut-font-size-2)                 |
| --nut-cell-title-desc-font         | var(--nut-font-size-1)                 |
| --nut-cell-desc-font               | var(--nut-font-size-2)                 |
| --nut-cell-desc-color              | var(--nut-disable-color)               |
| --nut-cell-border-radius           | 6px                                    |
| --nut-cell-padding                 | 13px 16px                              |
| --nut-cell-line-height             | 20px                                   |
| --nut-cell-after-right             | 16px                                   |
| --nut-cell-after-border-bottom     | 1px solid #f5f6f7                      |
| --nut-cell-default-icon-margin     | 0 4px 0 0px                            |
| --nut-cell-large-title-font        | var(--nut-font-size-large)             |
| --nut-cell-large-title-desc-font   | var(--nut-font-size-base)              |
| --nut-cell-large-padding           | 15px 16px                              |
| --nut-cell-background              | var(--nut-white)                       |
| --nut-cell-box-shadow              | 0px 1px 7px 0px rgba(237, 238, 241, 1) |
| --nut-cell-group-title-padding     | 0 10px                                 |
| --nut-cell-group-title-color       | #909ca4                                |
| --nut-cell-group-title-font-size   | var(--nut-font-size-2)                 |
| --nut-cell-group-title-line-height | 20px                                   |
| --nut-cell-group-desc-padding      | 0 10px                                 |
| --nut-cell-group-desc-color        | #909ca4                                |
| --nut-cell-group-desc-font-size    | var(--nut-font-size-1)                 |
| --nut-cell-group-desc-line-height  | 16px                                   |
| --nut-cell-group-background-color  | var(--nut-white)                       |
