# Form 表单

### 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

### 基础用法

```html
<template>
  <nut-form>
    <nut-form-item label="昵称">
      <nut-input v-model="baseForm.text1" placeholder="请输入昵称"></nut-input>
    </nut-form-item>

    <nut-form-item label="网龄">
      <nut-input v-model="baseForm.text2" placeholder="请输入网龄"></nut-input>
    </nut-form-item>

    <nut-form-item label="时间">
      <nut-input v-model="baseForm.text3" placeholder="请输入时间"></nut-input>
    </nut-form-item>

    <nut-form-item label="地址">
      <nut-input v-model="baseForm.text4" placeholder="请输入地址"></nut-input>
    </nut-form-item>

    <nut-form-item label="备注">
      <nut-textarea v-model="baseForm.text5" placeholder="请输入备注" disable-default-padding></nut-textarea>
    </nut-form-item>
  </nut-form>
</template>
```

```typescript
interface BaseForm {
  text1: string
  text2: string
  text3: string
  text4: string
  text5: string
}

const baseForm = ref<BaseForm>({
  text1: '',
  text2: '',
  text3: '',
  text4: '',
  text5: ''
})
```

### 表单校验

> 自 `2.0.0` 开始
>
> - `rules` 支持 `trigger` 字段可以自动触发校验，无需手动调用 `validate` 方法
> - `nut-form-item` 支持任意嵌套布局，而无需是 `nut-form` 的直接子节点

```html
<template>
  <nut-form ref="demoFormInst" :model-value="demoForm" :rules="demoRules">
    <nut-form-item label="昵称" prop="nickname">
      <nut-input v-model="demoForm.nickname" placeholder="请输入用户昵称"></nut-input>
    </nut-form-item>

    <nut-form-item label="是否会员" prop="isVip">
      <nut-checkbox v-model="demoForm.isVip">会员</nut-checkbox>
    </nut-form-item>

    <nut-form-item label="赠送礼物" prop="gifts">
      <nut-checkbox-group v-model="demoForm.gifts">
        <nut-checkbox label="1">礼物1</nut-checkbox>
        <nut-checkbox label="2">礼物2</nut-checkbox>
        <nut-checkbox label="3">礼物3</nut-checkbox>
        <nut-checkbox label="4">礼物4</nut-checkbox>
      </nut-checkbox-group>
    </nut-form-item>

    <nut-form-item label="商品数量" prop="count">
      <nut-input-number v-model="demoForm.count"></nut-input-number>
    </nut-form-item>

    <nut-form-item label="用户喜好" prop="hobby">
      <nut-radio-group v-model="demoForm.hobby">
        <nut-radio label="1">喜好1</nut-radio>
        <nut-radio label="2">喜好2</nut-radio>
        <nut-radio label="3">喜好3</nut-radio>
      </nut-radio-group>
    </nut-form-item>

    <nut-form-item label="解锁进度" prop="progress" required>
      <nut-range v-model="demoForm.progress" hidden-tag></nut-range>
    </nut-form-item>

    <nut-form-item label="星级评价" prop="rate">
      <nut-rate v-model="demoForm.rate" @change="onDemoFormRateChange"></nut-rate>
    </nut-form-item>

    <nut-form-item label="是否启用" prop="enabled">
      <nut-switch v-model="demoForm.enabled"></nut-switch>
    </nut-form-item>

    <view>
      <view>
        <text class="mx-15px text-12px text-#999">
          支持任意嵌套布局
        </text>
        <nut-form-item label="其他信息" prop="object.test1">
          <nut-input v-model="demoForm.object.test1" placeholder="请输入其他信息"></nut-input>
        </nut-form-item>
      </view>
    </view>

    <nut-form-item label="备注信息" prop="remarks">
      <nut-textarea v-model="demoForm.remarks" placeholder="请输入备注信息" disable-default-padding></nut-textarea>
    </nut-form-item>

    <nut-cell>
      <nut-button custom-style="margin-right: 10px"
                  type="primary"
                  size="small"
                  @click="submitDemoForm">提交
      </nut-button>
      <nut-button size="small"
                  @click="clearDemoFormValidate">清除校验信息
      </nut-button>
    </nut-cell>
  </nut-form>
</template>
```

```typescript
import type { FormInst, FormRules } from 'nutui-uniapp'

interface DemoForm {
  nickname: string
  isVip: boolean
  gifts: string[]
  count: number
  hobby: string
  progress: number
  rate: number
  enabled: boolean
  remarks: string
  object: {
    test1: string
  }
}

const demoFormInst = ref<FormInst<DemoForm> | null>(null)

const demoForm = ref<DemoForm>({
  nickname: '',
  isVip: false,
  gifts: [],
  count: 1,
  hobby: '',
  progress: 0,
  rate: 0,
  enabled: false,
  remarks: '',
  object: {
    test1: ''
  }
})

// 自 2.0.0 开始，FormRules支持传入泛型，可以有正确的字段提示
const demoRules: FormRules<DemoForm> = {
  'nickname': { required: true, message: '请输入用户昵称', trigger: ['blur', 'change'] },
  'isVip': [{ required: true, message: '请选择是否为vip用户', trigger: 'change' }],
  'gifts': [
    { required: true, message: '请选择赠送的礼物', trigger: 'change' },
    { minlen: 3, message: '至少赠送3个礼物', trigger: ['change'] }
  ],
  'count': { max: 5, message: '商品数量不能超过5个', trigger: 'change' },
  'hobby': { required: true, message: '请选择用户喜好', trigger: 'change' },
  'progress': { min: 30, message: '进度不能小于30%', trigger: 'change' },
  'rate': { min: 2, message: '评价不能低于2星' },
  'remarks': [{
    // 返回值说明
    // 字符串/false：校验失败
    // true/undefined：校验通过
    validator(value) {
      if (!value.includes('nutui')) {
        // 可以直接返回字符串作为错误信息
        return '输入的备注中没有包含 "nutui" 字样'
      }
    },
    trigger: 'blur'
  }, {
    validator(value) {
      if (value.length < 10) {
        // 也可以返回false表示校验不通过，将会使用message字段作为错误信息
        return false
      }
    },
    message: '备注信息长度不能小于10',
    trigger: 'blur'
  }, {
    async validator(value) {
      // 也可以异步校验，这里用sleep模拟接口请求
      await sleep(1000)

      // 这里模拟异步处理，返回值的处理逻辑与同步校验相同
      return value.length > 30 ? '备注信息长度不能大于30' : true
    },
    trigger: 'blur'
  }, {
    validator(value) {
      // 当然，也可以返回一个Promise
      return new Promise((resolve) => {
        sleep(1000).then(() => {
          if (!value.startsWith('您好')) {
            resolve('备注信息必须以 "您好" 开头')
          }
          else {
            resolve()
          }
        })
      })
    },
    trigger: 'blur'
  }, {
    validator(value) {
      if (!value.endsWith('谢谢')) {
        // 如果你更喜欢使用reject表示错误信息，也可以这样
        return Promise.reject('备注信息必须以 "谢谢" 结尾')

        // 也可以使用Error
        // return Promise.reject(new Error('备注信息必须以 "谢谢" 结尾'))
      }
    },
    trigger: 'blur'
  }],
  // 自 2.0.0 开始支持多级prop
  'object.test1': [
    { required: true, message: '请输入其他信息', trigger: ['blur', 'change'] },
    { regex: /^[\u4E00-\u9FA5]+$/g, message: '其他信息只能输入中文', trigger: 'blur' }
  ]
}

function onDemoFormRateChange() {
  // 也可以手动调用validate方法
  demoFormInst.value?.validate('rate')
}

async function submitDemoForm() {
  const { valid, errors } = await demoFormInst.value!.validate()

  if (!valid) {
    console.log('校验不通过', errors)
    return
  }

  console.log('校验通过')
}

function clearDemoFormValidate() {
  // 自 2.0.0 开始使用 `clearValidate` 方法来清除校验信息，之前的版本使用 `reset` 方法
  demoFormInst.value?.clearValidate()
}
```

### 动态表单

```html
<template>
  <nut-form ref="dynamicFormInst" :model-value="dynamicForm">
    <nut-form-item label="姓名"
                   prop="name"
                   :rules="{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }">
      <nut-input v-model="dynamicForm.name" placeholder="请输入姓名"></nut-input>
    </nut-form-item>

    <nut-form-item v-for="(item, index) in dynamicForm.tels"
                   :key="item.key"
                   :label="`联系方式${index + 1}`"
                   :prop="`tels[${index}].value`"
                   :rules="{ required: true, message: `请输入联系方式${index + 1}`, trigger: ['blur', 'change'] }">
      <nut-input v-model="item.value" :placeholder="`请输入联系方式${index + 1}`"></nut-input>
    </nut-form-item>

    <nut-cell>
      <nut-button custom-style="margin-right: 10px"
                  size="small"
                  @click="createDynamicFormItem">添加
      </nut-button>
      <nut-button custom-style="margin-right: 10px"
                  size="small"
                  @click="deleteDynamicFormItem">删除
      </nut-button>
      <nut-button custom-style="margin-right: 10px"
                  type="primary"
                  size="small"
                  @click="submitDynamicForm">提交
      </nut-button>
      <nut-button size="small"
                  @click="clearDynamicFormValidate">清除校验信息
      </nut-button>
    </nut-cell>
  </nut-form>
</template>
```

```typescript
import type { FormInst } from 'nutui-uniapp'

interface DynamicTelItem {
  key: number
  value: string
}

interface DynamicForm {
  name: string
  tels: DynamicTelItem[]
}

const dynamicFormInst = ref<FormInst<DynamicForm> | null>(null)

const dynamicForm = ref<DynamicForm>({
  name: '',
  tels: [{ key: 1, value: '' }]
})

function createDynamicFormItem() {
  dynamicForm.value.tels.push({ key: Date.now() + Math.round(Math.random() * 1000), value: '' })
}

function deleteDynamicFormItem() {
  dynamicForm.value.tels.splice(dynamicForm.value.tels.length - 1, 1)
}

async function submitDynamicForm() {
  const { valid, errors } = await dynamicFormInst.value!.validate()

  if (!valid) {
    console.log('校验不通过', errors)
    return
  }

  console.log('校验通过')
}

function clearDynamicFormValidate() {
  dynamicFormInst.value?.clearValidate()
}
```

### 自定义Label&Star位置

> 自 `1.5.7` 开始支持自定义 `label` 和 `star` 的位置

```html
<template>
  <nut-form label-position="right">
    <nut-form-item label="昵称" label-position="top">
      <nut-input placeholder="请输入昵称"></nut-input>
    </nut-form-item>

    <nut-form-item label="网龄" label-position="left" required star-position="right">
      <nut-input placeholder="请输入网龄"></nut-input>
    </nut-form-item>

    <nut-form-item label="其他">
      <nut-input placeholder="请输入其他信息"></nut-input>
    </nut-form-item>
  </nut-form>
</template>
```

### 自定义组件支持自动校验

> 自 `2.0.0` 开始，自定义组件可以通过 `formItemContext` 来支持自动触发校验，下面以 `change` 事件为例

```typescript
import { useFormItemContext } from 'nutui-uniapp/composables'

const formItemContext = useFormItemContext()

function onChange() {
  // ...

  if (formItemContext !== undefined && formItemContext.triggers.value.change) {
    formItemContext.validate('change')
  }
}
```

## API

### Form Props

| 参数                              | 说明                          | 类型                         | 默认值     |
|---------------------------------|-----------------------------|----------------------------|---------|
| model-value                     | 表单数据对象(使用表单校验时，_必填_)        | object                     | -       |
| rules                           | 统一配置每个 `FormItem` 的 `rules` | `FormRules`                | `{}`    |
| disabled `1.6.8`                | 禁用表单下的所有数据录入组件              | boolean                    | `false` |
| star-position `1.5.7`           | 必填表单项 label 的红色星标位置         | `left` \| `right`          | `left`  |
| label-position `1.5.7`          | 表单项 label 的位置               | `left` \| `right` \| `top` | `left`  |
| builtin-cell-group `2.0.0`      | 是否内置 `cell-group`           | boolean                    | `true`  |
| validate-on-rule-change `2.0.0` | 是否在 `rules` 属性改变后立即触发一次验证   | boolean                    | `true`  |

### Form Events

| 事件名      | 说明                              | 回调参数                               |
|----------|---------------------------------|------------------------------------|
| validate | 任一表单项被校验后触发（`2.0.0` 之前仅校验失败时触发） | `(result: FormItemValidateResult)` |

::: details 类型定义 `2.0.0`

```typescript
interface FormItemValidateResult {
  /**
   * 是否验证通过
   */
  valid: boolean
  /**
   * 触发校验的字段
   */
  prop?: string
  /**
   * 触发校验字段的值
   */
  value?: any
  /**
   * 错误信息
   */
  message?: string
}
```

:::

### FormItem Props

| 参数                     | 说明                                              | 类型                         | 默认值     |
|------------------------|-------------------------------------------------|----------------------------|---------|
| prop                   | 表单域 `v-model` 字段， 在使用表单校验功能的情况下，该属性是必填的         | string                     | `-`     |
| label                  | 标签文本                                            | string                     | -       |
| rules                  | 定义校验规则                                          | `FormItemRule[]`           | `[]`    |
| required               | 是否显示必填字段的标签旁边的红色星号                              | boolean                    | `false` |
| star-position `1.5.7`  | 必填表单项 label 的红色星标位置，优先级高于 form 中的 star-position | `left` \| `right`          | -       |
| label-position `1.5.7` | 表单项 label 的位置，优先级高于 form 中的 label-position      | `left` \| `right` \| `top` | -       |
| label-width            | 表单项 `label` 宽度，默认单位为`px`                        | number \| string           | `90`    |
| label-align            | 表单项 `label` 对齐方式，可选值为 `center` `right`          | string                     | `left`  |
| body-align             | 右侧插槽对齐方式，可选值为 `center` `right`                  | string                     | `left`  |
| show-error-message     | 是否在校验不通过时在输入框下方展示错误提示                           | boolean                    | `true`  |
| error-message-align    | 错误提示文案对齐方式，可选值为 `center` `right`                | string                     | `left`  |
| show-error-line        | 是否在校验不通过时标红输入框                                  | boolean                    | `true`  |
| is-link `1.8.4`        | 是否展示右侧箭头                                        | boolean                    | `false` |

::: details 类型定义 `2.0.0`

```typescript
type FormItemRuleTrigger = 'blur' | 'change'

interface FormItemRuleWithoutValidator {
  /**
   * 是否必须
   */
  required?: boolean
  /**
   * 正则
   */
  regex?: RegExp
  /**
   * 最小值
   */
  min?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 最小长度
   */
  minlen?: number
  /**
   * 最大长度
   */
  maxlen?: number
  /**
   * 提示信息
   */
  message?: string
  /**
   * 校验触发方式
   */
  trigger?: Arrayable<FormItemRuleTrigger>
}

interface FormItemRule extends FormItemRuleWithoutValidator {
  /**
   * 自定义校验
   *
   * @param value 当前值
   * @param rule 校验规则
   */
  validator?: (value: any, rule: FormItemRuleWithoutValidator) => Awaitable<OptionalValue<boolean | string>>
}
```

:::

### FormItem Slots

| 名称            | 说明             |
|---------------|----------------|
| default       | 自定义内容          |
| label         | 自定义 `label` 区域 |
| error `2.0.0` | 自定义 `error` 区域 |

### Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Form 实例并调用实例方法

| 方法名                   | 说明                             | 参数                                               | 返回值                       |
|-----------------------|--------------------------------|--------------------------------------------------|---------------------------|
| validate              | 对整个表单或者部分字段进行校验                | `fields` 需要校验的字段（可以是字符串或者数组，不传表示校验整个表单）          | `FormValidateResult` 校验结果 |
| clearValidate `2.0.0` | 移除表单校验结果                       | `fields` 需要移除校验结果的字段（可以是字符串或者数组，不传表示移除所有字段的校验结果） | -                         |
| submit `2.0.0 已移除`    | 提交表单进行校验的方法（请使用 `validate` 方法） | -                                                | -                         |
| reset `2.0.0 已移除`     | 清空校验结果（请使用 `clearValidate` 方法） | -                                                | -                         |

::: details 类型定义 `2.0.0`

```typescript
interface FormValidateResult {
  valid: boolean
  errors: FormItemValidateResult[]
}
```

:::

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
