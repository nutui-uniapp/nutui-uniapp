<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, reactive, ref, useSlots, watch } from 'vue'
import { useSelectorQuery } from '../_hooks'
import { getMainClass } from '../_utils'
import { barrageProps } from './barrage'

const COMPONENT_NAME = 'nut-barrage'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(barrageProps)

const instance = getCurrentInstance()!

const { getSelectorNodeInfo } = useSelectorQuery(instance)

const classTime = new Date().getTime()

const slotDefault = !!useSlots().default

const timeId = ref(new Date().getTime())
const danmuList = ref<any>(props.danmu)
const rows = ref<number>(props.rows)
const top = ref<number>(props.top)
const speeds = props.speeds

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`nut-barrage--dmBody${timeId.value}`]: true,
  })
})

onMounted(() => {
  // #ifdef H5
  if (slotDefault) {
    const list = document
      .getElementsByClassName(`nut-barrage__slotBody${classTime}`)[0]
      .getElementsByClassName('nut-barrage__item')

    danmuList.value = list?.[0]?.children || []
  }
  // #endif

  runStep()
})

watch(
  () => props.danmu,
  (newValue) => {
    danmuList.value = [...newValue]
  },
)

function add(word: string) {
  danmuList.value = [...danmuList.value, word]

  runStep()
}

function getNode(index: number) {
  setTimeout(async () => {
    let width = 100
    const dmBodyNodeInfo = await getSelectorNodeInfo(`.nut-barrage--dmBody${timeId.value}`)
    width = dmBodyNodeInfo?.width || 300
    const itemNodeInfo = await getSelectorNodeInfo(`.nut-barrage__item${index}`)

    const height = itemNodeInfo?.height
    const nodeTop = `${(index % rows.value) * (height! + top.value) + 20}px`
    styleInfo(index, nodeTop, width)
  }, 500)
}

function runStep() {
  danmuList.value.forEach((item: any, index: number) => {
    getNode(index)
  })
}

const styleList: any[] = reactive([])

function styleInfo(index: number, nodeTop: string, width: number) {
  const timeIndex = index - rows.value > 0 ? index - rows.value : 0
  const list = styleList
  const time = list[timeIndex] ? Number(list[timeIndex]['--time']) : 0
  // distance.value = '-' + (speeds / 1000) * 200 + '%';

  const obj = {
    'top': nodeTop,
    '--time': `${props.frequency * index + time}`,
    'animationDuration': `${speeds}ms`,
    'animationIterationCount': `${props.loop ? 'infinite' : 1}`,
    'animationDelay': `${props.frequency * index + time}ms`,
    '--move-distance': `-${width}px`,
  }
  if (slotDefault && danmuList.value[index]?.el) {
    const orginalSty = danmuList.value[index].el.style
    danmuList.value[index].el.style = Object.assign(orginalSty, obj)
  }
  else {
    styleList.push(obj)
  }
}

defineExpose({
  add,
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
