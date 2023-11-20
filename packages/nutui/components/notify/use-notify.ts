import { type SetupContext, onUnmounted, ref, watch } from 'vue'
import { UPDATE_VISIBLE_EVENT } from '../_constants'
import type { NotifyEmits, NotifyProps } from './notify'
import type { NotifyOptions } from './type'

export function useNotify(props: NotifyProps, emit: SetupContext<NotifyEmits>['emit']) {
  const clickCover = () => {
    props.onClick && props.onClick()
  }
  let timer: NodeJS.Timeout | null | undefined

  const clearTimer = () => {
    if (timer) {
      timer && clearTimeout(timer)
      timer = null
    }
  }
  // watch show popup
  const isShowPopup = ref<boolean>(false)

  const notifyStatus = ref<NotifyOptions>({
    type: props.type,
    msg: props.msg,
    customColor: props.customColor,
    background: props.background,
    duration: props.duration,
    position: props.position,
    safeAreaInsetTop: props.safeAreaInsetTop,
  })

  const errorMsg = (msg: string) => {
    if (!msg) {
      console.warn('[NutUI Notify]: msg不能为空')
      /* eslint-disable no-useless-return */
      return
    }
  }

  const hideNotify = () => {
    isShowPopup.value = false
    emit(UPDATE_VISIBLE_EVENT, false)
  }

  const showNotify = (option: NotifyOptions) => {
    errorMsg(option.msg)
    notifyStatus.value = {
      type: option.type || props.type,
      position: option.position || props.position,
      msg: option.msg || props.msg,
      customColor: option.customColor || props.customColor,
      background: option.background || props.background,
      duration: option.duration || props.duration,
      safeAreaInsetTop: option.safeAreaInsetTop || props.safeAreaInsetTop,

    }

    clearTimer()
    isShowPopup.value = true
    if (notifyStatus.value.duration && notifyStatus.value.duration > 0)
      timer = setTimeout(hideNotify, notifyStatus.value.duration)
  }

  watch(
    () => props.visible,
    (newVal: boolean) => {
      isShowPopup.value = newVal
      const DURATION: number = notifyStatus.value.duration!
      if (newVal && DURATION) {
        timer = setTimeout(() => {
          hideNotify()
        }, DURATION)
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    clearTimer()
  })

  return {
    clickCover,
    showNotify,
    hideNotify,
    notifyStatus,
    isShowPopup,
  }
}
