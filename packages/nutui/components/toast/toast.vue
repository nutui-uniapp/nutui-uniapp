<script lang="ts" setup>
import type { CSSProperties, Ref } from 'vue'
import { computed, inject, onUnmounted, ref, watch } from 'vue'
import NutTransition from '../transition/transition.vue'
import NutIcon from '../icon/icon.vue'
import { CLOSED_EVENT, CLOSE_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { cloneDeep, getMainClass, getMainStyle, pxCheck } from '../_utils'
import type { ToastOptions, ToastType } from './types'
import { toastDefaultOptions, toastDefaultOptionsKey, toastEmits, toastProps } from './toast'

const COMPONENT_NAME = 'nut-toast'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(toastProps)

const emit = defineEmits(toastEmits)

const innerVisible = ref<boolean>(false)

const typeIcons: Record<ToastType, string> = {
  text: '',
  success: 'success',
  error: 'failure',
  warning: 'tips',
  loading: 'loading',
}

const toastOptionsKey: string = `${toastDefaultOptionsKey}${props.selector || ''}`
const injectToastOptions: Ref<ToastOptions> = inject(toastOptionsKey, ref(cloneDeep(toastDefaultOptions)))

const toastOptions = ref<ToastOptions>(cloneDeep(props))

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

  toastOptions.value.onClose?.()
}

function onAfterLeave() {
  emit(CLOSED_EVENT)

  toastOptions.value.onClosed?.()
}

function onCoverClick() {
  if (!toastOptions.value.closeOnClickOverlay)
    return

  hide()
}

const iconName = computed<string>(() => {
  if (toastOptions.value.icon)
    return toastOptions.value.icon

  return typeIcons[toastOptions.value.type!]
})

const hasIcon = computed<boolean>(() => {
  return Boolean(iconName.value)
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`nut-toast-${toastOptions.value.size}`]: true,
    'nut-toast-cover': toastOptions.value.cover,
    'nut-toast-center': toastOptions.value.center,
    'nut-toast-loading': toastOptions.value.type === 'loading',
    'nut-toast-loading-rotate': toastOptions.value.loadingRotate,
    'nut-toast-has-icon': hasIcon.value,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    zIndex: toastOptions.value.zIndex,
  })
})

const wrapperStyles = computed<CSSProperties>(() => {
  const value: CSSProperties = {}

  if (toastOptions.value.cover) {
    value.backgroundColor = toastOptions.value.coverColor
  }
  else {
    if (!toastOptions.value.center)
      value.bottom = pxCheck(toastOptions.value.bottom!)
  }

  return value
})

const innerStyles = computed<CSSProperties>(() => {
  const value: CSSProperties = {
    textAlign: toastOptions.value.textAlignCenter ? 'center' : 'left',
    backgroundColor: toastOptions.value.bgColor,
  }

  if (toastOptions.value.cover) {
    if (!toastOptions.value.center)
      value.bottom = pxCheck(toastOptions.value.bottom!)
  }

  return value
})

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

onUnmounted(() => {
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

<template>
  <NutTransition
    :custom-class="classes"
    :custom-style="styles"
    :show="innerVisible"
    name="fade"
    @after-leave="onAfterLeave"
  >
    <view
      class="nut-toast-wrapper"
      :style="wrapperStyles"
      @click="onCoverClick"
    >
      <template v-if="$slots.default">
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
