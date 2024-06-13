<script lang="ts" setup>
import { computed, defineComponent, provide, toRef, watch } from 'vue'
import { castArray } from '../_plugins/lodash'
import { getMainClass, getMainStyle } from '../_utils'
import { PREFIX } from '../_constants'
import NutCellGroup from '../cellgroup/cellgroup.vue'
import type { FormItemContext, FormItemValidateResult } from '../formitem'
import type { Arrayable } from '../_types'
import { FORM_CONTEXT_KEY, formEmits, formProps } from './form'
import type { FormValidateResult } from './type'

const props = defineProps(formProps)

const emit = defineEmits(formEmits)

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const styles = computed(() => {
  return getMainStyle(props)
})

const items: Map<string, FormItemContext> = new Map()

function insertField(field: FormItemContext) {
  if (field.prop.value === undefined)
    return

  items.set(field.prop.value, field)
}

function removeField(field: FormItemContext) {
  if (field.prop.value === undefined)
    return

  items.delete(field.prop.value)
}

function filterFields(fields?: Arrayable<string>): FormItemContext[] {
  if (fields === undefined)
    return Array.from(items.values())

  const normalized: string[] = castArray(fields)

  return Array.from(items.entries())
    .filter(([prop]) => normalized.includes(prop))
    .map(([_, value]) => value)
}

async function validate(fields?: Arrayable<string>): Promise<FormValidateResult> {
  const result = await Promise.all(filterFields(fields).map(item => item.validate()))

  const errors = result.filter(item => !item.valid)

  return {
    valid: errors.length <= 0,
    errors,
  }
}

function clearValidate(fields?: Arrayable<string>) {
  for (const item of filterFields(fields))
    item.clearValidate()
}

function emitValidate(result: FormItemValidateResult) {
  emit('validate', result)
}

watch(() => props.rules, () => {
  if (props.validateOnRuleChange)
    validate()
}, { deep: true })

function preventDefault() {}

provide(FORM_CONTEXT_KEY, {
  modelValue: toRef(props, 'modelValue'),
  rules: toRef(props, 'rules'),
  disabled: toRef(props, 'disabled'),
  starPosition: toRef(props, 'starPosition'),
  labelPosition: toRef(props, 'labelPosition'),
  insertField,
  removeField,
  emitValidate,
})

defineExpose({
  validate,
  clearValidate,
})
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
  <form
    :class="classes"
    :style="styles"
    action="#"
    @submit.prevent="preventDefault"
  >
    <NutCellGroup v-if="props.builtinCellGroup">
      <slot />
    </NutCellGroup>

    <slot v-else />
  </form>
</template>

<style lang="scss">
@import "./index";
</style>
