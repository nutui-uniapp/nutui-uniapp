# Avatar 头像

### 介绍

用来代表用户或事物，支持图片、图标或字符展示。

### 基础用法

支持三种尺寸：small、normal、large

```html
<template>
  <nut-avatar size="large">
    <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
  </nut-avatar>
  <nut-avatar size="normal">
    <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
  </nut-avatar>
  <nut-avatar size="small">
    <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
  </nut-avatar>
</template>
```

### 头像形状

支持两种形状：square、round

```html
<template>
  <nut-avatar shape="square"><nut-icon name="my" /></nut-avatar>
  <nut-avatar shape="round"><nut-icon name="my" /></nut-avatar>
</template>
```

### 头像类型

支持三种类型：图片、Icon 以及字符

```html
<template>
  <nut-avatar>
    <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
  </nut-avatar>
  <nut-avatar><nut-icon name="my" /></nut-avatar>
  <nut-avatar>王</nut-avatar>
</template>
```

### 自定义颜色及背景色

Icon 和字符型可以自定义颜色及背景色

```html
<template>
  <nut-avatar class="demo-avatar" bg-color="#FA2C19"><My color="#fff"/></nut-avatar>
  <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>
</template>
```

### 带徽标的头像

```html
<template>
  <nut-badge value="8">
    <nut-avatar shape="square"><nut-icon name="my" /></nut-avatar>
  </nut-badge>
  <nut-badge dot>
    <nut-avatar shape="square"><nut-icon name="my" /></nut-avatar>
  </nut-badge>
</template>
```

### 头像组合展现

```html
<template>
  <nut-avatar-group span="-4">
    <nut-avatar>
      <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
    </nut-avatar>
    <nut-avatar><nut-icon name="my" /></nut-avatar>
    <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>
  </nut-avatar-group>
  <nut-avatar-group
    max-count="3"
    max-color="#fff"
    max-bgColor="#498ff2"
  >
    <nut-avatar>
      <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
    </nut-avatar>
    <nut-avatar><nut-icon name="my" /></nut-avatar>
    <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">小明</nut-avatar>
    <nut-avatar><nut-icon name="my" /></nut-avatar>
  </nut-avatar-group>
</template>
```

### 组合头像可控制层级方向

```html
<template>
  <nut-avatar-group
    max-count="3"
    zIndex="right"
    max-content="..."
  >
    <nut-avatar>
      <image src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
    </nut-avatar>
    <nut-avatar><nut-icon name="my" /></nut-avatar>
    <nut-avatar custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">U</nut-avatar>
    <nut-avatar><nut-icon name="my" /></nut-avatar>
  </nut-avatar-group>
</template>
```

## API

### Avatar Props

| 参数         | 说明                                                           | 类型             | 默认值   |
| ------------ | -------------------------------------------------------------- | ---------------- | -------- |
| size         | 头像的大小，可选值为：`large`、`normal`、`small`，支持输入数字 | string \| number | `normal` |
| shape        | 头像的形状，可选值为：`square`、`round`                        | string           | `round`  |
| custom-color | 字体颜色                                                       | string           | `#666`   |
| bg-color     | 背景色                                                         | string           | `#eee`   |

### AvatarGroup Props

| 参数         | 说明                                                                     | 类型             | 默认值   |
| ------------ | ------------------------------------------------------------------------ | ---------------- | -------- |
| max-count    | 显示的最大头像个数                                                       | string \| number | -        |
| max-content  | 头像数量超出时，会出现一个头像折叠元素，该元素内容可为`...`、`more`、`N` | string           | `N`      |
| size         | 头像的大小，可选值为：`large`、`normal`、`small`，支持直接输入数字       | string \| number | `normal` |
| shape        | 头像的形状，可选值为：`square`、`round`                                  | string           | `round`  |
| max-color    | 头像折叠元素的字体颜色                                                   | string           | `#666`   |
| max-bg-color | 头像折叠元素的背景色                                                     | string           | `#eee`   |
| span         | 头像之间的间距                                                           | string           | `-8`     |
| z-index      | 组合头像之间的层级方向，可选值为：`left`、`right`                        | string           | `left`   |

### Avatar Slots

| 名称    | 描述                                   |
| ------- | -------------------------------------- |
| default | 默认插槽，可放置图片、图标、文本等元素 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                          | 默认值  |
| ----------------------------- | ------- |
| --nut-actionsheet-light-color | #f6f6f6 |
| --nut-avatar-square           | 5px     |
| --nut-avatar-large-width      | 60px    |
| --nut-avatar-large-height     | 60px    |
| --nut-avatar-small-width      | 32px    |
| --nut-avatar-small-height     | 32px    |
| --nut-avatar-normal-width     | 40px    |
| --nut-avatar-normal-height    | 40px    |
