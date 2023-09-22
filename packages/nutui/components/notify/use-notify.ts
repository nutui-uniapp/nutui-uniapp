import { type SetupContext, onUnmounted, ref, watch } from 'vue'
import type { NotifyEmits, NotifyProps } from './notify'
import type { NotifyOptions } from './type'

export function useNotify(props: NotifyProps, emit: SetupContext<NotifyEmits>['emit']) {
  const clickCover = () => {
    props.onClick && props.onClick()
  }
  // timer
  let timer: null | any = null
  const clearTimer = () => {
    timer && clearTimeout(timer)
    timer = null
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

  // hide popup
  const hide = () => {
    emit('update:visible', false)
  }

  const hideNotify = () => {
    isShowPopup.value = false
    hide()
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
    isShowPopup.value = true

    if (timer)
      clearTimeout(timer)

    timer = setTimeout(hideNotify, notifyStatus.value.duration)
  }

  watch(
    () => props.visible,
    (newVal: boolean) => {
      isShowPopup.value = props.visible
      const DURATION: number = notifyStatus.value.duration!
      if (newVal && DURATION) {
        timer = setTimeout(() => {
          hide()
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
