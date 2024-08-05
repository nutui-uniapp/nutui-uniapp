# Picker

### 介绍

提供多个选项集合供用户选择其中一项，通常与弹出层组件配合使用。

### 基础用法

```html
<template>
  <nut-picker :columns="columns"
              title="城市选择"
              @change="onChange"
              @confirm="onConfirm"></nut-picker>
</template>
```

```typescript
import type { PickerBaseEvent, PickerChangeEvent } from 'nutui-uniapp'

const columns = ref([
  { text: '南京市', value: 'NanJing' },
  { text: '无锡市', value: 'WuXi' },
  { text: '海北藏族自治区', value: 'ZangZu' },
  { text: '北京市', value: 'BeiJing' },
  { text: '连云港市', value: 'LianYunGang' },
  { text: '浙江市', value: 'ZheJiang' },
  { text: '江苏市', value: 'JiangSu' }
])

function onChange({ columnIndex, selectedValue, selectedOptions }: PickerChangeEvent) {
  console.log(columnIndex, selectedValue, selectedOptions)
}

function onConfirm({ selectedValue, selectedOptions }: PickerBaseEvent) {
  console.log(selectedValue, selectedOptions)
}
```

### 搭配 Popup 使用

Picker 通常作为用于辅助表单填写，可以搭配 Popup 实现效果。

```html
<template>
  <nut-cell title="城市选择" :desc="popupDesc" @click="show = true"></nut-cell>

  <nut-popup v-model:visible="show" position="bottom" safe-area-inset-bottom>
    <nut-picker v-model="popupValue"
                :columns="columns"
                title="城市选择"
                @confirm="onConfirm"
                @cancel="show = false">
      <nut-button block type="primary">
        永远有效
      </nut-button>
    </nut-picker>
  </nut-popup>
</template>
```

```typescript
import type { PickerBaseEvent } from 'nutui-uniapp'

const show = ref<boolean>(false)
const popupDesc = ref<string>('')
const popupValue = ref<string[]>([])

const columns = ref([
  { text: '南京市', value: 'NanJing' },
  { text: '无锡市', value: 'WuXi' },
  { text: '海北藏族自治区', value: 'ZangZu' },
  { text: '北京市', value: 'BeiJing' },
  { text: '连云港市', value: 'LianYunGang' },
  { text: '浙江市', value: 'ZheJiang' },
  { text: '江苏市', value: 'JiangSu' }
])

function onConfirm({ selectedValue, selectedOptions }: PickerBaseEvent) {
  console.log(selectedValue, selectedOptions)

  popupDesc.value = selectedOptions.map(item => item.text).join(',')
  show.value = false
}
```

### 默认选中项

通过设置 `modelValue` 实现默认选中项，`modelValue` 是一个包含每项配置 value 值的数组。

```html
<template>
  <nut-picker v-model="selectedValue"
              :columns="columns"
              title="城市选择"
              @confirm="onConfirm"></nut-picker>
</template>
```

```typescript
const selectedValue = ref<string[]>(['ZheJiang'])

const columns = ref([
  { text: '南京市', value: 'NanJing' },
  { text: '无锡市', value: 'WuXi' },
  { text: '海北藏族自治区', value: 'ZangZu' },
  { text: '北京市', value: 'BeiJing' },
  { text: '连云港市', value: 'LianYunGang' },
  { text: '浙江市', value: 'ZheJiang' },
  { text: '江苏市', value: 'JiangSu' }
])
```

### 3D效果

属性 `three-dimensional` 可开启 3D 滚动效果。

```html {4}
<template>
  <nut-picker :columns="columns"
              title="城市选择"
              three-dimensional
              @change="onChange"
              @confirm="onConfirm"></nut-picker>
</template>
```

### 多列展示

`columns` 属性可以通过二维数组的形式配置多列选择。

```html
<template>
  <nut-picker v-model="selectedValue"
              :columns="multipleColumns"
              title="城市选择"
              @confirm="onConfirm"></nut-picker>
</template>
```

```typescript
const selectedValue = ref<string[]>(['Wednesday', 'Afternoon'])

const multipleColumns = ref([
  [
    { text: '周一', value: 'Monday' },
    { text: '周二', value: 'Tuesday' },
    { text: '周三', value: 'Wednesday' },
    { text: '周四', value: 'Thursday' },
    { text: '周五', value: 'Friday' }
  ],
  [
    { text: '上午', value: 'Morning' },
    { text: '下午', value: 'Afternoon' },
    { text: '晚上', value: 'Evening' }
  ]
])
```

### 多级联动

使用 `columns` 属性的 `children` 字段可以实现选项级联的效果。

```html
<template>
  <nut-picker v-model="selectedCascader"
              :columns="cascaderColumns"
              title="城市选择"
              @confirm="onConfirm"></nut-picker>
</template>
```

```typescript
const selectedCascader = ref<string[]>(['FuJian', 'FuZhou', 'TaiJiang'])

const cascaderColumns = ref([
  {
    text: '浙江',
    value: 'ZheJiang',
    children: [
      {
        text: '杭州',
        value: 'HangZhou',
        children: [
          { text: '西湖区', value: 'XiHu' },
          { text: '余杭区', value: 'YuHang' }
        ]
      },
      {
        text: '温州',
        value: 'WenZhou',
        children: [
          { text: '鹿城区', value: 'LuCheng' },
          { text: '瓯海区', value: 'OuHai' }
        ]
      }
    ]
  },
  {
    text: '福建',
    value: 'FuJian',
    children: [
      {
        text: '福州',
        value: 'FuZhou',
        children: [
          { text: '鼓楼区', value: 'GuLou' },
          { text: '台江区', value: 'TaiJiang' }
        ]
      },
      {
        text: '厦门',
        value: 'XiaMen',
        children: [
          { text: '思明区', value: 'SiMing' },
          { text: '海沧区', value: 'HaiCang' }
        ]
      }
    ]
  }
])
```

### 自定义字段名

自 `0.3.0` 开始可以使用 `field-names` 属性自定义 `columns` 中数据的格式。

```html
<template>
  <nut-picker :columns="customColumns"
              title="城市选择"
              :field-names="fieldNames"
              @confirm="onConfirm" />
</template>
```

```typescript
const customColumns = ref([
  {
    name: '浙江',
    code: 'ZheJiang',
    list: [
      {
        name: '杭州',
        code: 'HangZhou',
        list: [
          { name: '西湖', code: 'XiHu' },
          { name: '余杭', code: 'YuHang' }
        ]
      },
      {
        name: '温州',
        code: 'WenZhou',
        list: [
          { name: '鹿城区', code: 'LuCheng' },
          { name: '瓯海区', code: 'OuHai' }
        ]
      }
    ]
  }
])

const fieldNames = ref({
  text: 'name',
  value: 'code',
  children: 'list'
})
```

## API

### Props

| 参数                  | 说明               | 类型                                 | 默认值                                                                              |
|---------------------|------------------|------------------------------------|----------------------------------------------------------------------------------|
| v-model             | 选中项              | (string \| number)[]               | `[]`                                                                             |
| columns             | 对象数组，配置每一列显示的数据  | (PickerOption \| PickerOption[])[] | `[]`                                                                             |
| show-toolbar        | 是否显示顶部导航         | boolean                            | `true`                                                                           |
| title               | 设置标题             | string                             | -                                                                                |
| ok-text             | 确定按钮文案           | string                             | 确定                                                                               |
| cancel-text         | 取消按钮文案           | string                             | 取消                                                                               |
| three-dimensional   | 是否开启3D效果         | boolean                            | `false`                                                                          |
| swipe-duration      | 惯性滚动时长           | number \ string                    | `1000`                                                                           |
| visible-option-num  | 可见的选项个数          | number \ string                    | `7`                                                                              |
| option-height       | 选项高度             | number \ string                    | `36`                                                                             |
| field-names `0.3.0` | 自定义 columns 中的字段 | object                             | `{ text: 'text', value: 'value', children: 'children', className: 'className' }` |

### Events

| 事件名     | 说明        | 回调参数                                              |
|---------|-----------|---------------------------------------------------|
| change  | 选项发生改变时触发 | `{ columnIndex, selectedValue, selectedOptions }` |
| confirm | 点击确定按钮时触发 | `{ selectedValue, selectedOptions }`              |
| cancel  | 点击取消按钮时触发 | `{ selectedValue, selectedOptions }`              |

### Slots

| 名称      | 说明          |
|---------|-------------|
| default | 自定义滑动数据底部区域 |
| top     | 自定义滑动数据顶部区域 |

### PickerOption 数据结构

| 键名        | 说明         | 类型              | 默认值 |
|-----------|------------|-----------------|-----|
| text      | 选项的文字内容    | number \ string | -   |
| value     | 选项对应的值，且唯一 | number \ string | -   |
| children  | 用于级联选项     | PickerOption[]  | -   |
| className | 添加额外的类名    | string          | -   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                   | 默认值                      |
|--------------------------------------|--------------------------|
| --nut-picker-cancel-color            | #808080                  |
| --nut-picker-ok-color                | var(--nut-primary-color) |
| --nut-picker-bar-cancel-font-size    | 14px                     |
| --nut-picker-bar-ok-font-size        | 14px                     |
| --nut-picker-bar-button-padding      | 0 15px                   |
| --nut-picker-bar-title-font-size     | 16px                     |
| --nut-picker-bar-title-color         | var(--nut-title-color)   |
| --nut-picker-bar-title-font-weight   | normal                   |
| --nut-picker-item-height             | 36px                     |
| --nut-picker-item-text-color         | var(--nut-title-color)   |
| --nut-picker-item-text-font-size     | 14px                     |
| --nut-picker-item-active-line-border | 1px solid #d8d8d8        |
