<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, useSlots, watch } from 'vue'
import { PREFIX } from '../_constants'
import { useSelectorQuery } from '../_hooks'
import { getMainClass } from '../_utils'
import { barrageProps } from './barrage'

const props = defineProps(barrageProps)

const instance = getCurrentInstance()!

const { getSelectorNodeInfo } = useSelectorQuery(instance)

const slotDefault = !!useSlots().default

const classTime = Date.now()

const timeId = ref(Date.now())
const danmuList = ref<any[]>(props.danmu)
const rows = ref(props.rows)
const top = ref(props.top)
const speeds = props.speeds

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`nut-barrage--dmBody${timeId.value}`]: true,
  })
})

function add(word: string) {
  danmuList.value = [...danmuList.value, word]

  runStep()
}

function getNode(index: number) {
  setTimeout(async () => {
    const dmBodyNodeInfo = await getSelectorNodeInfo(`.nut-barrage--dmBody${timeId.value}`)
    const itemNodeInfo = await getSelectorNodeInfo(`.nut-barrage__item${index}`)

    const width = dmBodyNodeInfo?.width || 300
    const height = itemNodeInfo?.height
    const nodeTop = `${(index % rows.value) * (height! + top.value) + 20}px`

    styleInfo(index, nodeTop, width)
  }, 500)
}

function runStep() {
  danmuList.value.forEach((_, index) => {
    getNode(index)
  })
}

const styleList: CSSProperties[] = reactive([])

function styleInfo(index: number, nodeTop: string, width: number) {
  const timeIndex = index - rows.value > 0 ? index - rows.value : 0
  const list = styleList
  const time = list[timeIndex] ? Number(list[timeIndex]['--time']) : 0
  // distance.value = '-' + (speeds / 1000) * 200 + '%';

  const obj: CSSProperties = {
    'top': nodeTop,
    '--time': `${props.frequency * index + time}`,
    'animationDuration': `${speeds}ms`,
    'animationIterationCount': `${props.loop ? 'infinite' : 1}`,
    'animationDelay': `${props.frequency * index + time}ms`,
    '--move-distance': `-${width}px`,
  }
  if (slotDefault && danmuList.value[index]?.el) {
    danmuList.value[index].el.style = Object.assign(danmuList.value[index].el.style, obj)
  }
  else {
    styleList.push(obj)
  }
}

watch(
  () => props.danmu,
  (value) => {
    danmuList.value = [...value]
  },
)

onMounted(() => {
  // #ifdef H5
  if (slotDefault) {
    const list = document
      .getElementsByClassName(`nut-barrage__slotBody${classTime}`)[0]
      .getElementsByClassName('nut-barrage__item')

    // @ts-expect-error whatever
    danmuList.value = list?.[0]?.children || []
  }
  // #endif

  runStep()
})

defineExpose({
  add,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-barrage`

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
  <view :class="classes" :style="props.customStyle">
    <view>
      <view :class="[`nut-barrage__slotBody${classTime}`]">
        <view
          v-for="(item, index) of danmuList"
          :key="`danmu${index}`"
          class="nut-barrage__item move"
          :class="[`nut-barrage__item${index}`]"
          :style="styleList[index]"
        >
          {{ item.length > 8 ? `${item.slice(0, 8)}...` : item }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
