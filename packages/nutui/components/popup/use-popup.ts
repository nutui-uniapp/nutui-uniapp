import { type ComputedRef, type SetupContext, computed, reactive, toRefs, watch, watchEffect } from 'vue'
import { CLOSED_EVENT, CLOSE_EVENT, OPENED_EVENT, OPEN_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { animationName } from '../_constants/types'
import { getMainClass, getMainStyle } from '../_utils'
import type { PopupEmits, PopupProps } from './popup'

const initIndex = 500
let _zIndex = initIndex
const componentName = `${PREFIX}-popup`
export function usePopup(props: PopupProps, emit: SetupContext<PopupEmits>['emit']) {
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
    if (props.zIndex !== initIndex)
      _zIndex = Number(props.zIndex)

    emit('update:visible', true)
    state.zIndex = ++_zIndex
    if (props.destroyOnClose)
      state.showSlot = true

    emit(OPEN_EVENT)
  }

  const close = () => {
    // if (props.visible)
    //   return // 避免重复调用
    emit(UPDATE_VISIBLE_EVENT, false)
    emit(CLOSE_EVENT)
    if (props.destroyOnClose) {
      setTimeout(() => {
        state.showSlot = false
      }, +props.duration)
    }
  }

  const onClick = (e: Event) => {
    emit('click-pop', e)
  }

  const onClickCloseIcon = (e: Event) => {
    e.stopPropagation()
    emit('click-close-icon')
    emit(UPDATE_VISIBLE_EVENT, false)
    // close();
  }

  const onClickOverlay = () => {
    emit('click-overlay')
    if (props.closeOnClickOverlay)
      emit(UPDATE_VISIBLE_EVENT, false)
      // close();
  }

  const onOpened = () => {
    emit('opend')
    emit(OPENED_EVENT)
  }

  const onClosed = () => {
    emit(CLOSED_EVENT)
  }

  watch(
    () => props.visible,
    (val) => {
      val ? open() : close()
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
