# Invoice 发票

### 介绍

展示申请发票页面。

### 基础用法

```html
<template>
  <nut-invoice
    :data="data"
    :form-value="formValue"
    @onSubmit="submit"
  ></nut-invoice>
</template>
```

```ts
const data = ref([
  {
    type: "radio",
    label: "发票类型",
    radioLabel: [
      { label: "企业" },
      { label: "个人或事业单位" }
    ],
    formItemProp: "type",
    required: true
  },
  {
    label: "发票抬头",
    placeholder: "请输入发票抬头",
    formItemProp: "name",
    rules: [{ required: true, message: "请输入发票抬头" }],
    required: true
  }
  // ... 其他表单项
]);

const formValue = reactive({
  type: "企业",
  name: "",
  num: "",
  adress: "",
  tel: "",
  address: "",
  bank: "",
  account: ""
});

function submit(valid: boolean, errors: any[]) {
  if (!valid) {
    console.log("error submit!!", errors);
    return;
  }

  console.log("success", formValue);
}
```

## API

### Props

| 参数         | 说明       | 类型      | 可选值 | 默认值    |
|------------|----------|---------|-----|--------|
| data       | 发票数据     | Array   | -   | `[]`   |
| form-value | 表单数据对象   | object  | -   | -      |
| submit     | 是否显示提交按钮 | boolean | -   | `true` |

#### data 数据结构

| 参数             | 说明                                     | 类型      | 可选值           |
|----------------|----------------------------------------|---------|---------------|
| type           | 类型                                     | string  | input / radio |
| label          | 表单项 `label`                            | string  | -             |
| placeholder    | 输入框 `placeholder`                      | string  | -             |
| radio-label    | 单选 `label`                             | string  | -             |
| form-item-prop | 表单域 `v-model` 字段，在使用表单校验功能的情况下，该属性是必填的 | string  | -             |
| rules          | 校验规则，参考 [表单](/components/dentry/form)  | Array   | -             |
| required       | 是否显示必填字段的标签旁边的红色星号                     | boolean | -             |

### Events

| 事件名           | 说明       | 类型                                                                        |
|---------------|----------|---------------------------------------------------------------------------|
| on-submit     | 提交表单的方法  | `(valid: boolean \| object, errors: (boolean \| ErrorMessage)[]) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                    | 默认值            |
|-----------------------|----------------|
| --nut-invoice-padding | 10px 10px 20px |
