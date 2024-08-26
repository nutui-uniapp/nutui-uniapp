<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent, getCurrentInstance, onMounted, provide, reactive, ref, watch } from 'vue'
import { PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useSelectorQuery } from '../_hooks'
import { getMainClass } from '../_utils'
import { TABBAR_CONTEXT_KEY, tabbarEmits, tabbarProps } from './tabbar'
import type { TabbarContext } from './types'

const props = defineProps(tabbarProps)

const emit = defineEmits(tabbarEmits)

const instance = getCurrentInstance()!

const { getSelectorNodeInfo } = useSelectorQuery(instance)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    'nut-tabbar-bottom': props.bottom,
    'nut-tabbar-safebottom': props.safeAreaInsetBottom,
  })
})

const wrapperClasses = computed(() => {
  return {
    'nut-tabbar__placeholder': props.bottom && props.placeholder,
  }
})

const trulyHeight = ref<number>()

const wrapperStyles = computed(() => {
  const value: CSSProperties = {}

  if (trulyHeight.value != null) {
    value.height = `${trulyHeight.value}px`
  }

  return value
})

const parentData: TabbarContext = reactive({
  modelValue: props.modelValue,
  activeColor: props.activeColor,
  unactiveColor: props.unactiveColor,
  children: [],
  changeIndex,
})

provide(TABBAR_CONTEXT_KEY, parentData)

watch(() => props.modelValue, (value) => {
  parentData.modelValue = value
})

watch(() => [props.activeColor, props.unactiveColor], ([activeColor, unactiveColor]) => {
  parentData.activeColor = activeColor
  parentData.unactiveColor = unactiveColor
})

function changeIndex(index: number, active: number | string) {
  parentData.modelValue = active

  emit(UPDATE_MODEL_EVENT, active)
  emit('tabSwitch', parentData.children[index], active)
}

async function fetchTrulyHeight() {
  const node = await getSelectorNodeInfo('.nut-tabbar')

  trulyHeight.value = node.height
}

onMounted(() => {
  if (props.bottom && props.placeholder) {
    setTimeout(() => {
      fetchTrulyHeight()
    }, 500)
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-tabbar`

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
  <view :class="wrapperClasses" :style="wrapperStyles">
    <view :class="classes" :style="props.customStyle">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
