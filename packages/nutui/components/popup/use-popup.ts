import type { SetupContext } from 'vue'
import { computed, reactive, toRefs, watch } from 'vue'
import { CLOSED_EVENT, CLOSE_EVENT, OPENED_EVENT, OPEN_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { animationName } from '../_constants/types'
import { getMainClass, getMainStyle } from '../_utils'
import type { NutAnimationName } from '../transition'
import { useGlobalZIndex } from '../_hooks'
import type { PopupEmits, PopupProps } from './popup'

const componentName = `${PREFIX}-popup`

export function usePopup(props: PopupProps, emit: SetupContext<PopupEmits>['emit']) {
  const state = reactive({
    innerVisible: false,
    innerIndex: props.zIndex,
    showSlot: true,
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

  const popStyle = computed(() => {
    return getMainStyle(props, {
      zIndex: state.innerIndex,
      transitionDuration: `${props.duration}ms`,
    })
  })

  const transitionName = computed<NutAnimationName>(() => {
    return props.transition ? props.transition : `${animationName[props.position]}`
  })

  const open = () => {
    if (state.innerVisible)
      return

    state.innerIndex = props.zIndex !== undefined ? props.zIndex : useGlobalZIndex()

    state.innerVisible = true
    emit(UPDATE_VISIBLE_EVENT, true)

    state.showSlot = true

    emit(OPEN_EVENT)
  }

  const close = () => {
    if (!state.innerVisible)
      return

    state.innerVisible = false
    emit(UPDATE_VISIBLE_EVENT, false)

    emit(CLOSE_EVENT)
  }

  const onClick = (e: any) => {
    emit('click-pop', e)
  }

  const onClickCloseIcon = (e: any) => {
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
    emit(OPENED_EVENT)
    emit('opend')
  }

  const onClosed = () => {
    emit(CLOSED_EVENT)

    state.showSlot = !props.destroyOnClose
  }

  watch(() => props.visible, (value) => {
    if (value && !state.innerVisible)
      open()

    if (!value && state.innerVisible) {
      state.innerVisible = false
      emit(CLOSE_EVENT)
    }
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
