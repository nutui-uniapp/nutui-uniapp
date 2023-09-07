<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { PREFIX } from '../_constants'
import NutButton from '../button/button.vue'
import { useTranslate } from '../../locale'
import { useSelectorQuery } from '../_hooks'
import { signatureEmits, signatureProps } from './signature'

const props = defineProps(signatureProps)

const emit = defineEmits(signatureEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const { query } = useSelectorQuery(instance.proxy as any)

let points = reactive<any[]>([]) // 路径点集合

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${props.customClass}`]: props.customClass,
  }
})
const spcanvas: any = ref<HTMLElement | null>(null)
const canvasSetId: any = `spcanvas${new Date().getTime()}`
const state = reactive({
  canvasHeight: 0,
  canvasWidth: 0,
  ctx: null as unknown as UniNamespace.CanvasContext,
})

function startEventHandler(event: any) {
  event.preventDefault()

  const startX = event.changedTouches[0].x
  const startY = event.changedTouches[0].y
  const startPoint = { X: startX, Y: startY }
  points.push(startPoint)
  // 每次触摸开始，开启新的路径
  emit('start')
  state.ctx.beginPath()
  state.ctx.lineWidth = props.lineWidth
  state.ctx.strokeStyle = props.strokeStyle
}
const isDraw = ref(false)

function moveEventHandler(event: any) {
  event.preventDefault()

  isDraw.value = true

  const moveX = event.changedTouches[0].x
  const moveY = event.changedTouches[0].y
  const movePoint = { X: moveX, Y: moveY }
  points.push(movePoint) // 存点
  const len = points.length
  if (len >= 2)
    draw()

  emit('signing', event)
}

// 绘制路径
function draw() {
  const point1 = points[0]
  const point2 = points[1]
  points.shift()
  state.ctx.moveTo(point1.X, point1.Y)
  state.ctx.lineTo(point2.X, point2.Y)
  state.ctx.stroke()
  state.ctx.draw(true)
}

function endEventHandler(event: any) {
  event.preventDefault()
  points = []
  emit('end')
}
function leaveEventHandler(event: any) {
  event.preventDefault()
}
function clear() {
  state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight)
  state.ctx.closePath()
  state.ctx.draw(true)
  emit('clear')
  isDraw.value = false
}

function confirm() {
  onSave()
}

function onSave() {
  // TODO 微信小程序无法导出图片
  state.ctx.draw(true, () => {
    uni.canvasToTempFilePath({
      canvas: state.ctx,
      canvasId: canvasSetId,
      width: state.canvasWidth,
      height: state.canvasHeight,
      fileType: props.type,
      success(result) {
        const _canvas = !isDraw.value ? '请绘制签名' : state.ctx
        const _filePath = !isDraw.value ? '' : result.tempFilePath
        emit('confirm', _canvas, _filePath)
      },
      fail(result) {
        emit('confirm', result)
      },
    })
  })
}

onMounted(() => {
  query.select(`#${canvasSetId}`)
    .fields({ size: true }, (res: any) => {
      canvasSetting(res.width, res.height)
    })
    .exec()
})

function canvasSetting(width: number, height: number) {
  const dpr = uni.getSystemInfoSync().pixelRatio
  state.ctx = uni.createCanvasContext(canvasSetId, instance.proxy)
  state.canvasWidth = width * dpr
  state.canvasHeight = height * dpr
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-signature`
const { translate } = useTranslate(componentName)
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
  <div :class="classes">
    <div class="nut-signature-inner spcanvas_WEAPP">
      <!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-QQ || APP-NVUE  -->
      <canvas
        :id="canvasSetId"
        ref="spcanvas"
        class="spcanvas"
        type="2d"
        :canvasId="canvasSetId"
        :disable-scroll="true"
        @touchstart="startEventHandler"
        @touchmove="moveEventHandler"
        @touchend="endEventHandler"
        @touchleave="leaveEventHandler"
      />
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN || MP-ALIPAY || MP-QQ || APP-NVUE -->
      <canvas
        :id="canvasSetId"
        ref="spcanvas"
        class="spcanvas"
        :canvasId="canvasSetId"
        :disable-scroll="true"
        @touchstart="startEventHandler"
        @touchmove="moveEventHandler"
        @touchend="endEventHandler"
        @touchleave="leaveEventHandler"
      />
      <!-- #endif -->
    </div>
    <NutButton custom-class="nut-signature-btn" type="default" @click="clear()">
      {{ translate('reSign') }}
    </NutButton>
    <NutButton custom-class="nut-signature-btn" type="primary" @click="confirm()">
      {{ translate('confirm') }}
    </NutButton>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
