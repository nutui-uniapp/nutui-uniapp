import type { SetupContext } from 'vue'
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import {
  animationName,
  CLOSE_EVENT,
  CLOSED_EVENT,
  OPEN_EVENT,
  OPENED_EVENT,
  PREFIX,
  UPDATE_VISIBLE_EVENT,
} from '../_constants'
import { useGlobalZIndex } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import type { NutAnimationName } from '../transition'
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

  const applyVisible = (visible: boolean) => {
    if (visible && !state.innerVisible) {
      open()
    }

    if (!visible && state.innerVisible) {
      state.innerVisible = false

      emit(CLOSE_EVENT)
    }
  }

  watch(() => props.visible, (value) => {
    applyVisible(value)
  })

  onMounted(() => {
    applyVisible(props.visible)
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
