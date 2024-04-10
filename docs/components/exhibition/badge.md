# Badge 徽标

### 介绍

出现在图标或文字右上角的红色圆点、数字或者文字，表示有新内容或者待处理的信息。

### 基础用法

```html
<template>
  <div class="demo">
    <nut-badge :value="8">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge :value="76">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge value="NEW">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge dot>
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
  </div>
</template>

<style lang="scss">
.demo{
  padding: 30px 17px 0 17px;
}
.nut-badge {
  margin-right: 40px;
}
</style>

```

### 最大值

```html
<template>
  <div class="demo">
    <nut-badge :value="200" :max="9">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge :value="200" :max="20">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge :value="200" :max="99">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
  </div>
</template>

<style lang="scss">
.demo{
  padding: 30px 17px 0 17px;
}
.nut-badge {
  margin-right: 40px;
}
</style>

```

### 自定义颜色

```html
<template>
  <div class="demo">
    <nut-badge :value="8" custom-color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge :value="76" custom-color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge value="NEW" custom-color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge dot custom-color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
  </div>
</template>

<style lang="scss">
.demo{
  padding: 30px 17px 0 17px;
}
.nut-badge {
  margin-right: 40px;
}
</style>

```

### 自定义徽标内容

```html
<template>
  <div class="demo">
    <nut-badge>
      <template #icon>
        <nut-icon  name="check" custom-color="#ffffff" size="12px" />
      </template>
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge>
      <template #icon>
        <nut-icon  name="link" custom-color="#ffffff" size="12px" />
      </template>
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge>
      <template #icon>
       <nut-icon  name="download" custom-color="#ffffff" size="12px" />
      </template>
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.demo{
  padding: 30px 17px 0 17px;
}
.nut-badge {
  margin-right: 40px;
}
</style>

```

### 自定义位置

```html
<template>
  <div class="demo">
    <nut-badge :value="8" top="5" right="5">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge :value="76" top="10" right="10">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
    <nut-badge value="NEW">
      <nut-avatar shape="square"></nut-avatar>
    </nut-badge>
   </div>
</template>

<style lang="scss">
.demo{
  padding: 30px 17px 0 17px;
}
.nut-badge {
  margin-right: 40px;
}
</style>

```

### 独立展示

```html
<template>
  <div class="demo">
    <nut-badge :value="8"> </nut-badge>
    <nut-badge :value="76"> </nut-badge>
    <nut-badge value="NEW"> </nut-badge>
  </div>
</template>

<style lang="scss">
.demo{
  padding: 30px 17px 0 17px;
}
.nut-badge {
  margin-right: 40px;
}
</style>

```

## API

### Props  

| 参数              | 说明                                         | 类型    | 默认值    |
| ----------------- | -------------------------------------------- | ------- | --------- |
| value             | 显示的内容                                   | string  | `-`       |
| max               | `value` 为数值时，最大值                     | number  | `10000`   |
| z-index           | 徽标的 `z-index` 值                          | number  | `10`      |
| dot               | 是否为小点                                   | boolean | `false`   |
| bubble(`>v4.0.0`) | 是否为气泡形状                               | Boolean | `false`   |
| hidden            | 是否隐藏                                     | boolean | `false`   |
| top               | 上下偏移量，支持单位设置，可设置为：`5px` 等 | number  | `0`       |
| right             | 左右偏移量，支持单位设置，可设置为：`5px` 等 | number  | `0`       |
| custom-color      | 徽标背景颜色                                 | string  | `#fa2c19` |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 徽标包裹的子元素 |
| icon    | 徽标自定义       |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                          | 默认值                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| --nut-badge-background-color  | linear-gradient(135deg, var(--nut-primary-color) 0%, var(--nut-primary-color-end) 100%) |
| --nut-badge-color             | #fff                                                                                    |
| --nut-badge-font-size         | var(--nut-font-size-1)                                                                  |
| --nut-badge-border-radius     | 14px                                                                                    |
| --nut-badge-icon-padding      | 4px                                                                                     |
| --nut-badge-padding           | 0 5px                                                                                   |
| --nut-badge-content-transform | translate(50%, -50%)                                                                    |
| --nut-badge-z-index           | 1                                                                                       |
| --nut-badge-dot-width         | 7px                                                                                     |
| --nut-badge-dot-height        | 7px                                                                                     |
| --nut-badge-dot-border-radius | 7px                                                                                     |
| --nut-badge-dot-padding       | 0px                                                                                     |
