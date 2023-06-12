import type { SetupContext } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'
import type { TransitionEmits, TransitionProps } from './transition'
import type { NutAnimations } from './types'

export const animations: NutAnimations = {
  'fade': {
    enter: 'nutFadeIn',
    leave: 'nutFadeOut',
  },
  'fade-up': {
    enter: 'nutFadeUpIn',
    leave: 'nutFadeUpOut',
  },
  'fade-down': {
    enter: 'nutFadeDownIn',
    leave: 'nutFadeDownOut',
  },
  'fade-left': {
    enter: 'nutFadeLeftIn',
    leave: 'nutFadeLeftOut',
  },
  'fade-right': {
    enter: 'nutFadeRightIn',
    leave: 'nutFadeRightOut',
  },
  'slide-up': {
    enter: 'nutSlideUpIn',
    leave: 'nutSlideDownOut',
  },
  'slide-down': {
    enter: 'nutSlideDownIn',
    leave: 'nutSlideUpOut',
  },
  'slide-left': {
    enter: 'nutSlideLeftIn',
    leave: 'nutSlideLeftOut',
  },
  'slide-right': {
    enter: 'nutSlideRightIn',
    leave: 'nutSlideRightOut',
  },
  'zoom': {
    enter: 'nutZoomIn',
    leave: 'nutZoomOut',
  },

}
export function useTransition(props: TransitionProps, emit: SetupContext<TransitionEmits>['emit']) {
  const display = ref(false)
  const name = computed(() => props.name || 'fade')
  const duration = computed(() => props.duration || 200)

  const animationClass = ref('')

  async function enter() {
    if (display.value)
      return
    emit('beforeEnter')
    display.value = true
    animationClass.value = animations[name.value]?.enter
    await nextTick()
    emit('enter')

    setTimeout(() => {
      emit('afterEnter')
    }, duration.value)
  }

  async function leave() {
    if (!display.value)
      return
    emit('beforeLeave')
    animationClass.value = animations[name.value]?.leave
    await nextTick()
    emit('leave')

    setTimeout(() => {
      if (!props.show && display.value)
        display.value = false
      emit('afterLeave')
    }, duration.value)
  }

  watch(
    () => props.show,
    (val) => {
      val ? enter() : leave()
    },
    { immediate: true },
  )

  function clickHandler(evt: MouseEvent) {
    // evt.stopPropagation()
    emit('click', evt)
  }

  return {
    display,
    animationClass,

    clickHandler,
  }
}
