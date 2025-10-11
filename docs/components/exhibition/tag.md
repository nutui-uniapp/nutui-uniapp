# Tag 标签

### 介绍

用于标记和分类的标签。

### 基础用法

```html
<nut-tag type="primary">标签</nut-tag>
<nut-tag type="success">标签</nut-tag>
<nut-tag type="danger">标签</nut-tag>
<nut-tag type="warning">标签</nut-tag>
```

### 样式风格

```html
<!-- 空心样式 -->
<nut-tag plain>标签</nut-tag>

<!-- 圆角样式 -->
<nut-tag type="primary" round>标签</nut-tag>

<!-- 标记样式 -->
<nut-tag type="primary" mark>标签</nut-tag>

<!-- 可关闭标签 -->
<nut-tag v-if="show" type="primary" closeable @close="close">标签</nut-tag>

<!-- 关闭图标大小 -->
<nut-tag type="primary" closeable close-icon-size="8">标签</nut-tag>
```

```typescript
const show = ref<boolean>(true)

function close() {
  show.value = false
}
```

### 颜色自定义

```html
<!-- 背景颜色 -->
<nut-tag custom-color="#fa685d">标签</nut-tag>

<!-- 文字颜色 -->
<nut-tag custom-color="#e9e9e9" text-color="#999999">标签</nut-tag>

<!-- 空心颜色 -->
<nut-tag custom-color="#fa2400" plain>标签</nut-tag>
```

### 禁用状态

> 自 `1.7.7` 开始支持禁用标签，禁用后不会触发 `click` 和 `close` 事件

```html
<!-- 普通标签 -->
<nut-tag type="primary" disabled @click="onClick">标签</nut-tag>

<!-- 可关闭标签 -->
<nut-tag v-if="show" type="primary" closeable disabled @close="close">标签</nut-tag>
```

## API

### Props

| 参数                    | 说明             | 类型            | 可选值                                                 | 默认值  |
|-------------------------|----------------|-----------------|--------------------------------------------------------|---------|
| type                    | 标签类型         | string          | primary \| 、 \| success \| 、 \| danger \| 、 \| warning | default |
| custom-color            | 标签颜色         | string          | -                                                      | -       |
| text-color              | 文本颜色         | string          | -                                                      | -       |
| plain                   | 是否为空心样式   | boolean         | -                                                      | `false` |
| round                   | 是否为圆角样式   | boolean         | -                                                      | `false` |
| mark                    | 是否为标记样式   | boolean         | -                                                      | `false` |
| closeable               | 是否为可关闭标签 | boolean         | -                                                      | `false` |
| close-icon-size `1.7.7` | 关闭图标大小     | number / string | -                                                      | 11px    |
| disabled `1.7.7`        | 是否禁用         | boolean         | -                                                      | `false` |

### Slots

| 名称    | 说明         |
|---------|------------|
| default | 标签显示内容 |

### Events

| 事件名 | 说明     | 回调参数 |
|--------|--------|----------|
| click  | 点击事件 | `event`  |
| close  | 关闭事件 | `event`  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                        | 默认值        |
|---------------------------------------------|---------------|
| --nut-tag-height                            | auto          |
| --nut-tag-padding `1.7.8`                   | 0 4px         |
| --nut-tag-font-size                         | 12px          |
| --nut-tag-default-color                     | #fff          |
| --nut-tag-border-width                      | 1px           |
| --nut-tag-default-border-radius             | 4px           |
| --nut-tag-round-border-radius               | 8px           |
| --nut-tag-mark-border-radius                | 0 12px 12px 0 |
| --nut-tag-default-background-color          | #000          |
| --nut-tag-primary-background-color          | #3460fa       |
| --nut-tag-success-background-color          | #4fc08d       |
| --nut-tag-danger-background-color           | #df3526       |
| --nut-tag-warning-background-color          | #f3812e       |
| --nut-tag-plain-background-color            | transparent   |
| --nut-tag-disabled-background-color `1.7.7` | #ccc          |
| --nut-tag-disabled-close-color `1.7.7`      | #aaa          |
