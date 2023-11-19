import { type SetupContext, computed, onUnmounted, ref, watch } from 'vue'
import { CLOSED_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import type { ToastEmits, ToastProps } from './toast'
import type { ToastOptions, ToastType } from './types'

export function useToast(props: ToastProps, emit: SetupContext<ToastEmits>['emit']) {
  let timer: any = null
  const componentName = `${PREFIX}-toast`

  const isShowToast = ref<boolean>(false)
  const typeIcons: Record<ToastType, string> = {
    text: '',
    success: 'success',
    fail: 'failure',
    warn: 'tips',
    loading: 'loading',
  }

  const toastStatus = ref<ToastOptions>({
    msg: props.msg!,
    duration: props.duration,
    type: props.type,
    icon: props.icon,
    title: props.title,
    iconSize: props.iconSize,
    bgColor: props.bgColor,
    size: props.size,
    bottom: props.bottom,
  })
  const clearTimer = () => {
    timer && clearTimeout(timer)
    timer = null
  }
  const hide = () => {
    emit(UPDATE_VISIBLE_EVENT, false)
    emit(CLOSED_EVENT)
  }

  const hideToast = () => {
    isShowToast.value = false
    hide()
  }

  const openToast = (type: ToastType, options: ToastOptions, msg: string) => {
    toastStatus.value = { ...toastStatus.value, ...options, type, msg }
    isShowToast.value = true

    if (toastStatus.value.duration === 0)
      return

    if (timer)
      clearTimeout(timer)

    timer = setTimeout(hideToast, toastStatus.value.duration)
  }

  const showToast = {
    text(msg: string, options: ToastOptions = { icon: '' }) {
      return openToast('text', options, msg)
    },
    success(msg: string, options: ToastOptions = { type: 'success' }) {
      return openToast('success', options, msg)
    },
    fail(msg: string, options: ToastOptions = { type: 'fail' }) {
      return openToast('fail', options, msg)
    },
    warn(msg: string, options: ToastOptions = { type: 'warn' }) {
      return openToast('warn', options, msg)
    },
    loading(msg: string, options: ToastOptions = { type: 'loading' }) {
      return openToast('loading', options, msg)
    },
  }

  const clickCover = () => {
    if (props.closeOnClickOverlay)
      hide()
  }

  const hasIcon = computed(() => {
    if (toastStatus.value.type !== 'text')
      return true

    else
      return !!toastStatus.value.icon
  })
  const iconName = computed(() => {
    if (toastStatus.value.icon)
      return toastStatus.value.icon

    else
      return typeIcons[toastStatus.value.type!]
  })
  const toastBodyClass = computed(() => {
    return getMainClass(props, componentName, [
      { 'nut-toast-center': props.center },
      { 'nut-toast-has-icon': hasIcon.value },
      { 'nut-toast-cover': props.cover },
      { 'nut-toast-loading': toastStatus.value.type === 'loading' },
      `nut-toast-${toastStatus.value.size}`,
    ])
  })

  const styles = computed(() => {
    return getMainStyle(props, {
      'bottom': props.center ? 'auto' : toastStatus.value.bottom,
      'background-color': props.coverColor,
    })
  })

  const onAfterLeave = () => {
    if (props.visible) {
      clearTimer()
      props.onClose && props.onClose()
    }
  }

  watch(
    () => props.visible,
    (newVal) => {
      if (newVal) {
        toastStatus.value = { ...props }
        isShowToast.value = props.visible
        const DURATION: number = toastStatus.value.duration!
        if (newVal && DURATION) {
          timer = setTimeout(() => {
            hideToast()
          }, DURATION)
        }
      }
    },
    {
      immediate: true,
    },
  )

  onUnmounted(() => {
    clearTimer()
  })

  return {
    clickCover,
    hasIcon,
    iconName,
    toastBodyClass,
    styles,
    onAfterLeave,
    toastStatus,
    isShowToast,
    showToast,
    hideToast,
  }
}
