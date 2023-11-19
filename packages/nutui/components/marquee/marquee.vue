<script setup lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { marqueeEmits, marqueeProps } from './marquee'

const props = defineProps(marqueeProps)

const emit = defineEmits(marqueeEmits)
let { prizeList, styleOpt } = reactive(props)

const classes = computed(() => {
  return getMainClass(props, componentName)
})

onMounted(() => {
  // init();
})

watch(
  () => props.prizeList,
  (list, prevList) => {
    prizeList = list
  },
)

const marqueeDom: any = ref(null)
// 上锁
const lock = ref(false)
// 转动到的商品的index
const index = ref(0)
// 转动跑格子次数
const cellNumber = ref(0)
// 初始速度
const velocity = ref(+props.speed)
// 至少需要转动多少次再进入抽奖环节
const cycle = ref(props.circle)
// 转动定时器
const timer = ref<any>(null)

const bgContentStyle = styleOpt.bgStyle
const bgItemStyle = styleOpt.itemStyle
const cursorStyle = styleOpt.startStyle

// 每次转动
function rollMarquee() {
  cellNumber.value += 1
  let idx = index.value // 当前转动到哪个位置
  const count = 8 // 总共有多少个位置
  idx += 1
  if (idx > count - 1)
    idx = 0

  index.value = idx
  getPrize()
}

function getPrize() {
  // 当前转动次数符合条件 && 转动到中奖位置
  if (cellNumber.value > +cycle.value && props.prizeIndex === index.value) {
    clearTimeout(timer.value) // 清除转动定时器
    // 恢复默认值和初始值
    timer.value = 0
    cellNumber.value = 0
    velocity.value = +props.speed
    cycle.value = props.circle
    setTimeout(() => {
      index.value = +props.prizeIndex
      emit('endTurns')
      lock.value = false
    }, 500)
  }
  else {
    if (cellNumber.value < +cycle.value)
      velocity.value -= 4
    else
      velocity.value += 20

    // 开始转动抽奖
    timer.value = setTimeout(rollMarquee, velocity.value)
  }
}

function startDraw() {
  if (!lock.value) {
    lock.value = true
    emit('startTurns')
    rollMarquee()
  }
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-marquee`

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
  <view ref="marqueeDom" :class="classes" :style="customStyle">
    <view class="bgContent" />
    <view class="marqueeBg" :style="bgContentStyle" />
    <view class="start" :class="[{ disabledDraw: lock }]" :style="cursorStyle" @click="startDraw" />
    <ul class="gift-list">
      <li
        v-for="(item, i) in prizeList"
        :key="`luckmarquee${i}`" class="gift-item" :class="[`gift-${i + 1}`, { active: index === i }]"
        :style="bgItemStyle"
      >
        <div class="gift-img">
          <image :src="item.prizeImg" />
        </div>
        <span class="desc" v-html="item.prizeName" />
      </li>
    </ul>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
