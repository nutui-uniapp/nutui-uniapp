<script setup lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, watch } from 'vue'
import { getMainClass, getTimeStamp, isH5, padZero } from '../_utils'
import { INPUT_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import requestAniFrame from '../_utils/raf'
import { countdownEmits, countdownProps } from './countdown'

const props = defineProps(countdownProps)
const emits = defineEmits(countdownEmits)
defineExpose({ start, pause, reset })

const state = reactive({
  restTime: 0, // 倒计时剩余时间时间
  timer: null,
  counting: !props.paused && props.autoStart, // 是否处于倒计时中
  handleEndTime: Date.now(), // 最终截止时间
  diffTime: 0, // 设置了 startTime 时，与 date.now() 的差异
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

// 将倒计时剩余时间格式化   参数： t  时间戳  type custom 自定义类型
function formatRemainTime(t: number, type?: string) {
  const ts = t
  const rest = {
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    ms: 0,
  }

  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  if (ts > 0) {
    rest.d = ts >= SECOND ? Math.floor(ts / DAY) : 0
    rest.h = Math.floor((ts % DAY) / HOUR)
    rest.m = Math.floor((ts % HOUR) / MINUTE)
    rest.s = Math.floor((ts % MINUTE) / SECOND)
    rest.ms = Math.floor(ts % SECOND)
  }

  return type === 'custom' ? rest : parseFormat({ ...rest })
}

function parseFormat(time: { d: number; h: number; m: number; s: number; ms: number }) {
  let { d, h, m, s, ms } = time
  let format = props.format

  if (format.includes('DD'))
    format = format.replace('DD', padZero(d))
  else
    h += Number(d) * 24

  if (format.includes('HH'))
    format = format.replace('HH', padZero(h))
  else
    m += Number(h) * 60

  if (format.includes('mm'))
    format = format.replace('mm', padZero(m))
  else
    s += Number(m) * 60

  if (format.includes('ss'))
    format = format.replace('ss', padZero(s))
  else
    ms += Number(s) * 1000

  if (format.includes('S')) {
    const msC = padZero(ms, 3).toString()

    if (format.includes('SSS'))
      format = format.replace('SSS', msC)
    else if (format.includes('SS'))
      format = format.replace('SS', msC.slice(0, 2))
    else if (format.includes('S'))
      format = format.replace('S', msC.slice(0, 1))
  }
  return format
}

// 倒计时 interval
function initTime() {
  state.handleEndTime = props.endTime as number
  state.diffTime = Date.now() - getTimeStamp(props.startTime) // 时间差
  if (!state.counting)
    state.counting = true
  tick()
}

function tick() {
  function countdown() {
    const currentTime = Date.now() - state.diffTime
    const remainTime = Math.max(state.handleEndTime - currentTime, 0)

    state.restTime = remainTime

    if (!remainTime) {
      state.counting = false
      pause()
      emits('onEnd')
    }

    if (remainTime > 0)
      tick()
  }

  if (isH5) {
    (state.timer as any) = requestAnimationFrame(() => {
      if (state.counting)
        countdown()
    })
  }
  else {
    (state.timer as any) = requestAniFrame(() => {
      if (state.counting)
        countdown()
    })
  }
}
/**
 * @description 开始倒计时
 */
function start() {
  if (!state.counting && !props.autoStart) {
    state.counting = true
    state.handleEndTime = Date.now() + Number(state.restTime)
    tick()
    emits('onRestart', state.restTime)
  }
}
/**
 * @description 暂停倒计时
 */
function pause() {
  if (isH5)
    cancelAnimationFrame(state.timer as any)
  else
    clearTimeout(state.timer as any)

  state.counting = false
  emits('onPaused', state.restTime)
}
/**
 * @description 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时
 */
function reset() {
  if (!props.autoStart) {
    pause()
    state.restTime = props.time as number
  }
}

const renderTime = computed(() => {
  return formatRemainTime(state.restTime)
})

onBeforeMount(() => {
  if (props.autoStart)
    initTime()
  else
    state.restTime = props.time as number
})

watch(
  () => state.restTime,
  (value) => {
    const tranTime = formatRemainTime(value, 'custom')
    emits(UPDATE_MODEL_EVENT, tranTime)
    emits(INPUT_EVENT, tranTime)
  },
)

watch(
  () => props.paused,
  (v, ov) => {
    if (!ov) {
      if (state.counting)
        pause()
    }
    else {
      if (!state.counting) {
        state.counting = true
        state.handleEndTime = Date.now() + Number(state.restTime)
        tick()
      }

      emits('onRestart', state.restTime)
    }
  },
)

watch(
  () => props.endTime,
  () => {
    initTime()
  },
)

watch(
  () => props.startTime,
  () => {
    initTime()
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-countdown`
export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" :style="customStyle">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <rich-text class="nut-countdown__content" :nodes="renderTime as string" />
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
