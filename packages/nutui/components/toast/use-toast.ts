import { type SetupContext, computed, onUnmounted, ref, watch } from 'vue'
import { CLOSED_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import type { ToastEmits, ToastProps } from './toast'
import type { ToastOptions, ToastType } from './types'

export function useToast(props: ToastProps, emit: SetupContext<ToastEmits>['emit']) {
  let timer: NodeJS.Timeout | null | undefined
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
    center: props.center,
    textAlignCenter: props.textAlignCenter,
    loadingRotate: props.loadingRotate,
    onClose: props.onClose ? props.onClose : () => {},
    cover: props.cover,
    coverColor: props.coverColor ? props.coverColor : '',
    closeOnClickOverlay: props.closeOnClickOverlay,
  })
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const hide = () => {
    isShowToast.value = false
    emit(UPDATE_VISIBLE_EVENT, false)
    emit(CLOSED_EVENT)
  }

  const hideToast = () => {
    clearTimer()
    hide()
  }

  const openToast = (type: ToastType, options: ToastOptions, msg: string) => {
    toastStatus.value = { ...toastStatus.value, ...options, type, msg }

    clearTimer()
    isShowToast.value = true

    if (toastStatus.value.duration && toastStatus.value.duration > 0)
      timer = setTimeout(hideToast, toastStatus.value.duration)
  }

  const errorMsg = (msg: string) => {
    if (!msg)
      console.warn('[NutUI Toast]: msg不能为空')
  }

  const showToast = {

    text(msg: string, options: ToastOptions = { icon: '' }) {
      errorMsg(msg)
      return openToast('text', options, msg)
    },
    success(msg: string, options: ToastOptions = { type: 'success' }) {
      errorMsg(msg)
      return openToast('success', options, msg)
    },
    fail(msg: string, options: ToastOptions = { type: 'fail' }) {
      errorMsg(msg)
      return openToast('fail', options, msg)
    },
    warn(msg: string, options: ToastOptions = { type: 'warn' }) {
      errorMsg(msg)
      return openToast('warn', options, msg)
    },
    loading(msg: string, options: ToastOptions = { type: 'loading', duration: 0 }) {
      return openToast('loading', options, msg)
    },
  }

  const clickCover = () => {
    if (props.closeOnClickOverlay)
      hideToast()
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
      { 'nut-toast-center': toastStatus.value.center },
      { 'nut-toast-has-icon': hasIcon.value },
      { 'nut-toast-cover': toastStatus.value.cover },
      { 'nut-toast-loading': toastStatus.value.type === 'loading' },
      `nut-toast-${toastStatus.value.size}`,
    ])
  })

  const styles = computed(() => {
    return getMainStyle(props, {
      'bottom': toastStatus.value.center ? 'auto' : toastStatus.value.bottom,
      'background-color': toastStatus.value.coverColor,
    })
  })

  const onAfterLeave = () => {
    if (isShowToast.value)
      hideToast()
  }

  watch(
    () => props.visible,
    (newVal) => {
      isShowToast.value = newVal
      if (newVal)
        openToast(props.type!, { ...props }, props.msg!)
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
