<script lang="ts" setup>
import type { CSSProperties, Ref } from 'vue'
import { computed, defineComponent, inject, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import { CLICK_EVENT, CLOSE_EVENT, CLOSED_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { cloneDeep, getMainClass, getMainStyle, pxCheck } from '../_utils'
import NutPopup from '../popup/popup.vue'
import { notifyDefaultOptions, notifyDefaultOptionsKey, notifyEmits, notifyProps } from './notify'
import type { NotifyOptions, NotifyType } from './types'

const props = defineProps(notifyProps)

const emit = defineEmits(notifyEmits)

const slots = useSlots()

const notifyOptionsKey = `${notifyDefaultOptionsKey}${props.selector || ''}`
const injectNotifyOptions: Ref<NotifyOptions> = inject(notifyOptionsKey, ref(cloneDeep(notifyDefaultOptions)))

const innerVisible = ref(false)

const notifyOptions = ref<NotifyOptions>(cloneDeep(props))

const classes = computed(() => {
  const { type, className } = notifyOptions.value

  const value = {
    [`nut-notify--${type}`]: true,
  }

  if (className) {
    value[className] = true
  }

  return getMainClass(props, componentName, value)
})

const styles = computed(() => {
  const value: CSSProperties = {}

  const { customColor, background } = notifyOptions.value

  if (customColor) {
    value.color = customColor
  }

  if (background) {
    value.background = background
  }

  return getMainStyle(props, value)
})

const wrapperStyles = computed(() => {
  const value: CSSProperties = {}

  const { position, safeAreaInsetTop, safeAreaInsetBottom, safeHeight } = notifyOptions.value

  if (position === 'top') {
    if (safeAreaInsetTop) {
      if (safeHeight) {
        value.top = pxCheck(safeHeight)
      }
      else {
        value.top = `${uni.getSystemInfoSync().statusBarHeight}px`
      }
    }
  }
  else if (position === 'bottom') {
    if (safeAreaInsetBottom) {
      if (safeHeight) {
        value.bottom = pxCheck(safeHeight)
      }
    }
  }

  return value
})

let timer: NodeJS.Timeout | null = null

function startTimer() {
  timer = setTimeout(() => {
    hide()
  }, notifyOptions.value.duration)
}

function destroyTimer() {
  if (timer == null)
    return

  clearTimeout(timer)
  timer = null
}

function show(type: NotifyType, msg: string, options?: NotifyOptions) {
  destroyTimer()

  notifyOptions.value = Object.assign(cloneDeep(notifyDefaultOptions), {
    visible: true,
    type,
    msg,
  }, options)

  innerVisible.value = true

  if (notifyOptions.value.duration! > 0)
    startTimer()
}

function legacyShow(options: NotifyOptions) {
  show(notifyDefaultOptions.type, options.msg || notifyDefaultOptions.msg, options)
}

function showPrimary(msg: string, options?: NotifyOptions) {
  show('primary', msg, options)
}

function showSuccess(msg: string, options?: NotifyOptions) {
  show('success', msg, options)
}

function showDanger(msg: string, options?: NotifyOptions) {
  show('danger', msg, options)
}

function showWarning(msg: string, options?: NotifyOptions) {
  show('warning', msg, options)
}

function showCustom(msg: string, options?: NotifyOptions) {
  show('custom', msg, options)
}

function hide() {
  destroyTimer()

  innerVisible.value = false
  notifyOptions.value.visible = false

  emit(UPDATE_VISIBLE_EVENT, false)
  emit(CLOSE_EVENT)

  if (notifyOptions.value.onClose) {
    notifyOptions.value.onClose()
  }
}

function handleClosed() {
  emit(CLOSED_EVENT)

  if (notifyOptions.value.onClosed) {
    notifyOptions.value.onClosed()
  }
}

function handleClick() {
  emit(CLICK_EVENT)

  if (notifyOptions.value.onClick) {
    notifyOptions.value.onClick()
  }
}

watch(() => props, (value) => {
  notifyOptions.value = Object.assign(cloneDeep(notifyDefaultOptions), value)

  if (value.visible)
    show(notifyOptions.value.type!, notifyOptions.value.msg!, notifyOptions.value)
  else
    hide()
}, { deep: true })

watch(injectNotifyOptions, (value) => {
  notifyOptions.value = Object.assign(cloneDeep(notifyDefaultOptions), value)

  if (value.visible)
    show(notifyOptions.value.type!, notifyOptions.value.msg!, notifyOptions.value)
  else
    hide()
})

onBeforeUnmount(() => {
  destroyTimer()
})

defineExpose({
  showNotify: legacyShow,
  hideNotify: hide,

  show,
  primary: showPrimary,
  success: showSuccess,
  danger: showDanger,
  warning: showWarning,
  custom: showCustom,
  hide,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-notify`

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
  <NutPopup
    v-model:visible="innerVisible"
    :custom-style="wrapperStyles"
    :position="notifyOptions.position"
    :overlay="false"
    :z-index="notifyOptions.zIndex"
    :safe-area-inset-top="false"
    :safe-area-inset-bottom="false"
    @closed="handleClosed"
  >
    <view
      :class="classes"
      :style="styles"
      @click="handleClick"
    >
      <slot v-if="slots.default" />

      <template v-else>
        {{ notifyOptions.msg }}
      </template>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import "./index";
</style>
