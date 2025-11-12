# TimeSelect 配送时间

### 介绍

用于配送时间选择。

### 基础用法

```html
<template>
  <nut-time-select
    v-model:visible="visible"
    height="50%"
    :current-key="currentKey"
    :current-time="currentTime"
    @select="onSelect"
  >
    <template #pannel>
      <nut-time-pannel
        name="2月23日(今天)"
        pannel-key="0"
        @change="onChange"
      ></nut-time-pannel>

      <nut-time-pannel
        name="2月24日(星期三)"
        pannel-key="1"
        @change="onChange"
      ></nut-time-pannel>
    </template>

    <template #detail>
      <nut-time-detail :times="times" @select="onDetailSelect"></nut-time-detail>
    </template>
  </nut-time-select>
</template>
```

```ts
const visible = ref(false);

const currentKey = ref(0);
const currentTime = ref([]);

const times = reactive([
  {
    key: 0,
    list: ["9:00-10:00", "10:00-11:00", "11:00-12:00"]
  },
  {
    key: 1,
    list: ["9:00-10:00", "10:00-11:00"]
  }
]);

function onChange(pannelKey: number) {
  currentKey.value = pannelKey;
  currentTime.value = [{
    key: currentKey.value,
    list: []
  }];
};

function onDetailSelect(item: string) {
  const index = currentTime.value[0].list.findIndex((time: string) => time === item);

  if (index === -1) {
    currentTime.value[0].list.push(item);
  } else {
    currentTime.value[0].list.splice(index, 1);
  }
};

function onSelect(event: any) {
  console.log("选择", event);
};

onMounted(() => {
  currentTime.value.push({
    key: currentKey.value,
    list: []
  });
});
```

## API

### Props

| 参数               | 说明                                        | 类型              | 可选值 | 默认值     |
|------------------|-------------------------------------------|-----------------|-----|---------|
| visible          | 是否显示弹层                                    | boolean         | -   | `false` |
| height           | 弹层的高度                                     | string          | -   | 20%     |
| title            | 弹层标题                                      | string          | -   | 取件时间    |
| current-key      | 唯一标识                                      | string / number | -   | `0`     |
| current-time     | 当前选择的时间 `{key: string; list: string[]}[]` | Array           | -   | `[]`    |
| lock-scroll `H5` | 背景是否锁定                                    | boolean         | -   | `true`  |

### Events

| 事件名    | 说明        | 类型                                                 |
|--------|-----------|----------------------------------------------------|
| select | 关闭遮罩之后的回调 | `(value: { key: string; list: string[] }) => void` |

### Slots

| 名称     | 说明   |
|--------|------|
| title  | 更改标题 |
| pannel | 左侧列表 |
| detail | 右侧内容 |

### TimePannel Props

| 参数         | 说明    | 类型              | 可选值 | 默认值 |
|------------|-------|-----------------|-----|-----|
| name       | 显示的名称 | string          | -   | -   |
| pannel-key | 唯一标识  | string / number | -   | `0` |

### TimePannel Events

| 事件名    | 说明      | 类型                                      |
|--------|---------|-----------------------------------------|
| change | 点击内容的回调 | `(pannelKey: string \| number) => void` |

### TimeDetail Props

| 参数    | 说明     | 类型    | 可选值 | 默认值  |
|-------|--------|-------|-----|------|
| times | 可选择的时间 | Array | -   | `[]` |

### TimeDetail Events

| 事件名    | 说明      | 类型                       |
|--------|---------|--------------------------|
| select | 点击时间的回调 | `(time: string) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                              | 默认值                      |
|-------------------------------------------------|--------------------------|
| --nut-timeselect-title-font-size                | var(--nut-font-size-2)   |
| --nut-timeselect-title-color                    | var(--nut-title-color)   |
| --nut-timeselect-title-width                    | 100%                     |
| --nut-timeselect-title-height                   | 50px                     |
| --nut-timeselect-title-line-height              | 50px                     |
| --nut-timeselect-pannel-bg-color                | #f6f7f9                  |
| --nut-timeselect-timepannel-text-color          | var(--nut-title-color2)  |
| --nut-timeselect-timepannel-font-size           | var(--nut-font-size-2)   |
| --nut-timeselect-timepannel-cur-bg-color        | var(--nut-white)         |
| --nut-timeselect-timepannel-cur-text-color      | #333333                  |
| --nut-timeselect-timepannel-width               | 140px                    |
| --nut-timeselect-timepannel-height              | 40px                     |
| --nut-timeselect-timepannel-padding             | 15px                     |
| --nut-timeselect-timedetail-padding             | 0 5px 50px 13px          |
| --nut-timeselect-timedetail-item-width          | 100px                    |
| --nut-timeselect-timedetail-item-height         | 50px                     |
| --nut-timeselect-timedetail-item-line-height    | 50px                     |
| --nut-timeselect-timedetail-item-bg-color       | #f6f7f9                  |
| --nut-timeselect-timedetail-item-border-radius  | 5px                      |
| --nut-timeselect-timedetail-item-text-color     | #333333                  |
| --nut-timeselect-timedetail-item-text-font-size | var(--nut-font-size-2)   |
| --nut-timeselect-timedetail-item-cur-bg-color   | var(--nut-primary-color) |
| --nut-timeselect-timedetail-item-cur-border     | var(--nut-primary-color) |
| --nut-timeselect-timedetail-item-cur-text-color | var(--nut-primary-color) |
