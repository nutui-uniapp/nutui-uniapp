import { provide, ref } from 'vue'
import { cloneDeep } from '../_utils'
import { notifyDefaultOptions, notifyDefaultOptionsKey } from './notify'
import type { NotifyInst, NotifyOptions, NotifyType } from './types'

export function useNotify(selector = ''): NotifyInst {
  const notifyOptionsKey = `${notifyDefaultOptionsKey}${selector || ''}`
  const notifyOptions = ref<NotifyOptions>(cloneDeep(notifyDefaultOptions))

  provide(notifyOptionsKey, notifyOptions)

  function show(type: NotifyType, msg: string, options?: NotifyOptions) {
    notifyOptions.value = Object.assign({
      visible: true,
      type,
      msg,
    }, options)
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
    notifyOptions.value = Object.assign(cloneDeep(notifyOptions.value), {
      visible: false,
    })
  }

  return {
    showNotify: legacyShow,
    hideNotify: hide,

    show,
    primary: showPrimary,
    success: showSuccess,
    danger: showDanger,
    warning: showWarning,
    custom: showCustom,
    hide,
  }
}
