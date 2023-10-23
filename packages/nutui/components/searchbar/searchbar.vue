<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue'
import { computed, defineComponent, reactive, ref } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useTranslate } from '../../locale'
import { type InputTextAlign, searchbarEmits, searchbarProps } from './searchbar'

const props = defineProps(searchbarProps)
const emit = defineEmits(searchbarEmits)
const state = reactive({
  active: false,
})

const searchbarStyle = computed(() => {
  return {
    background: props.background,
  }
})
const inputSearchbarStyle = computed(() => {
  return {
    background: props.inputBackground,
  }
})

function valueChange(event: any) {
  const input = event.detail as HTMLInputElement
  let val = input.value

  if (props.maxLength && val?.length > Number(props.maxLength))
    val = val.slice(0, Number(props.maxLength))

  emit('update:modelValue', val, event)
  emit('change', val, event)
}

const focusCss = ref({})
function valueFocus(event: any) {
  const input = event.detail as HTMLInputElement
  const value = input.value
  state.active = true
  focusCss.value = props.focusStyle
  emit('focus', value, event)
}

function valueBlur(event: any) {
  setTimeout(() => {
    state.active = false
  }, 0)

  const input = event.detail as HTMLInputElement
  let value = input.value
  if (props.maxLength && value?.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  focusCss.value = {}
  emit('blur', value, event)
}

function handleClear(event: Event) {
  emit('update:modelValue', '', event)
  emit('change', '', event)
  emit('clear', '')
}

function handleSubmit() {
  emit('search', props.modelValue)
}

function clickInput(event: Event) {
  emit('clickInput', event)
}

function leftIconClick(event: Event) {
  emit('clickLeftIcon', props.modelValue, event)
}

function rightIconClick(event: Event) {
  emit('clickRightIcon', props.modelValue, event)
}

const styleSearchbar = computed(() => {
  const style: CSSProperties = {
    textAlign: props.inputAlign as InputTextAlign,
  }
  return style
})
const inputsearch: Ref<HTMLElement | null> = ref(null)
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
  <view :class="[customClass, { 'safe-area-inset-bottom': safeAreaInsetBottom }]" class="nut-searchbar" :style="[searchbarStyle, customStyle]">
    <view v-if="$slots.leftout" class="nut-searchbar__search-icon nut-searchbar__left-search-icon" @click="(leftIconClick as any)">
      <slot name="leftout" />
    </view>
    <view class="nut-searchbar__search-input" :class="[shape]" :style="{ ...inputSearchbarStyle, ...focusCss }">
      <view v-if="$slots.leftin" class="nut-searchbar__search-icon nut-searchbar__iptleft-search-icon">
        <slot name="leftin" />
      </view>
      <view class="nut-searchbar__input-inner" :class="[$slots.rightin && 'nut-searchbar__input-inner-absolute']">
        <form class="nut-searchbar__input-form" action="#" onsubmit="return false" @submit.prevent="handleSubmit">
          <input
            ref="inputsearch"
            class="nut-searchbar__input-bar" :class="[clearable && 'nut-searchbar__input-bar_clear']"
            :type="inputType"
            :maxlength="maxLength ? +maxLength : -1"
            :placeholder="placeholder || translate('placeholder')"
            :value="String(modelValue)"
            :auto-focus="autofocus"
            :confirm-type="confirmType"
            :disabled="disabled"
            :readonly="readonly"
            :style="styleSearchbar"
            :cursor-spacing="cursorSpacing"
            @click="(clickInput as any)"
            @input="valueChange"
            @focus="valueFocus"
            @blur="valueBlur"
            @confirm="handleSubmit"
          >
        </form>
      </view>
      <view class="nut-searchbar__input-inner-icon" :class="[$slots.rightin && 'nut-searchbar__input-inner-icon-absolute']">
        <view
          v-if="clearable"
          v-show="String(modelValue).length > 0"
          class="nut-searchbar__search-icon nut-searchbar__input-clear"
          @click="(handleClear as any)"
        >
          <template v-if="$slots['clear-icon']">
            <slot name="clear-icon" />
          </template>
          <NutIcon v-else :name="clearIcon" />
        </view>
        <view v-if="$slots.rightin" class="nut-searchbar__search-icon nut-searchbar__iptright-search-icon" @click="(rightIconClick as any)">
          <slot name="rightin" />
        </view>
      </view>
    </view>
    <view v-if="$slots.rightout" class="nut-searchbar__search-icon nut-searchbar__right-search-icon">
      <slot name="rightout" />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
