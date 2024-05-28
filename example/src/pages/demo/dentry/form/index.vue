<script lang="ts" setup>
import type { FormInst, FormRules } from 'nutui-uniapp'

interface BaseForm {
  text1: string
  text2: string
  text3: string
  text4: string
  text5: string
  text6: string
  text7: string
  text8: string
}

interface DemoForm {
  // input
  nickname: string
  // checkbox
  isVip: boolean
  // checkbox-group
  gifts: string[]
  // input-number
  count: number
  // radio-group
  hobby: string
  // range
  progress: number
  // rate
  rate: number
  // switch
  enabled: boolean
  // textarea
  remarks: string
  // nested test
  object: {
    test1: string
  }
}

interface DynamicTelItem {
  key: number
  value: string
}

interface DynamicForm {
  name: string
  tels: DynamicTelItem[]
}

const baseForm = ref<BaseForm>({
  text1: '',
  text2: '',
  text3: '',
  text4: '',
  text5: '',
  text6: '',
  text7: '',
  text8: '',
})

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
    test1: '',
  },
})

/* eslint-disable style/quote-props */
const demoRules: FormRules<DemoForm> = {
  nickname: { required: true, message: '请输入用户昵称', trigger: ['blur', 'change'] },
  isVip: [{ required: true, message: '请选择是否为vip用户', trigger: 'change' }],
  gifts: [
    { required: true, message: '请选择赠送的礼物', trigger: 'change' },
    { minlen: 3, message: '至少赠送3个礼物', trigger: ['change'] },
  ],
  count: { max: 5, message: '商品数量不能超过5个', trigger: 'change' },
  hobby: { required: true, message: '请选择用户喜好', trigger: 'change' },
  progress: { min: 30, message: '进度不能小于30%', trigger: 'change' },
  rate: { min: 2, message: '评价不能低于2星' },
  remarks: {
    validator(value) {
      if (!value.includes('nutui'))
        return '输入的备注中没有包含 "nutui" 字样'
    },
    trigger: 'blur',
  },
  'object.test1': [
    { required: true, message: '请输入其他信息', trigger: ['blur', 'change'] },
    { regex: /^[\u4E00-\u9FA5]+$/g, message: '其他信息只能输入中文', trigger: 'blur' },
  ],
}
/* eslint-enable style/quote-props */

function onDemoFormRateChange() {
  demoFormInst.value?.validate('rate')
}

async function submitDemoForm() {
  const { valid, errors } = await demoFormInst.value!.validate()

  if (!valid) {
    // eslint-disable-next-line no-console
    console.log('校验不通过', errors)
    return
  }

  // eslint-disable-next-line no-console
  console.log('校验通过')
}

function clearDemoFormValidate() {
  demoFormInst.value?.clearValidate()
}

const dynamicFormInst = ref<FormInst<DynamicForm> | null>(null)

const dynamicForm = ref<DynamicForm>({
  name: '',
  tels: [{ key: 1, value: '' }],
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
    // eslint-disable-next-line no-console
    console.log('校验不通过', errors)
    return
  }

  // eslint-disable-next-line no-console
  console.log('校验通过')
}

function clearDynamicFormValidate() {
  dynamicFormInst.value?.clearValidate()
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>

    <nut-form>
      <nut-form-item label="昵称">
        <nut-input v-model="baseForm.text1" placeholder="请输入昵称" />
      </nut-form-item>

      <nut-form-item label="网龄">
        <nut-input v-model="baseForm.text2" placeholder="请输入网龄" />
      </nut-form-item>

      <nut-form-item label="时间">
        <nut-input v-model="baseForm.text3" placeholder="请输入时间" />
      </nut-form-item>

      <nut-form-item label="地址">
        <nut-input v-model="baseForm.text4" placeholder="请输入地址" />
      </nut-form-item>

      <nut-form-item label="备注">
        <nut-textarea v-model="baseForm.text5" placeholder="请输入备注" />
      </nut-form-item>
    </nut-form>

    <h2 class="title">
      表单校验
    </h2>

    <nut-form ref="demoFormInst" :model-value="demoForm" :rules="demoRules">
      <nut-form-item label="昵称" prop="nickname">
        <nut-input v-model="demoForm.nickname" placeholder="请输入用户昵称" />
      </nut-form-item>

      <nut-form-item label="是否会员" prop="isVip">
        <nut-checkbox v-model="demoForm.isVip">
          会员
        </nut-checkbox>
      </nut-form-item>

      <nut-form-item label="赠送礼物" prop="gifts">
        <nut-checkbox-group v-model="demoForm.gifts">
          <nut-checkbox label="1">
            礼物1
          </nut-checkbox>
          <nut-checkbox label="2">
            礼物2
          </nut-checkbox>
          <nut-checkbox label="3">
            礼物3
          </nut-checkbox>
          <nut-checkbox label="4">
            礼物4
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-form-item>

      <nut-form-item label="商品数量" prop="count">
        <nut-input-number v-model="demoForm.count" />
      </nut-form-item>

      <nut-form-item label="用户喜好" prop="hobby">
        <nut-radio-group v-model="demoForm.hobby">
          <nut-radio label="1">
            喜好1
          </nut-radio>
          <nut-radio label="2">
            喜好2
          </nut-radio>
          <nut-radio label="3">
            喜好3
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>

      <nut-form-item label="解锁进度" prop="progress" required>
        <nut-range v-model="demoForm.progress" hidden-tag />
      </nut-form-item>

      <nut-form-item label="星级评价" prop="rate">
        <nut-rate v-model="demoForm.rate" @change="onDemoFormRateChange" />
      </nut-form-item>

      <nut-form-item label="是否启用" prop="enabled">
        <nut-switch v-model="demoForm.enabled" />
      </nut-form-item>

      <view>
        <view>
          <text class="mx-15px text-12px text-#999">
            支持任意嵌套布局
          </text>
          <nut-form-item label="其他信息" prop="object.test1">
            <nut-input v-model="demoForm.object.test1" placeholder="请输入其他信息" />
          </nut-form-item>
        </view>
      </view>

      <nut-form-item label="备注信息" prop="remarks">
        <nut-textarea v-model="demoForm.remarks" placeholder="请输入备注信息" />
      </nut-form-item>

      <nut-cell>
        <nut-button class="!mr-10px" type="primary" size="small" @click="submitDemoForm">
          提交
        </nut-button>
        <nut-button size="small" @click="clearDemoFormValidate">
          清除校验信息
        </nut-button>
      </nut-cell>
    </nut-form>

    <h2 class="title">
      动态表单
    </h2>

    <nut-form ref="dynamicFormInst" :model-value="dynamicForm">
      <nut-form-item
        label="姓名"
        prop="name"
        :rules="{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }"
      >
        <nut-input v-model="dynamicForm.name" placeholder="请输入姓名" />
      </nut-form-item>

      <nut-form-item
        v-for="(item, index) in dynamicForm.tels"
        :key="item.key"
        :label="`联系方式${index + 1}`"
        :prop="`tels[${index}].value`"
        :rules="{ required: true, message: `请输入联系方式${index + 1}`, trigger: ['blur', 'change'] }"
      >
        <nut-input v-model="item.value" :placeholder="`请输入联系方式${index + 1}`" />
      </nut-form-item>

      <nut-cell>
        <nut-button class="!mr-10px" size="small" @click="createDynamicFormItem">
          添加
        </nut-button>
        <nut-button class="!mr-10px" size="small" @click="deleteDynamicFormItem">
          删除
        </nut-button>
        <nut-button class="!mr-10px" type="primary" size="small" @click="submitDynamicForm">
          提交
        </nut-button>
        <nut-button size="small" @click="clearDynamicFormValidate">
          清除校验信息
        </nut-button>
      </nut-cell>
    </nut-form>

    <h2 class="title">
      自定义Label&Star位置
    </h2>

    <nut-form label-position="right">
      <nut-form-item label="昵称" label-position="top">
        <nut-input v-model="baseForm.text6" placeholder="请输入昵称" />
      </nut-form-item>

      <nut-form-item label="网龄" label-position="left" required star-position="right">
        <nut-input v-model="baseForm.text7" placeholder="请输入网龄" />
      </nut-form-item>

      <nut-form-item label="其他">
        <nut-input v-model="baseForm.text8" placeholder="请输入其他信息" />
      </nut-form-item>
    </nut-form>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Form"
  }
}
</route>
