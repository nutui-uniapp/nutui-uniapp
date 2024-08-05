<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, onBeforeUnmount, onMounted, provide, ref, toRef, useSlots } from 'vue'
import { useTranslate } from '../../locale'
import { castArray, get, isEmpty, omit } from '../_plugins/lodash'
import { getMainClass, getMainStyle, isPromise, pxCheck } from '../_utils'
import NutCell from '../cell/cell.vue'
import { useFormContext } from '../form'
import type { OptionalValue } from '../_types'
import { FORM_ITEM_CONTEXT_KEY, formitemProps } from './formitem'
import type {
  FormItemContext,
  FormItemRule,
  FormItemRuleTrigger,
  FormItemRuleTriggers,
  FormItemRuleWithoutValidator,
  FormItemValidateResult,
  FormItemValidateState,
} from './types'

const COMPONENT_NAME = 'nut-form-item'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: false,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(formitemProps)

const { translate } = useTranslate(COMPONENT_NAME)

const slots = useSlots()

const formContext = useFormContext()

const rules = computed<FormItemRule[]>(() => {
  if (props.prop == null)
    return []

  if (formContext === undefined)
    return castArray(props.rules)

  return [...castArray(props.rules), ...castArray(formContext.rules.value[props.prop] || [])]
})

const triggers = computed<FormItemRuleTriggers>(() => {
  const value: FormItemRuleTriggers = { blur: false, change: false }

  for (const { trigger } of rules.value) {
    if (trigger === undefined)
      continue

    const normalized: FormItemRuleTrigger[] = castArray(trigger)

    if (normalized.length <= 0)
      continue

    for (const it of normalized) {
      if (it === 'blur')
        value.blur = true
      else if (it === 'change')
        value.change = true

      if (value.blur && value.change)
        break
    }
  }

  return value
})

const isRequired = computed<boolean>(() => {
  if (props.required !== undefined)
    return props.required

  for (const item of rules.value) {
    if (item.required)
      return true
  }

  return false
})

const validateState = ref<FormItemValidateState>('default')
const validateMessage = ref<string>('')

const isErrorState = computed<boolean>(() => {
  return validateState.value === 'error'
})

const shouldShowError = computed<boolean>(() => {
  return props.showErrorMessage && isErrorState.value
})

const classes = computed(() => {
  const labelPosition = props.labelPosition || formContext?.labelPosition.value
  const starPosition = props.starPosition || formContext?.starPosition.value

  const value = {
    'is-required': isRequired.value,
    'show-error-line': props.showErrorLine && isErrorState.value,
    [`is-label-${labelPosition}`]: true,
    [`is-star-${starPosition}`]: isRequired.value,
  }

  if (validateState.value !== 'default')
    value[`is-${validateState.value}`] = true

  return getMainClass(props, COMPONENT_NAME, value)
})

const styles = computed(() => {
  return getMainStyle(props)
})

const labelStyles = computed<CSSProperties>(() => {
  return {
    width: pxCheck(props.labelWidth),
  }
})

const bodyStyles = computed<CSSProperties>(() => {
  return {
    textAlign: props.bodyAlign,
  }
})

const errorMessageStyles = computed<CSSProperties>(() => {
  return {
    textAlign: props.errorMessageAlign,
  }
})

function collectValidatorResult(
  validator: FormItemRule['validator'],
  value: any,
  rule: FormItemRuleWithoutValidator,
): Promise<OptionalValue<boolean | string | void>> {
  const normalize = (val: Awaited<ReturnType<NonNullable<FormItemRule['validator']>>>) => {
    return val instanceof Error ? val.message : val
  }

  return new Promise((resolve) => {
    if (validator == null) {
      resolve(true)
      return
    }

    const result = validator(value, rule)

    if (!isPromise(result)) {
      resolve(normalize(result))
      return
    }

    result.then((res) => {
      resolve(normalize(res))
    }).catch((res) => {
      resolve(normalize(res))
    })
  })
}

async function executeValidate(trigger?: FormItemRuleTrigger): Promise<FormItemValidateResult> {
  const { prop } = props

  if (prop === undefined || formContext === undefined || formContext.modelValue == null || formContext.modelValue.value == null)
    return { valid: true, prop }

  const value = get(formContext.modelValue.value, prop)

  if (rules.value.length <= 0)
    return { valid: true, prop, value }

  for (const rule of rules.value) {
    const { required = false, regex, min, max, minlen, maxlen, message, validator, trigger: ruleTrigger } = rule

    if (trigger != null && ruleTrigger != null && !castArray(ruleTrigger).includes(trigger))
      continue

    if (required) {
      if (['string', 'object', 'null', 'undefined'].includes(typeof value)) {
        if (isEmpty(value))
          return { valid: false, prop, value, message }
      }
    }

    if (regex !== undefined) {
      regex.lastIndex = 0

      if (!regex.test(String(value)))
        return { valid: false, prop, value, message }
    }

    if (min !== undefined) {
      if (Number(value) < min)
        return { valid: false, prop, value, message }
    }

    if (max !== undefined) {
      if (Number(value) > max)
        return { valid: false, prop, value, message }
    }

    if (minlen !== undefined) {
      if (value.length < minlen)
        return { valid: false, prop, value, message }
    }

    if (maxlen !== undefined) {
      if (value.length > maxlen)
        return { valid: false, prop, value, message }
    }

    if (validator !== undefined) {
      const result = await collectValidatorResult(validator, value, omit(rule, 'validator'))

      if (result === false || typeof result === 'string') {
        return {
          valid: false,
          prop,
          value,
          message: typeof result === 'string' ? result : message,
        }
      }
    }
  }

  return { valid: true, prop, value }
}

function clearValidate(): void {
  validateState.value = 'default'
  validateMessage.value = ''
}

async function validate(trigger?: FormItemRuleTrigger): Promise<FormItemValidateResult> {
  validateState.value = 'validating'

  const result = await executeValidate(trigger)

  if (result.valid) {
    validateState.value = 'success'
    validateMessage.value = ''
  }
  else {
    validateState.value = 'error'
    validateMessage.value = result.message || ''
  }

  formContext?.emitValidate(result)

  return result
}

const selfContext: FormItemContext = {
  prop: toRef(props, 'prop'),
  triggers,
  validate,
  clearValidate,
}

provide(FORM_ITEM_CONTEXT_KEY, selfContext)

onMounted(() => {
  if (props.prop !== undefined)
    formContext?.insertField(selfContext)
})

onBeforeUnmount(() => {
  if (props.prop !== undefined)
    formContext?.removeField(selfContext)
})

defineExpose({
  validate,
  clearValidate,
})
</script>

<template>
  <NutCell
    :custom-class="classes"
    :custom-style="styles"
  >
    <view
      v-if="props.label || slots.label"
      class="nut-form-item__label nut-cell__title"
      :style="labelStyles"
    >
      <slot v-if="slots.label" name="label" />

      <template v-else>
        {{ props.label }}
      </template>
    </view>

    <view class="nut-form-item__body nut-cell__value">
      <view class="nut-form-item__body__slots" :style="bodyStyles">
        <slot />
      </view>

      <view v-if="shouldShowError" class="nut-form-item__body__tips" :style="errorMessageStyles">
        <slot v-if="slots.error" name="error" :message="validateMessage || translate('defaultErrorMessage')" />

        <template v-else>
          {{ validateMessage || translate('defaultErrorMessage') }}
        </template>
      </view>
    </view>
  </NutCell>
</template>

<style lang="scss">
@import "./index";
</style>
