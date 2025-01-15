<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { getMainClass, getMainStyle, isH5, isMpWeixin } from '../_utils'
import { turntableEmits, turntableProps } from './turntable'

const COMPONENT_NAME = 'nut-turntable'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(turntableProps)

const emit = defineEmits(turntableEmits)

const instance = getCurrentInstance()!

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed(() => {
  return getMainStyle(props, {
    width: props.width,
    height: props.height,
  })
})

// 用来锁定转盘，避免同时多次点击转动
const lock = ref(false)
// 是否正在转动
const rotating = ref(false)
// 开始转动的角度
const startRotateDegree = ref(0)
// 设置指针默认指向的位置,现在是默认指向2个扇形之间的边线上
const rotateAngle = ref('0')
const rotateTransition = ref('')

const innerStyles = computed(() => {
  return {
    transform: rotateAngle.value,
    transition: rotateTransition.value,
  }
})

const turntableDom = ref(null)
const canvasDom = ref(null)

// 根据index计算每一格要旋转的角度的样式
function getRotateAngle(index: number, flag?: string) {
  const angle = (360 / props.prizeList.length) * index + 180 / props.prizeList.length

  return {
    transform: `rotate(${angle}deg)${flag === 'canvas' && isH5 ? ' scale(2)' : ''}`,
  }
}

// 初始化圆形转盘canvas
function init() {
  // 开始绘画
  const ctx = uni.createCanvasContext('canvasWx', instance.proxy)

  const canvasW = Number.parseFloat(props.width) // 画板的高度

  const radius = isMpWeixin ? 1 : 2
  const canvasH = Number.parseFloat(props.height) / radius

  if (isMpWeixin) {
    // translate方法重新映射画布上的 (0,0) 位置
    ctx.translate(0, canvasH)
    // rotate方法旋转当前的绘图，因为文字是和当前扇形中心线垂直的
    ctx.rotate((-90 * Math.PI) / 180)
  }

  const prizeNum = props.prizeList.length

  const baseAngle = (Math.PI * 2) / prizeNum // 每个奖项所占角度数

  for (let index = 0; index < prizeNum; index++) {
    const startAngle = index * baseAngle
    const endAngle = (index + 1) * baseAngle

    ctx.beginPath()
    ctx.moveTo(canvasW / 2, canvasH / 2)
    ctx.arc(
      canvasW / 2,
      canvasH / 2,
      canvasH / 2,
      startAngle,
      endAngle,
      false,
    )

    // 随机颜色
    if (props.prizeList[index].prizeColor)
      ctx.fillStyle = props.prizeList[index].prizeColor // 设置每个扇形区域的颜色,根据每条数据中单独设置的优先
    else
      ctx.fillStyle = props.styleOpt.prizeBgColors[index] // 设置每个扇形区域的颜色

    ctx.fill()
  }

  ctx.draw()
}

// 判断是否可以转动
function canBeRotated() {
  if (lock.value) {
    if (!rotating.value)
      emit('lockTurns')

    return false
  }

  return true
}

function startTurns() {
  // 如果还不可以转动
  if (!canBeRotated())
    return false

  emit('startTurns')
}

// 转动起来
function changeLock() {
  setTimeout(() => {
    lock.value = false
  }, props.lockTime * 1000)
}

function rotate(index: number) {
  const turnsTimeNum = props.turnsTime
  const rotateAngleValue
    = startRotateDegree.value
      + props.turnsNumber * 360
      + 360
      - (180 / props.prizeList.length + (360 / props.prizeList.length) * index)
      - (startRotateDegree.value % 360)

  startRotateDegree.value = rotateAngleValue
  rotateAngle.value = `rotate(${rotateAngleValue}deg)`
  rotateTransition.value = `transform ${turnsTimeNum}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`

  setTimeout(() => {
    emit('endTurns')

    rotating.value = false

    changeLock()
  }, turnsTimeNum * 1000 + 500)
}

function rotateTurn() {
  // 开始转动
  // 先上锁
  lock.value = true
  rotating.value = true

  setTimeout(() => {
    rotate(props.prizeIndex)
  }, 300)
}

watch(() => props.prizeList, () => {
  init()
})

onMounted(() => {
  setTimeout(() => {
    init()
  }, 800)
})

defineExpose({
  rotateTurn,
})
</script>

<template>
  <view ref="turntableDom" :class="classes" :style="styles">
    <view class="turntable" :style="innerStyles">
      <canvas
        id="canvasWx"
        ref="canvasDom"
        :class="isMpWeixin ? '' : 'mlcanvas'"
        :style="isMpWeixin ? '' : getRotateAngle(0, 'canvas')"
        type="2d"
        canvas-id="canvasWx"
      />

      <view v-if="props.prizeList.length > 0" class="prize">
        <view
          v-for="(item, index) of props.prizeList"
          :key="index"
          class="item"
          :style="getRotateAngle(index)"
        >
          <view class="drawTable-name">
            {{ item.prizeName }}
          </view>

          <view class="drawTable-img">
            <image :src="item.prizeImg" />
          </view>
        </view>
      </view>
    </view>

    <view class="pointer" :style="props.pointerStyle" @click="startTurns" />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
