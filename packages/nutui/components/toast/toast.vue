<script lang="ts" setup>
import type { CSSProperties, Ref } from 'vue'
import { computed, defineComponent, inject, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import { CLOSE_EVENT, CLOSED_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { cloneDeep, getMainClass, getMainStyle, pxCheck } from '../_utils'
import NutIcon from '../icon/icon.vue'
import NutTransition from '../transition/transition.vue'
import { toastDefaultOptions, toastDefaultOptionsKey, toastEmits, toastProps } from './toast'
import type { ToastOptions, ToastType } from './types'

const props = defineProps(toastProps)

const emit = defineEmits(toastEmits)

const slots = useSlots()

const toastOptionsKey = `${toastDefaultOptionsKey}${props.selector || ''}`
const injectToastOptions: Ref<ToastOptions> = inject(toastOptionsKey, ref(cloneDeep(toastDefaultOptions)))

const typeIcons: Record<ToastType, string> = {
  text: '',
  success: 'success',
  error: 'failure',
  warning: 'tips',
  loading: 'loading',
}

const innerVisible = ref(false)

const toastOptions = ref<ToastOptions>(cloneDeep(props))

const iconName = computed(() => {
  const { icon, type } = toastOptions.value

  return icon || typeIcons[type!]
})

const hasIcon = computed(() => {
  return Boolean(iconName.value)
})

const classes = computed(() => {
  const { size, cover, center, type, loadingRotate } = toastOptions.value

  return getMainClass(props, componentName, {
    [`nut-toast-${size}`]: true,
    'nut-toast-cover': cover,
    'nut-toast-center': center,
    'nut-toast-loading': type === 'loading',
    'nut-toast-loading-rotate': loadingRotate,
    'nut-toast-has-icon': hasIcon.value,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    zIndex: toastOptions.value.zIndex,
  })
})

const wrapperStyles = computed(() => {
  const value: CSSProperties = {}

  const { cover, coverColor, center, bottom } = toastOptions.value

  if (cover) {
    value.backgroundColor = coverColor
  }
  else {
    if (!center)
      value.bottom = pxCheck(bottom!)
  }

  return value
})

const innerStyles = computed(() => {
  const { textAlignCenter, bgColor, cover, center, bottom } = toastOptions.value

  const value: CSSProperties = {
    textAlign: textAlignCenter ? 'center' : 'left',
    backgroundColor: bgColor,
  }

  if (cover) {
    if (!center)
      value.bottom = pxCheck(bottom!)
  }

  return value
})

let timer: NodeJS.Timeout | null = null

function startTimer() {
  timer = setTimeout(() => {
    hide()
  }, toastOptions.value.duration)
}

function destroyTimer() {
  if (timer == null)
    return

  clearTimeout(timer)
  timer = null
}

function show(type: ToastType, msg: string, options?: ToastOptions) {
  destroyTimer()

  toastOptions.value = Object.assign(cloneDeep(toastDefaultOptions), {
    visible: true,
    type,
    msg,
  }, options)

  innerVisible.value = true

  if (toastOptions.value.duration! > 0)
    startTimer()
}

function showText(msg: string, options?: ToastOptions) {
  show('text', msg, options)
}

function showSuccess(msg: string, options?: ToastOptions) {
  show('success', msg, options)
}

function showError(msg: string, options?: ToastOptions) {
  show('error', msg, options)
}

function showWarning(msg: string, options?: ToastOptions) {
  show('warning', msg, options)
}

function showLoading(msg: string, options?: ToastOptions) {
  show('loading', msg, Object.assign({
    duration: 0,
    cover: true,
  }, options))
}

function hide() {
  destroyTimer()

  innerVisible.value = false
  toastOptions.value.visible = false

  emit(UPDATE_VISIBLE_EVENT, false)
  emit(CLOSE_EVENT)

  if (toastOptions.value.onClose) {
    toastOptions.value.onClose()
  }
}

function handleAfterLeave() {
  emit(CLOSED_EVENT)

  if (toastOptions.value.onClosed) {
    toastOptions.value.onClosed()
  }
}

function handleCoverClick() {
  if (!toastOptions.value.closeOnClickOverlay)
    return

  hide()
}

watch(() => props, (value) => {
  toastOptions.value = Object.assign(cloneDeep(toastDefaultOptions), value)

  if (value.visible)
    show(toastOptions.value.type!, toastOptions.value.msg!, toastOptions.value)
  else
    hide()
}, { deep: true })

watch(injectToastOptions, (value) => {
  toastOptions.value = Object.assign(cloneDeep(toastDefaultOptions), value)

  if (value.visible)
    show(toastOptions.value.type!, toastOptions.value.msg!, toastOptions.value)
  else
    hide()
})

onBeforeUnmount(() => {
  destroyTimer()
})

defineExpose({
  showToast: {
    text: showText,
    success: showSuccess,
    fail: showError,
    warn: showWarning,
    loading: showLoading,
  },
  hideToast: hide,

  text: showText,
  success: showSuccess,
  error: showError,
  warning: showWarning,
  loading: showLoading,
  hide,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-toast`

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
  <NutTransition
    :custom-class="classes"
    :custom-style="styles"
    :show="innerVisible"
    name="fade"
    @after-leave="handleAfterLeave"
  >
    <view
      class="nut-toast-wrapper"
      :style="wrapperStyles"
      @click="handleCoverClick"
    >
      <template v-if="slots.default">
        <slot />
      </template>

      <template v-else>
        <view
          class="nut-toast-inner"
          :style="innerStyles"
        >
          <view v-if="hasIcon" class="nut-toast-icon-wrapper">
            <NutIcon :name="iconName" :size="toastOptions.iconSize" custom-color="#ffffff" />
          </view>

          <text v-if="toastOptions.title" class="nut-toast-title">
            {{ toastOptions.title }}
          </text>

          <rich-text v-if="toastOptions.msg" class="nut-toast-text" :nodes="toastOptions.msg" />
        </view>
      </template>
    </view>
  </NutTransition>
</template>

<style lang="scss">
@import "./index";
</style>
