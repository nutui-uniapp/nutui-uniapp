<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import NutForm from '../form/form.vue'
import NutFormItem from '../formitem/formitem.vue'
import NutRadio from '../radio/radio.vue'
import NutRadioGroup from '../radiogroup/radiogroup.vue'
import NutButton from '../button/button.vue'
import type { FormInst } from '../form'
import { getMainClass } from '../_utils'
import { invoiceEmits, invoiceProps } from './invoice'

const props = defineProps(invoiceProps)

const emit = defineEmits(invoiceEmits)
const formRef = ref<FormInst>()

const list: any = ref([])

const classes = computed(() => {
  return getMainClass(props, componentName)
})

onMounted(() => {
  init()
})

function init() {
  list.value = props.data
}

function submitFun() {
  formRef.value?.validate().then(({ valid, errors }: any) => {
    emit('onSubmit', valid, errors)
  })
}

watch(
  () => props.data,
  () => init(),
  { deep: true },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-invoice`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" :style="customStyle">
    <NutForm ref="formRef" :model-value="formValue">
      <NutFormItem
        v-for="(item, index) of list"
        :key="index"
        :label="item.label"
        :required="item.required"
        :rules="item.rules"
        :prop="item.formItemProp"
      >
        <template v-if="item.type === 'radio'">
          <NutRadioGroup v-model="formValue[item.formItemProp]">
            <NutRadio
              v-for="(radioItem, radioIndex) of item.radioLabel"
              :key="radioIndex"
              shape="button"
              :label="radioItem.label"
            >
              {{ radioItem.label }}
            </NutRadio>
          </NutRadioGroup>
        </template>
        <template v-else>
          <input
            v-model="formValue[item.formItemProp]"
            class="nut-input-text"
            :placeholder="item.placeholder"
            type="text"
          >
        </template>
      </NutFormItem>
    </NutForm>
    <div v-if="submit" class="nut-invoice__submit">
      <NutButton type="primary" block @click="submitFun">
        提交审批
      </NutButton>
    </div>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
