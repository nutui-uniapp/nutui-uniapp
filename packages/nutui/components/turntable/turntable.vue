<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import { getMainClass, getMainStyle, isH5, isMpWeixin } from '../_utils'
import { PREFIX } from '../_constants'
import { turntableEmits, turntableProps } from './turntable'
import type { TPrizeItem } from './type'

const props = defineProps(turntableProps)

const emit = defineEmits(turntableEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
defineExpose({ rotateTurn })
const {
  width,
  height,
  turnsNumber,
  styleOpt,
  turnsTime,
  pointerStyle,
  lockTime,
} = reactive(props)

let prizeList: TPrizeItem[] = reactive(props?.prizeList)

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const styles = computed(() => {
  return getMainStyle(props, { width, height })
})

// const getRandomColor = function () {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return "rgb(" + r + "," + g + "," + b + ")";
// };

// 用来锁定转盘，避免同时多次点击转动
const lock = ref(false)
// 是否正在转动
const rorating = ref(false)
// 剩余抽奖次数
// const num = ref(5);
// 开始转动的角度
const startRotateDegree = ref(0)
// 设置指针默认指向的位置,现在是默认指向2个扇形之间的边线上
const rotateAngle = ref<string>('0')
const rotateTransition = ref('')

const turntableDom = ref(null)
const canvasDom = ref(null)
const canvasDomEle = ref()
const _rorateDeg = ref(360 / prizeList.length)

// 根据index计算每一格要旋转的角度的样式
function getRotateAngle(index: number, flag?: string) {
  const angle = (360 / prizeList.length) * index + 180 / prizeList.length
  return {
    transform: `rotate(${angle}deg)${flag === 'canvas'
        && isH5
        ? ' scale(2)'
        : ''
      }`,
  }
}
// 初始化圆形转盘canvas
function init() {
  const data = styleOpt
  const prizeNum = prizeList.length
  const { prizeBgColors } = data
  // 开始绘画
  // const canvas = canvasDom.value;
  // const luckdraw = turntableDom.value;
  // const ctx = canvas.getContext('2d');
  const ctx = uni.createCanvasContext('canvasWx', instance.proxy)

  // const canvasW = Number(width.replace(/px/g, "")); // 画板的高度
  // const canvasH =
  //   Number(height.replace(/px/g, "")) / (envApp.value == "WEAPP" ? 1 : 2); // 画板的宽度
  const canvasW = Number.parseFloat(width) // 画板的高度
  const radis = isMpWeixin ? 1 : 2
  const canvasH = Number.parseFloat(height) / radis

  if (isMpWeixin) {
    // translate方法重新映射画布上的 (0,0) 位置
    ctx.translate(0, canvasH)
    // rotate方法旋转当前的绘图，因为文字是和当前扇形中心线垂直的
    ctx.rotate((-90 * Math.PI) / 180)
  }
  // 圆环的外圆的半径,可用来调整圆盘大小来适应外部盒子的大小
  // const outRadius = canvasW / 2 - 1;
  // 圆环的内圆的半径
  // const innerRadius = 0;
  const baseAngle = (Math.PI * 2) / prizeNum // 每个奖项所占角度数
  // ctx.clearRect(0, 0, canvasW, canvasH); //去掉背景默认色
  // ctx.strokeStyle = borderColor; // 设置画图线的颜色
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
    /* 随机颜色 */
    if (prizeList[index].prizeColor)
      ctx.fillStyle = prizeList[index].prizeColor // 设置每个扇形区域的颜色,根据每条数据中单独设置的优先
    else
      ctx.fillStyle = prizeBgColors[index] // 设置每个扇形区域的颜色

    ctx.fill()
  }
  ctx.draw()
}

// 判断是否可以转动
function canBeRotated() {
  // if (num.value <= 0) {
  //   return false;
  // }
  if (lock.value) {
    if (!rorating.value)
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
  }, lockTime * 1000)
}
function rotate(index: number) {
  const turnsTimeNum = turnsTime
  const rotateAngleValue
    = startRotateDegree.value
    + turnsNumber * 360
    + 360
    - (180 / prizeList.length + (360 / prizeList.length) * index)
    - (startRotateDegree.value % 360)
  startRotateDegree.value = rotateAngleValue
  rotateAngle.value = `rotate(${rotateAngleValue}deg)`
  rotateTransition.value = `transform ${turnsTimeNum}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`
  setTimeout(() => {
    emit('endTurns')
    rorating.value = false
    changeLock()
  }, turnsTimeNum * 1000 + 500)
}

function rotateTurn() {
  // 开始转动
  // 先上锁
  lock.value = true
  rorating.value = true
  setTimeout(() => {
    rotate(props.prizeIndex)
  }, 300)
}

watch(
  () => props.prizeList,
  (list) => {
    prizeList = list
    init()
  },
)

// watch(
//   () => props.prizeIndex,
//   (nIndex) => {
//     rotate(nIndex);
//   }
// );

onMounted(() => {
  setTimeout(() => {
    // #ifdef H5
    const canvasDom: HTMLElement | null
      = document.getElementById('canvasWx')
    canvasDomEle.value = canvasDom
    // #endif
    init()
  }, 800)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-turntable`

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
  <view ref="turntableDom" :class="classes" :style="styles">
    <view class="turntable" :style="{ transform: rotateAngle, transition: rotateTransition }">
      <canvas
        id="canvasWx" ref="canvasDom" type="2d" :class="isMpWeixin ? '' : 'mlcanvas'" canvas-id="canvasWx"
        :style="isMpWeixin ? '' : getRotateAngle(0, 'canvas')"
      />
      <!-- <canvas id="canvasWx" canvas-id="canvasWx" ref="canvasDom" type="2d" :style="getRotateAngle(0)">
      </canvas> -->
      <view v-if="prizeList.length > 0" class="prize">
        <view v-for="(item, index) of prizeList" :key="index" class="item" :style="getRotateAngle(index)">
          <view class="drawTable-name">
            {{ item.prizeName }}
          </view>
          <view class="drawTable-img">
            <image :src="item.prizeImg" />
          </view>
        </view>
      </view>
    </view>
    <view class="pointer" :style="pointerStyle" @click="startTurns" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
