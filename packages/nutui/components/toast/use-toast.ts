import { provide, ref } from 'vue'
import { cloneDeep } from '../_utils'
import { toastDefaultOptions, toastDefaultOptionsKey } from './toast'
import type { ToastInst, ToastOptions, ToastType } from './types'

export function useToast(selector = ''): ToastInst {
  const toastOptionsKey = `${toastDefaultOptionsKey}${selector || ''}`
  const toastOptions = ref<ToastOptions>(cloneDeep(toastDefaultOptions))

  provide(toastOptionsKey, toastOptions)

  function show(type: ToastType, msg: string, options?: ToastOptions) {
    toastOptions.value = Object.assign({
      visible: true,
      type,
      msg,
    }, options)
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
    toastOptions.value = Object.assign(cloneDeep(toastOptions.value), {
      visible: false,
    })
  }

  return {
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
  }
}
