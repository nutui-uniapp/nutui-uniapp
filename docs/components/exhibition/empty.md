# Empty 空状态

### 介绍

空状态时的占位提示。

### 基础用法

```html
<template>
  <nut-empty description="无数据"></nut-empty>
</template>
```

### 图片类型

```html
<template>
  <nut-empty image="empty" description="无内容"></nut-empty>
  <nut-empty image="error" description="加载失败"></nut-empty>
  <nut-empty image="network" description="无网络"></nut-empty>
</template>
```

### 自定义图片

```html
<template>
  <nut-empty description="描述文字">
    <template #image>
      <image src="https://static-ftcms.jd.com/p/files/61a9e3313985005b3958672e.png"></image>
    </template>
  </nut-empty>
</template>
```

### 底部内容

```html
<template>
  <nut-empty image="error" description="加载失败">
    <nut-button icon="refresh" type="primary">重试</nut-button>
  </nut-empty>
</template>
```

## API

### Props

| 参数          | 说明              | 类型              | 可选值                     | 默认值   |
|-------------|-----------------|-----------------|-------------------------|-------|
| image       | 图片类型，支持传入图片 URL | string          | empty / error / network | empty |
| image-size  | 图片大小            | number / string | -                       | -     |
| description | 图片下方的描述文字       | string          | -                       | -     |

### Slots

| 名称          | 说明      |
|-------------|---------|
| default     | 自定义底部内容 |
| image       | 自定义图片   |
| description | 自定义描述文字 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                  | 默认值     |
|-------------------------------------|---------|
| --nut-empty-padding                 | 32px 0  |
| --nut-empty-image-size              | 170px   |
| --nut-empty-description-margin-top  | 4px     |
| --nut-empty-description-color       | #666666 |
| --nut-empty-description-font-size   | 14px    |
| --nut-empty-description-line-height | 20px    |
| --nut-empty-description-padding     | 0 40px  |
