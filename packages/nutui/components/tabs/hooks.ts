import { type ComponentInternalInstance, onMounted, reactive, ref } from 'vue'
import { useTouch } from '../_hooks'
import { isH5 } from '../_utils'
import { refRandomId } from '../_constants'

type TouchPosition = 'left' | 'right' | 'top' | 'bottom' | ''

export function useTabContentTouch(props: any, tabMethods: any, uni?: ComponentInternalInstance, useRect?: any) {
  const tabsContentRef = ref<HTMLElement>()
  const tabsContentID = `tabsContentRef-${refRandomId}`
  const tabsContentRefRect = ref({ width: 0, height: 0 })
  const initUniWidth = async () => {
    if (uni && !isH5) {
      const rect = await useRect(tabsContentID, uni)

      tabsContentRefRect.value.width = rect.width || 0
      tabsContentRefRect.value.height = rect.height || 0
    }
    else {
      tabsContentRefRect.value.width = tabsContentRef.value?.clientWidth || 0
      tabsContentRefRect.value.height = tabsContentRef.value?.clientHeight || 0
    }
  }

  onMounted(() => {
    setTimeout(() => {
      initUniWidth()
    }, 100)
  })
  const touchState = reactive({
    offset: 0,
    moving: false,
  })
  const touch = useTouch()
  let position: TouchPosition = ''
  const setoffset = (deltaX: number, deltaY: number) => {
    let offset = deltaX
    if (props.direction === 'horizontal') {
      position = deltaX > 0 ? 'right' : 'left'
      // 计算拖拽 百分比
      offset = (Math.abs(offset) / tabsContentRefRect.value.width) * 100
    }
    else {
      position = deltaY > 0 ? 'bottom' : 'top'
      offset = deltaY
      // 计算拖拽 百分比
      offset = (Math.abs(offset) / tabsContentRefRect.value?.height) * 100
    }
    // 拖拽阈值 85%
    if (offset > 85)
      offset = 85

    switch (position) {
      case 'left':
      case 'top':
        // 起始tab拖拽拦截
        if (tabMethods.isEnd()) {
          offset = 0
          touchState.moving = false
        }
        break
      case 'right':
      case 'bottom':
        offset = -offset
        // 末位tab拖拽拦截
        if (tabMethods.isBegin()) {
          offset = 0
          touchState.moving = false
        }
        break
    }
    touchState.offset = offset
  }
  const touchMethods = {
    onTouchStart(event: Event) {
      if (!props.swipeable)
        return
      touch.start(event)
    },
    onTouchMove(event: Event) {
      if (!props.swipeable)
        return
      touch.move(event)
      touchState.moving = true
      setoffset(touch.deltaX.value, touch.deltaY.value)

      if (props.direction === 'horizontal' && touch.isHorizontal()) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (props.direction === 'vertical' && touch.isVertical()) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    onTouchEnd() {
      if (touchState.moving) {
        touchState.moving = false
        switch (position) {
          case 'left':
          case 'top':
            // 大于 35%阈值 切换至下一 Tab
            if (touchState.offset > 35)
              tabMethods.next()

            break
          case 'right':
          case 'bottom':
            if (touchState.offset < -35)
              tabMethods.prev()

            break
        }
      }
    },
  }
  return { touchMethods, touchState, tabsContentRef, tabsContentID }
}
