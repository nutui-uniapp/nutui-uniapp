# Form 表单

### 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

### 基础用法

```html
<template>
  <nut-form>
    <nut-form-item label="姓名">
      <nut-input v-model="form.name" placeholder="请输入姓名"></nut-input>
    </nut-form-item>
    <nut-form-item label="年龄">
      <nut-input v-model="form.age" placeholder="请输入年龄"></nut-input>
    </nut-form-item>
    <nut-form-item label="联系电话">
      <nut-input v-model="form.tel" placeholder="请输入联系电话"></nut-input>
    </nut-form-item>
    <nut-form-item label="地址">
      <nut-input v-model="form.address" placeholder="请输入地址"></nut-input>
    </nut-form-item>
    <nut-form-item label="备注">
      <nut-textarea v-model="form.remarks" placeholder="请输入备注"></nut-textarea>
    </nut-form-item>
  </nut-form>
</template>
```

```ts
const form = ref({
  name: "",
  age: "",
  tel: "",
  address: "",
  remarks: ""
});
```

### 动态表单

```html
<template>
  <nut-form ref="formEl" :model-value="form">
    <nut-form-item
      label="姓名"
      prop="name"
      :rules="[{ required: true, message: '请填写姓名' }]"
      required
    >
      <nut-input v-model="form.name" placeholder="请输入姓名"></nut-input>
    </nut-form-item>
    <nut-form-item
      v-for="(item, index) in form.tels"
      :key="item.key"
      :label="`联系方式${index}`"
      :prop="`tels.${index}.value`"
      :rules="[{ required: true, message: `请填写联系方式${index}` }]"
      required
    >
      <nut-input v-model="item.value" :placeholder="`请输入联系方式${index}`"></nut-input>
    </nut-form-item>

    <nut-cell>
      <nut-button @click="create()">添加</nut-button>
      <nut-button @click="remove()">删除</nut-button>
      <nut-button @click="submit()">提交</nut-button>
      <nut-button @click="reset()">重置提示状态</nut-button>
    </nut-cell>
  </nut-form>
</template>
```

```ts
import type { FormInst } from "nutui-uniapp";

const formEl = ref<FormInst>();

const form = reactive({
  name: "",
  tels: [
    { key: 1, value: "" }
  ]
});

function create() {
  form.tels.push({
    key: Date.now(),
    value: ""
  });
}

function remove() {
  form.tels.splice(-1);
}

async function submit() {
  const { valid, errors } = await formEl.value.validate();

  if (!valid) {
    console.log(errors[0].message);
    console.log("submit error", errors);
    return;
  }

  console.log("submit success", form);
}

function reset() {
  formEl.value.reset();
}
```

### 表单校验

```html
<template>
  <nut-form ref="formEl" :model-value="form" :rules="rules">
    <nut-form-item label="姓名" prop="name">
      <nut-input
        v-model="form.name"
        placeholder="请输入姓名（blur 事件校验）"
        @blur="validateItem('name')"
      ></nut-input>
    </nut-form-item>
    <nut-form-item
      label="年龄"
      prop="age"
      :rules="[
        { required: true, message: '请填写年龄' },
        { validator: customValidator, message: '必须输入数字' },
        { validator: customRulePropValidator, message: '必须输入数字', reg: /^\d+$/ },
        { regex: /^(\d{1,2}|1\d{2}|200)$/, message: '必须输入0-200区间' },
      ]"
      required
    >
      <nut-input v-model="form.age" placeholder="请输入年龄，必须数字且0-200区间"></nut-input>
    </nut-form-item>
    <nut-form-item
      label="联系电话"
      prop="tel"
      :rules="[
        { required: true, message: '请填写联系电话' },
        { validator: asyncValidator, message: '电话格式不正确' },
      ]"
      required
    >
      <nut-input v-model="form.tel" placeholder="请输入联系电话，异步校验电话格式"></nut-input>
    </nut-form-item>
    <nut-form-item
      label="地址"
      prop="address"
      :rules="[{ required: true, message: '请填写地址' }]"
      required
    >
      <nut-input v-model="form.address" placeholder="请输入地址"></nut-input>
    </nut-form-item>

    <nut-cell>
      <nut-button @click="submit()">提交</nut-button>
      <nut-button @click="reset()">重置提示状态</nut-button>
    </nut-cell>
  </nut-form>
</template>
```

```ts
import type { FormInst, FormItemRuleWithoutValidator } from "nutui-uniapp";

const formEl = ref<FormInst>();

const form = reactive({
  name: "",
  age: "",
  tel: "",
  address: ""
});

const rules = {
  name: [
    { required: true, message: "请填写姓名" },
    { validator: (value: string) => value.length >= 2, message: "至少两个字符" }
  ]
};

function customValidator(value: string) {
  return /^\d+$/.test(value);
}

function customRulePropValidator(value: string, rule: FormItemRuleWithoutValidator) {
  return (rule.reg as RegExp).test(value);
}

function asyncValidator(value: string) {
  return new Promise((resolve) => {
    console.log("模拟异步验证中...");

    setTimeout(() => {
      console.log("验证完成");
      resolve(/^400(-?)\d{7}$|^1\d{10}$|^0\d{2,3}-\d{7,8}$/.test(value));
    }, 1000);
  });
}

function validateItem(prop: string) {
  formEl.value.validate(prop);
}

async function submit() {
  const { valid, errors } = await formEl.value.validate();

  if (!valid) {
    console.log(errors[0].message);
    console.log("submit error", errors);
    return;
  }

  console.log("submit success", form);
}

function reset() {
  formEl.value.reset();
}
```

### 表单类型

```html
<template>
  <nut-form>
    <nut-form-item label="开关">
      <nut-switch v-model="form.switch"></nut-switch>
    </nut-form-item>
    <nut-form-item label="复选框">
      <nut-checkbox v-model="form.checkbox">复选框</nut-checkbox>
    </nut-form-item>
    <nut-form-item label="单选按钮">
      <nut-radio-group v-model="form.radio" direction="horizontal">
        <nut-radio label="1">选项1</nut-radio>
        <nut-radio label="2" disabled>选项2</nut-radio>
        <nut-radio label="3">选项3</nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="评分">
      <nut-rate v-model="form.rate"></nut-rate>
    </nut-form-item>
    <nut-form-item label="步进器">
      <nut-input-number v-model="form.number"></nut-input-number>
    </nut-form-item>
    <nut-form-item label="滑块">
      <nut-range v-model="form.range" hidden-tag></nut-range>
    </nut-form-item>
    <nut-form-item label="文件上传">
      <nut-uploader
        v-model:file-list="form.fileList"
        url="http://服务地址"
        accept="image/*"
        multiple
        maximum="3"
      ></nut-uploader>
    </nut-form-item>
    <nut-form-item label="地址" is-link>
      <nut-input
        v-model="form.address"
        placeholder="请选择地址"
        readonly
        @click="chooseAddress()"
      ></nut-input>
      <nut-address
        v-model:visible="address.visible"
        :province="address.province"
        :city="address.city"
        :country="address.country"
        :town="address.town"
        custom-address-title="请选择所在地区"
        @change="onAddressChange"
      ></nut-address>
    </nut-form-item>
  </nut-form>
</template>
```

```ts
 const form = reactive({
  switch: false,
  checkbox: false,
  radio: 0,
  rate: 3,
  number: 0,
  range: 30,
  address: "",
  fileList: [
    {
      type: "image",
      name: "文件1.png",
      url: "https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif",
      status: "success",
      message: "上传成功"
    },
    {
      type: "image",
      name: "文件2.png",
      url: "https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif",
      status: "uploading",
      message: "上传中..."
    }
  ]
});

const address = reactive({
  visible: false,
  province: [
    { id: 1, name: "北京" },
    { id: 2, name: "广西" },
    { id: 3, name: "江西" },
    { id: 4, name: "四川" }
  ],
  city: [
    { id: 7, name: "朝阳区" },
    { id: 8, name: "崇文区" },
    { id: 9, name: "昌平区" },
    { id: 6, name: "石景山区" }
  ],
  country: [
    { id: 3, name: "八里庄街道" },
    { id: 9, name: "北苑" },
    { id: 4, name: "常营乡" }
  ],
  town: []
});

function chooseAddress() {
  address.visible = true;
  form.address = "";
}

function onAddressChange({ next, value }: any) {
  form.address += value.name;

  const nextList = address[next];
  if (nextList.length < 1) {
    address.visible = false;
  }
}
```

### 自定义 Label & Star 位置

自 `1.5.7` 开始支持自定义标签和星标位置。

```html
<template>
  <nut-form label-position="top" star-position="right">
    <nut-form-item label="姓名" required>
      <nut-input v-model="form.name" placeholder="请输入姓名"></nut-input>
    </nut-form-item>
    <nut-form-item label="年龄" required>
      <nut-input v-model="form.age" placeholder="请输入年龄"></nut-input>
    </nut-form-item>
  </nut-form>
</template>
```

## API

### Form Props

| 参数                     | 说明                           | 类型                 | 可选值 | 默认值     |
|------------------------|------------------------------|--------------------|-----|---------|
| v-model                | 表单数据对象                       | object             | -   | `{}`    |
| rules                  | 统一配置每个 `form-item` 的 `rules` | object             | -   | `{}`    |
| disabled `1.6.8`       | 禁用表单下的所有数据录入组件               | boolean            | -   | `false` |
| label-position `1.5.7` | 表单项 label 的位置                | top / left / right | -   | left    |
| star-position `1.5.7`  | 必填表单项 label 的红色星标位置          | left / right       | -   | left    |

### Form Events

| 事件名      | 说明            | 类型                                                   |
|----------|---------------|------------------------------------------------------|
| validate | 任一表单项被校验失败后触发 | `(event: { prop: string; message: string }) => void` |

### Form Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Form 实例并调用实例方法。

| 名称       | 说明                          | 类型                                                                       |
|----------|-----------------------------|--------------------------------------------------------------------------|
| submit   | 提交表单进行校验的方法                 | `() => void`                                                             |
| reset    | 清空校验结果                      | `() => void`                                                             |
| validate | 用户主动触发校验（不传 `prop` 会校验所有字段） | `(prop?: string) => Promise<{ valid: boolean; errors: ErrorMessage[] }>` |

### FormItem Props

| 参数                     | 说明                                                  | 类型               | 可选值                   | 默认值     |
|------------------------|-----------------------------------------------------|------------------|-----------------------|---------|
| required               | 是否显示必填字段的标签旁边的红色星号                                  | boolean          | -                     | `false` |
| prop                   | 表单域 `v-model` 字段                                    | string           | -                     | -       |
| rules                  | 定义校验规则                                              | `FormItemRule[]` | -                     | `[]`    |
| label-width            | 表单项 label 宽度（单位：px）                                 | number / string  | -                     | `90`    |
| label-align            | 表单项 label 对齐方式                                      | string           | left / center / right | left    |
| body-align             | 右侧插槽对齐方式                                            | string           | left / center / right | left    |
| error-message-align    | 错误提示文案对齐方式                                          | string           | left / center / right | left    |
| show-error-line        | 是否在校验不通过时标红输入框                                      | boolean          | -                     | `true`  |
| show-error-message     | 是否在校验不通过时在输入框下方展示错误提示                               | boolean          | -                     | `true`  |
| label-position `1.5.7` | 表单项 label 的位置，优先级高于 `form` 中的 `label-position`      | string           | top / left / right    | -       |
| star-position `1.5.7`  | 必填表单项 label 的红色星标位置，优先级高于 `form` 中的 `star-position` | string           | left / right          | -       |
| is-link `1.8.4`        | 是否展示右侧箭头                                            | boolean          | -                     | `false` |

#### FormItemRule 数据结构

| 参数        | 说明          | 类型                                                                                  |
|-----------|-------------|-------------------------------------------------------------------------------------|
| required  | 是否为必选字段     | boolean                                                                             |
| message   | 错误提示文案      | string                                                                              |
| validator | 通过函数进行校验    | `(value: any, rule: FormItemRuleWithoutValidator ) => boolean \| string \| Promise` |
| regex     | 通过正则表达式进行校验 | `RegExp`                                                                            |

### FormItem Slots

| 名称      | 说明           |
|---------|--------------|
| default | 自定义内容        |
| label   | 自定义 label 区域 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                       |
|---------------------------------------|---------------------------|
| --nut-form-item-error-line-color      | var(--nut-required-color) |
| --nut-form-item-required-color        | var(--nut-required-color) |
| --nut-form-item-error-message-color   | var(--nut-required-color) |
| --nut-form-item-label-font-size       | 14px                      |
| --nut-form-item-label-width           | 90px                      |
| --nut-form-item-label-margin-right    | 10px                      |
| --nut-form-item-label-text-align      | left                      |
| --nut-form-item-required-margin-right | 4px                       |
| --nut-form-item-body-font-size        | 14px                      |
| --nut-form-item-body-slots-text-align | left                      |
| --nut-form-item-body-input-text-align | left                      |
| --nut-form-item-tip-font-size         | 10px                      |
| --nut-form-item-tip-text-align        | left                      |
