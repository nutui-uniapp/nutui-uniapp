<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import NutForm from '../form/form.vue'
import NutFormItem from '../formitem/formitem.vue'
import NutRadio from '../radio/radio.vue'
import NutRadioGroup from '../radiogroup/radiogroup.vue'
import NutButton from '../button/button.vue'
import type { FormInst } from '../form'
import { getMainClass } from '../_utils'
import type { NullableValue } from '../_types'
import { invoiceEmits, invoiceProps } from './invoice'

const COMPONENT_NAME = 'nut-invoice'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(invoiceProps)

const emit = defineEmits(invoiceEmits)

const formRef = ref<NullableValue<FormInst>>(null)

const list = ref<any[]>([])

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

onMounted(() => {
  init()
})

function init() {
  list.value = props.data
}

function submitFun() {
  formRef.value?.validate().then(({ valid, errors }) => {
    emit('onSubmit', valid, errors)
  })
}

watch(
  () => props.data,
  () => init(),
  { deep: true },
)
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <NutForm ref="formRef" :model-value="props.formValue">
      <NutFormItem
        v-for="(item, index) of list"
        :key="index"
        :label="item.label"
        :required="item.required"
        :rules="item.rules"
        :prop="item.formItemProp"
      >
        <!-- eslint-disable vue/no-mutating-props -->
        <template v-if="item.type === 'radio'">
          <NutRadioGroup v-model="props.formValue[item.formItemProp]">
            <NutRadio
              v-for="(radioItem, radioIndex) of item.radioLabel"
              :key="radioIndex"
              :label="radioItem.label"
              shape="button"
            >
              {{ radioItem.label }}
            </NutRadio>
          </NutRadioGroup>
        </template>

        <template v-else>
          <input
            v-model="props.formValue[item.formItemProp]"
            class="nut-input-text"
            type="text"
            :placeholder="item.placeholder"
          >
        </template>
        <!-- eslint-enable vue/no-mutating-props -->
      </NutFormItem>
    </NutForm>

    <view v-if="props.submit" class="nut-invoice__submit">
      <NutButton type="primary" block @click="submitFun">
        提交审批
      </NutButton>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
