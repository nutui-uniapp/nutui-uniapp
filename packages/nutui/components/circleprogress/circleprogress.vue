<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX, refRandomId } from '../_constants'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { circleprogressProps } from './circleprogress'

interface Item {
  key?: string
  value?: string
}
const props = defineProps(circleprogressProps)
const isIos = uni.getSystemInfoSync().platform === 'ios'
const currentRate = ref(props.progress)
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const getStyle = computed(() => {
  return getMainStyle(props, {
    height: `${pxCheck(Number(props.radius) * 2)}`,
    width: `${pxCheck(Number(props.radius) * 2)}`,
  })
})
const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

function transColor(color: string | undefined) {
  return color && color.replace('#', '%23')
}
function stop() {
  if (!isObject(props.customColor))
    return []

  const color = props.customColor
  const colorArr = Object.keys(color).sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))

  const stopArr: object[] = []
  colorArr.forEach((item) => {
    const obj = {
      key: '',
      value: '',
    }
    obj.key = item
    obj.value = color[item]
    stopArr.push(obj)
  })
  return stopArr
}

const style = computed(() => {
  const { strokeWidth } = props

  const stopArr: Array<object> = stop()
  const stopDom: string[] = []
  if (stopArr) {
    stopArr.forEach((item: Item) => {
      let obj = ''
      obj = `%3Cstop offset='${item.key}' stop-color='${transColor(item.value)}'/%3E`
      stopDom.push(obj)
    })
  }
  const perimeter = 283
  const progress = +currentRate.value!
  const offset = (perimeter * Number(format(Number.parseFloat(progress.toFixed(1))))) / 100
  const isWise = props.clockwise ? 1 : 0
  const color = isObject(props.customColor) ? `url(%23${refRandomId})` : transColor(props.customColor)
  const d = `M 50 50 m 0 -45 a 45 45 0 1 ${isWise} 0 90 a 45 45 0 1, ${isWise} 0 -90`
  const pa = `%3Cdefs%3E%3ClinearGradient id='${refRandomId}' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E${stopDom}%3C/linearGradient%3E%3C/defs%3E`
  const path = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke='${transColor(
        props.pathColor,
      )}' fill='none'/%3E`
  const path1 = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke-dasharray='${offset},${perimeter}' stroke-linecap='round' stroke='${color}' fill='none'/%3E`

  return {
    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100'  xmlns='http://www.w3.org/2000/svg'%3E${pa}${path}${path1}%3C/svg%3E")`,
    width: '100%',
    height: '100%',
    transition: `${isIos ? '' : 'background-image .3s ease 0s, '}stroke .3s ease 0s`,
  }
})
const format = (progress: string | number) => Math.min(Math.max(+progress, 0), 100)

watch(
  () => props.progress,
  (value) => {
    currentRate.value = Math.min(Math.max(+value!, 0), 100)
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-circle-progress`

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
  <div :class="classes" :style="getStyle">
    <div :style="style" />
    <div class="nut-circle-progress__text">
      <slot>
        <span>{{ progress }}%</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
