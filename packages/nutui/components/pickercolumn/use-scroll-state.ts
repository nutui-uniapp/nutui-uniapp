import { computed, ref } from 'vue'
import type { ScrollState } from './types'

/**
 * PickerColumn 滚动状态机
 *
 * 核心原则：
 * 1. 只有 idle 状态才接受外部 props 更新
 * 2. 滚动过程中保持内部自治
 * 3. 只在进入 idle 时才通知外部变化
 *
 * 状态转换图:
 * ```
 * idle ──► touching ──► scrolling ──► momentum ──► settling ──► idle
 *              │             │                          ▲
 *              │             └──────────────────────────┘
 *              └──► idle (未移动)
 * ```
 */
export function useScrollState() {
  const state = ref<ScrollState>({ type: 'idle' })

  // 状态判断
  const isIdle = computed(() => state.value.type === 'idle')
  const isTouching = computed(() => state.value.type === 'touching')
  const isScrolling = computed(() => state.value.type === 'scrolling')
  const isMomentum = computed(() => state.value.type === 'momentum')
  const isSettling = computed(() => state.value.type === 'settling')

  // 是否正在进行用户交互（非 idle 状态）
  const isInteracting = computed(() => state.value.type !== 'idle')

  // 是否正在动画中（momentum 或 settling）
  const isAnimating = computed(() => {
    return state.value.type === 'momentum' || state.value.type === 'settling'
  })

  // 获取目标索引（如果有）
  const targetIndex = computed(() => {
    if (state.value.type === 'momentum' || state.value.type === 'settling') {
      return state.value.targetIndex
    }

    if (state.value.type === 'touching') {
      return state.value.startIndex
    }

    return null
  })

  function toIdle() {
    state.value = { type: 'idle' }
  }

  function toTouching(startIndex: number) {
    state.value = { type: 'touching', startIndex }
  }

  function toScrolling() {
    if (state.value.type === 'touching' || state.value.type === 'idle') {
      state.value = { type: 'scrolling' }
    }
  }

  function toMomentum(targetIndex: number, duration: number) {
    state.value = { type: 'momentum', targetIndex, duration }
  }

  function toSettling(targetIndex: number) {
    state.value = { type: 'settling', targetIndex }
  }

  return {
    state,
    isIdle,
    isTouching,
    isScrolling,
    isMomentum,
    isSettling,
    isInteracting,
    isAnimating,
    targetIndex,
    toIdle,
    toTouching,
    toScrolling,
    toMomentum,
    toSettling,
  }
}
