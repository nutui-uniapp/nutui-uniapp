# Avatar 头像

### 介绍

用来代表用户或事物，支持图片、图标或字符展示。

### 基础用法

支持三种尺寸：`small`、`normal`、`large`。

```html
<template>
  <nut-avatar size="small">
    <image src="https://xxx.xx"></image>
  </nut-avatar>

  <nut-avatar size="normal">
    <image src="https://xxx.xx"></image>
  </nut-avatar>

  <nut-avatar size="large">
    <image src="https://xxx.xx"></image>
  </nut-avatar>
</template>
```

### 头像形状

支持两种形状：`square`、`round`。

```html
<template>
  <nut-avatar shape="square">
    <nut-icon name="my"></nut-icon>
  </nut-avatar>

  <nut-avatar shape="round">
    <nut-icon name="my"></nut-icon>
  </nut-avatar>
</template>
```

### 头像类型

支持三种类型：图片、Icon 以及字符。

```html
<template>
  <nut-avatar>
    <image src="https://xxx.xx"></image>
  </nut-avatar>

  <nut-avatar>
    <nut-icon name="my"></nut-icon>
  </nut-avatar>

  <nut-avatar>王</nut-avatar>
</template>
```

### 自定义颜色及背景色

Icon 和字符型可以自定义颜色及背景色。

```html
<template>
  <nut-avatar bg-color="#fa2c19">
    <nut-icon name="my" custom-color="#ffffff"></nut-icon>
  </nut-avatar>

  <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>
</template>
```

### 带徽标的头像

```html
<template>
  <nut-badge value="8">
    <nut-avatar shape="square">
      <nut-icon name="my"></nut-icon>
    </nut-avatar>
  </nut-badge>

  <nut-badge dot>
    <nut-avatar shape="square">
      <nut-icon name="my"></nut-icon>
    </nut-avatar>
  </nut-badge>
</template>
```

### 头像组合展现

```html
<template>
  <nut-avatar-group span="-4">
    <nut-avatar>
      <image src="https://xxx.xx"></image>
    </nut-avatar>

    <nut-avatar>
      <nut-icon name="my"></nut-icon>
    </nut-avatar>

    <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>
  </nut-avatar-group>

  <nut-avatar-group
    max-count="3"
    max-color="#ffffff"
    max-bg-color="#498ff2"
  >
    <nut-avatar>
      <image src="https://xxx.xx"></image>
    </nut-avatar>

    <nut-avatar>
      <nut-icon name="my"></nut-icon>
    </nut-avatar>

    <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>

    <nut-avatar>
      <nut-icon name="my"></nut-icon>
    </nut-avatar>
  </nut-avatar-group>
</template>
```

### 组合头像可控制层级方向

```html
<template>
  <nut-avatar-group
    max-count="3"
    z-index="right"
    max-content="..."
  >
    <nut-avatar>
      <image src="https://xxx.xx"></image>
    </nut-avatar>

    <nut-avatar>
      <nut-icon name="my"></nut-icon>
    </nut-avatar>

    <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>

    <nut-avatar>
      <nut-icon name="my"></nut-icon>
    </nut-avatar>
  </nut-avatar-group>
</template>
```

## API

### Avatar Props

| 参数           | 说明           | 类型              | 可选值                    | 默认值    |
|--------------|--------------|-----------------|------------------------|--------|
| size         | 头像的大小，支持输入数字 | string / number | large / normal / small | normal |
| shape        | 头像的形状        | string          | square / round         | round  |
| custom-color | 字体颜色         | string          | -                      | #666   |
| bg-color     | 背景色          | string          | -                      | #eee   |

### Avatar Slots

| 名称      | 说明                  |
|---------|---------------------|
| default | 默认插槽，可放置图片、图标、文本等元素 |

### AvatarGroup Props

| 参数           | 说明                    | 类型              | 可选值                    | 默认值    |
|--------------|-----------------------|-----------------|------------------------|--------|
| max-count    | 显示的最大头像个数（-1 表示无限制）   | string / number | -                      | `-1`   |
| max-content  | 头像数量超出元素内容（默认为折叠元素数量） | string          | -                      | -      |
| size         | 头像的大小，支持输入数字          | string / number | large / normal / small | normal |
| shape        | 头像的形状                 | string          | square / round         | round  |
| max-color    | 头像折叠元素的字体颜色           | string          | -                      | #666   |
| max-bg-color | 头像折叠元素的背景色            | string          | -                      | #eee   |
| span         | 头像之间的间距               | string / number | -                      | `-8`   |
| z-index      | 组合头像之间的层级方向           | string          | left / right           | left   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                            | 默认值     |
|-------------------------------|---------|
| --nut-actionsheet-light-color | #f6f6f6 |
| --nut-avatar-square           | 5px     |
| --nut-avatar-large-width      | 60px    |
| --nut-avatar-large-height     | 60px    |
| --nut-avatar-small-width      | 32px    |
| --nut-avatar-small-height     | 32px    |
| --nut-avatar-normal-width     | 40px    |
| --nut-avatar-normal-height    | 40px    |
