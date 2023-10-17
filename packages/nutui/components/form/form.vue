<script setup lang="ts">
import type { VNode } from 'vue'
import { computed, defineComponent, provide, reactive, watch } from 'vue'
import { getPropByPath, isObject, isPromise } from '../_utils'
import { PREFIX } from '../_constants'
import NutCellGroup from '../cellgroup/cellgroup.vue'
import type { FormItemRule } from '../formitem/types'
import { useProvide } from '../_hooks'
import { FORM_KEY, formEmits, formProps } from './form'
import type { ErrorMessage, FormRule, FormRules } from './types'

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
defineExpose({ reset, submit, validate })
const formErrorTip = computed(() => reactive<any>({}))

const { internalChildren } = useProvide(
  FORM_KEY,
  'nut-form-item',
)({ props, formErrorTip })
provide('formErrorTip', formErrorTip)
function clearErrorTips() {
  Object.keys(formErrorTip.value).forEach((item) => {
    formErrorTip.value[item] = ''
  })
}

function reset() {
  clearErrorTips()
}

watch(
  () => props.modelValue,
  () => {
    clearErrorTips()
  },
  { immediate: true },
)

function findFormItem(vnodes: VNode[]) {
  let task: FormRule[] = []
  vnodes.forEach((vnode: VNode) => {
    let type = vnode.type
    type = (type as any).name || type
    if (type === 'nut-form-item' || type?.toString().endsWith('form-item')) {
      task.push({
        prop: vnode.props?.prop,
        rules: vnode.props?.rules || [],
      })
    }
    else if (Array.isArray(vnode.children) && vnode.children?.length) {
      task = task.concat(findFormItem(vnode.children as VNode[]))
    }
    else if (isObject(vnode.children) && Object.keys(vnode.children)) {
      // 异步节点获取
      if ((vnode.children as any)?.default) {
        vnode.children = (vnode.children as any).default()
        task = task.concat(findFormItem(vnode.children as VNode[]))
      }
    }
    else if (Array.isArray(vnode)) {
      task = task.concat(findFormItem(vnode as VNode[]))
    }
  })

  return task
}

function tipMessage(errorMsg: ErrorMessage) {
  if (errorMsg.message)
    emit('validate', errorMsg)

  formErrorTip.value[errorMsg.prop] = errorMsg.message
}

async function checkRule(item: FormRule): Promise<ErrorMessage | boolean> {
  const { rules, prop } = item

  const _Promise = (errorMsg: ErrorMessage): Promise<ErrorMessage> => {
    return new Promise((resolve, reject) => {
      try {
        tipMessage(errorMsg)
        resolve(errorMsg)
      }
      catch (error) {
        reject(error)
      }
    })
  }

  if (!prop)
    console.warn('[NutUI] <FormItem> 使用 rules 校验规则时 , 必须设置 prop 参数')

  const value = getPropByPath(props.modelValue, prop || '')

  // clear tips
  tipMessage({ prop, message: '' })
  const formRules: FormRules = props.rules || {}
  const _rules = [...(formRules?.[prop] || []), ...rules]
  while (_rules.length) {
    const rule = _rules.shift() as FormItemRule
    const { validator, ...ruleWithoutValidator } = rule
    const { required, regex, message } = ruleWithoutValidator
    const errorMsg = { prop, message }
    if (required) {
      if (!value && value !== 0)
        return _Promise(errorMsg)
    }
    if (regex && !regex.test(String(value)))
      return _Promise(errorMsg)

    if (validator) {
      const result = validator(value, ruleWithoutValidator)
      if (isPromise(result)) {
        try {
          const value = await result
          if (value === false)
            return _Promise(errorMsg)
        }
        catch (error) {
          const validateErrorMsg = { prop, message: error as string }
          return _Promise(validateErrorMsg)
        }
      }
      else {
        if (!result)
          return _Promise(errorMsg)
      }
    }
  }
  return Promise.resolve(true)
}

/**
 * 校验
 * @param customProp 指定校验，用于用户自定义场景时触发，例如 blur、change 事件
 * @returns
 */
function validate(customProp = '') {
  return new Promise((resolve, reject) => {
    try {
      const task = findFormItem(internalChildren?.map(child => child.vnode))

      const errors = task.map((item) => {
        if (customProp && customProp !== item.prop)
          return Promise.resolve(true)

        return checkRule(item)
      })

      Promise.all(errors).then((errorRes) => {
        errorRes = errorRes.filter(item => item !== true)
        const res = { valid: true, errors: [] }
        if (errorRes.length) {
          res.valid = false
          res.errors = errorRes as any
        }
        resolve(res)
      })
    }
    catch (error) {
      reject(error)
    }
  })
}
function submit() {
  validate()
  return false
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-form`

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
  <form class="nut-form" action="#" @submit.prevent="() => false">
    <NutCellGroup>
      <slot />
    </NutCellGroup>
  </form>
</template>

<style lang="scss">
@import './index';
</style>
