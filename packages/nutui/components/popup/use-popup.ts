import { type ComputedRef, type SetupContext, computed, reactive, toRefs, watch, watchEffect } from 'vue'
import { PREFIX } from '../_constants'
import { animationName } from '../_constants/types'
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
    const prefixCls = componentName
    return {
      [prefixCls]: true,
      round: props.round,
      [`nut-popup--${props.position}`]: true,
      [`nut-popup--${props.position}--safebottom`]: props.position === 'bottom' && props.safeAreaInsetBottom,
      [`nut-popup--${props.position}--safetop`]: props.position === 'top' && props.safeAreaInsetTop,
      [props.popClass]: true,
    }
  })

  const popStyle: ComputedRef = computed(() => {
    return {
      zIndex: state.zIndex,
      transitionDuration: `${props.duration}ms`,
    }
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

    emit('open')
  }

  const close = () => {
    // if (props.visible)
    //   return // 避免重复调用
    emit('update:visible', false)
    emit('close')
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
    emit('update:visible', false)
    // close();
  }

  const onClickOverlay = () => {
    emit('click-overlay')
    if (props.closeOnClickOverlay)
      emit('update:visible', false)
      // close();
  }

  const onOpened = () => {
    emit('opend')
  }

  const onClosed = () => {
    emit('closed')
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
