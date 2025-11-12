# SideNavbar 侧边栏导航

### 介绍

用于内容选择和切换。

### 基础用法

```html
<template>
  <nut-popup
    v-model:visible="visible"
    :style="{ width: '80%', height: '100%' }"
    position="right"
  >
    <nut-side-navbar>
      <nut-subside-navbar title="智能城市AI" ikey="6">
        <nut-subside-navbar title="人体识别1" ikey="9">
          <nut-side-navbaritem title="人体检测1" ikey="10"></nut-side-navbaritem>
          <nut-side-navbaritem title="细粒度人像分割1" ikey="11"></nut-side-navbaritem>
        </nut-subside-navbar>

        <nut-subside-navbar title="人体识别2" ikey="12">
          <nut-side-navbaritem title="人体检测2" ikey="13"></nut-side-navbaritem>
          <nut-side-navbaritem title="细粒度人像分割2" ikey="14"></nut-side-navbaritem>
        </nut-subside-navbar>
      </nut-subside-navbar>
    </nut-side-navbar>
  </nut-popup>
</template>
```

### 嵌套（建议最多三层）

该组件在小程序环境下不支持异步加载数据，建议在获取到完整数据后再进行组件的渲染。

```html
<template>
  <nut-popup
    v-model:visible="visible"
    :style="{ width: '80%', height: '100%' }"
    position="right"
  >
    <nut-side-navbar>
      <nut-side-navbaritem title="人脸识别" ikey="1"></nut-side-navbaritem>
      <nut-side-navbaritem title="自然语言处理" ikey="2"></nut-side-navbaritem>

      <nut-subside-navbar title="图像理解" ikey="3" :open="false">
        <nut-side-navbaritem title="菜品识别" ikey="4"></nut-side-navbaritem>
        <nut-side-navbaritem title="拍照购" ikey="5"></nut-side-navbaritem>
      </nut-subside-navbar>

      <nut-subside-navbar title="智能城市AI" ikey="6">
        <nut-side-navbaritem title="企业风险预警模型" ikey="7"></nut-side-navbaritem>
        <nut-side-navbaritem title="水质量检测" ikey="8"></nut-side-navbaritem>

        <nut-subside-navbar title="人体识别" ikey="9">
          <nut-side-navbaritem title="人体检测" ikey="10"></nut-side-navbaritem>
          <nut-side-navbaritem title="细粒度人像分割" ikey="11"></nut-side-navbaritem>
        </nut-subside-navbar>
      </nut-subside-navbar>

      <nut-subside-navbar title="自然语言处理" ikey="12">
        <nut-side-navbaritem title="词法分析" ikey="13"></nut-side-navbaritem>
        <nut-side-navbaritem title="句法分析" ikey="14"></nut-side-navbaritem>
      </nut-subside-navbar>
    </nut-side-navbar>
  </nut-popup>
</template>
```

## API

### SideNavbar Props

| 参数     | 说明     | 类型              | 可选值 | 默认值  |
|--------|--------|-----------------|-----|------|
| offset | 导航缩进宽度 | number / string | -   | `15` |

### SubSideNavbar Props

| 参数    | 说明       | 类型              | 可选值 | 默认值    |
|-------|----------|-----------------|-----|--------|
| title | 导航标题     | string          | -   | -      |
| ikey  | 导航唯一标识   | number / string | -   | -      |
| open  | 导航是否默认展开 | boolean         | -   | `true` |

### SubSideNavbar Events

| 事件名         | 说明   | 类型           |
|-------------|------|--------------|
| title-click | 导航点击 | `() => void` |

### SideNavbarItem Props

| 参数    | 说明     | 类型              | 可选值 | 默认值 |
|-------|--------|-----------------|-----|-----|
| title | 导航标题   | string          | -   | -   |
| ikey  | 导航唯一标识 | number / string | -   | -   |

### SideNavbarItem Events

| 事件名   | 说明   | 类型           |
|-------|------|--------------|
| click | 导航点击 | `() => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                          | 默认值                        | 描述 |
|---------------------------------------------|----------------------------|----|
| --nut-sidenavbar-content-bg-color           | var(--nut-white)           | -  |
| --nut-sidenavbar-sub-title-border-color     | #f6f6f6                    | -  |
| --nut-sidenavbar-sub-title-bg-color         | #f6f6f6                    | -  |
| --nut-sidenavbar-sub-title-font-size        | var(--nut-font-size-large) | -  |
| --nut-sidenavbar-sub-title-radius           | 0                          | -  |
| --nut-sidenavbar-sub-title-border           | 0                          | -  |
| --nut-sidenavbar-sub-title-width            | 100%                       | -  |
| --nut-sidenavbar-sub-title-height           | 40px                       | -  |
| --nut-sidenavbar-sub-title-text-line-height | 40px                       | -  |
| --nut-sidenavbar-sub-title-text-color       | var(--nut-title-color)     | -  |
| --nut-sidenavbar-item-title-color           | #333                       | -  |
| --nut-sidenavbar-item-title-bg-color        | var(--nut-white)           | -  |
| --nut-sidenavbar-item-height                | 40px                       | -  |
| --nut-sidenavbar-item-line-height           | 40px                       | -  |
| --nut-sidenavbar-item-font-size             | 16px                       | -  |
