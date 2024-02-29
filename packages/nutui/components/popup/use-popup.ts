import { type ComputedRef, type SetupContext, computed, reactive, toRefs, watch, watchEffect } from 'vue'
import { CLOSED_EVENT, CLOSE_EVENT, OPENED_EVENT, OPEN_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { animationName } from '../_constants/types'
import { getMainClass, getMainStyle } from '../_utils'
import type { PopupEmits, PopupProps } from './popup'

const initIndex = 500
let _zIndex = initIndex
const componentName = `${PREFIX}-popup`
export function usePopup(props: PopupProps, emit: SetupContext<PopupEmits>['emit']) {
  let opened: boolean
  const state = reactive({
    zIndex: props.zIndex,
    showSlot: true,
    closed: props.closeable,
  })

  const classes = computed(() => {
    return getMainClass(props, componentName, {
      round: props.round,
      [`nut-popup--${props.position}`]: true,
      [`nut-popup--${props.position}--safebottom`]: props.position === 'bottom' && props.safeAreaInsetBottom,
      [`nut-popup--${props.position}--safetop`]: props.position === 'top' && props.safeAreaInsetTop,
      [props.popClass]: true,
    })
  })

  const popStyle: ComputedRef = computed(() => {
    return getMainStyle(props, {
      zIndex: +state.zIndex,
      transitionDuration: `${props.duration}ms`,
    })
  })

  const transitionName: ComputedRef = computed(() => {
    return props.transition ? props.transition : `${animationName[props.position]}`
  })

  const open = () => {
    if (!opened) {
      opened = true
      if (props.zIndex !== initIndex)
        _zIndex = Number(props.zIndex)

      emit(UPDATE_VISIBLE_EVENT, true)
      state.zIndex = ++_zIndex
      state.showSlot = true

      emit(OPEN_EVENT)
    }
  }

  const close = () => {
    if (opened) {
      opened = false
      emit(UPDATE_VISIBLE_EVENT, false)
      emit(CLOSE_EVENT)
    }
  }

  const onClick = (e: Event) => {
    emit('click-pop', e)
  }

  const onClickCloseIcon = (e: Event) => {
    e.stopPropagation()
    emit('click-close-icon')
    close()
  }

  const onClickOverlay = () => {
    emit('click-overlay')
    if (props.closeOnClickOverlay)
      close()
  }

  const onOpened = () => {
    emit('opend')
    emit(OPENED_EVENT)
  }

  const onClosed = () => {
    emit(CLOSED_EVENT)

    state.showSlot = !props.destroyOnClose
  }

  watch(
    () => props.visible,
    (val) => {
      if (val && !opened)
        open()

      if (!val && opened) {
        opened = false
        emit('close')
      }
    },
  )
  watchEffect(() => {
    // props.visible ? open() : close();
    state.closed = props.closeable
  })

  return {
    ...toRefs(state),
    popStyle,
    transitionName,
    classes,
    onClick,
    onClickCloseIcon,
    onClickOverlay,
    onOpened,
    onClosed,
  }
}
