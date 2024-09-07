<script setup lang="ts">
import type { InputOnBlurEvent, InputOnFocusEvent, InputOnInputEvent } from '@uni-helper/uni-app-types'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, reactive, toRef, useSlots } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, CLEAR_EVENT, FOCUS_EVENT, PREFIX, SEARCH_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import { useTranslate } from '../../locale'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import { searchbarEmits, searchbarProps } from './searchbar'

const props = defineProps(searchbarProps)

const emit = defineEmits(searchbarEmits)

const slots = useSlots()

function hasSlot(name: string) {
  return Boolean(slots[name])
}

const formDisabled = useFormDisabled(toRef(props, 'disabled'))

const state = reactive({
  active: false,
})

function stringModelValue() {
  if (props.modelValue == null)
    return ''

  return String(props.modelValue)
}

const innerValue = computed<string>(() => {
  return stringModelValue()
})

const innerMaxLength = computed(() => {
  if (props.maxLength == null)
    return -1

  return Number(props.maxLength)
})

const classes = computed(() => {
  return getMainClass(props, componentName, {
    'safe-area-inset-bottom': props.safeAreaInsetBottom,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    background: props.background,
  })
})

const inputWrapperStyles = computed(() => {
  const style: CSSProperties = {
    background: props.inputBackground,
  }

  if (state.active)
    Object.assign(style, props.focusStyle)

  return style
})

const inputStyles = computed(() => {
  return {
    textAlign: props.inputAlign,
  }
})

function handleValue(value: string) {
  if (innerMaxLength.value > 0 && value.length > innerMaxLength.value)
    value = value.slice(0, innerMaxLength.value)

  return value
}

function handleInput(event: InputOnInputEvent) {
  const value = handleValue(event.detail.value)

  emit(UPDATE_MODEL_EVENT, value, event)
  emit(CHANGE_EVENT, value, event)
}

function handleFocus(event: InputOnFocusEvent) {
  const value = handleValue(event.detail.value)

  state.active = true

  emit(FOCUS_EVENT, value, event)
}

function handleBlur(event: InputOnBlurEvent) {
  const value = handleValue(event.detail.value)

  setTimeout(() => {
    state.active = false
  }, 200)

  emit(BLUR_EVENT, value, event)
}

function handleClear(event: any) {
  emit(UPDATE_MODEL_EVENT, '', event)
  emit(CHANGE_EVENT, '', event)
  emit(CLEAR_EVENT, '')
}

function handleSubmit() {
  emit(SEARCH_EVENT, innerValue.value)
}

function handleInputClick(event: any) {
  emit('clickInput', innerValue.value, event)
}

function handleLeftIconClick(event: any) {
  emit('clickLeftIcon', innerValue.value, event)
}

function handleRightIconClick(event: any) {
  emit('clickRightIcon', innerValue.value, event)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-searchbar`
const { translate } = useTranslate(componentName)

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
  <view :class="classes" :style="styles">
    <view
      v-if="hasSlot('leftout')"
      class="nut-searchbar__search-icon nut-searchbar__left-search-icon"
      @click="handleLeftIconClick"
    >
      <slot name="leftout" />
    </view>
    <view class="nut-searchbar__search-input" :class="[props.shape]" :style="inputWrapperStyles">
      <view v-if="hasSlot('leftin')" class="nut-searchbar__search-icon nut-searchbar__iptleft-search-icon">
        <slot name="leftin" />
      </view>
      <view class="nut-searchbar__input-inner" :class="{ 'nut-searchbar__input-inner-absolute': hasSlot('rightin') }">
        <form
          class="nut-searchbar__input-form"
          action="#"
          onsubmit="return false"
          @submit.prevent="handleSubmit"
        >
          <input
            class="nut-searchbar__input-bar"
            :class="{ 'nut-searchbar__input-bar_clear': props.clearable }"
            :style="inputStyles"
            :type="props.inputType as any"
            :maxlength="innerMaxLength"
            :placeholder="props.placeholder || translate('placeholder')"
            :value="innerValue"
            :focus="props.autofocus"
            :confirm-type="props.confirmType"
            :disabled="formDisabled"
            :readonly="props.readonly"
            :cursor-spacing="props.cursorSpacing"
            @click="handleInputClick"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @confirm="handleSubmit"
          >
        </form>
      </view>
      <view
        class="nut-searchbar__input-inner-icon"
        :class="{ 'nut-searchbar__input-inner-icon-absolute': hasSlot('rightin') }"
      >
        <view
          v-if="props.clearable"
          class="nut-searchbar__search-icon nut-searchbar__input-clear"
          :class="{ 'nut-hidden': innerValue.length <= 0 }"
          @click="handleClear"
        >
          <template v-if="hasSlot('clear-icon')">
            <slot name="clear-icon" />
          </template>
          <NutIcon v-else :name="props.clearIcon" />
        </view>
        <view
          v-if="hasSlot('rightin')"
          class="nut-searchbar__search-icon nut-searchbar__iptright-search-icon"
          @click="handleRightIconClick"
        >
          <slot name="rightin" />
        </view>
      </view>
    </view>
    <view v-if="hasSlot('rightout')" class="nut-searchbar__search-icon nut-searchbar__right-search-icon">
      <slot name="rightout" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
