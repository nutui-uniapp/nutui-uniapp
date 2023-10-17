<script setup lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
import { PREFIX } from '../_constants'
import { watermarkEmits, watermarkProps } from './watermark'

const props = defineProps(watermarkProps)
defineEmits(watermarkEmits)

const state = reactive({
  base64Url: '',
})
const {
  zIndex,
  gapX,
  gapY,
  width,
  height,
  rotate,
  image,
  imageWidth,
  imageHeight,
  content,
  fontStyle,
  fontWeight,
  fontColor,
  fontSize,
  fontFamily,
} = props

async function init() {
  let ratio = 1
  uni.getSystemInfo({
    success(res) {
      ratio = res.pixelRatio
    },
  })
  const canvasWidth = `${(gapX + width) * ratio}`
  const canvasHeight = `${(gapY + height) * ratio}`
  const markWidth = width * ratio
  const markHeight = height * ratio
  const canvas: any = uni.createOffscreenCanvas({
    type: '2d',
    width: Number(canvasWidth),
    height: Number(canvasHeight),
  })

  const ctx: any = canvas.getContext('2d')

  if (ctx) {
    if (image) {
      // 创建一个图片
      const img = canvas.createImage() as HTMLImageElement
      dealWithImage(ctx, img, ratio, ctx.canvas, markWidth, markHeight)
    }
    else if (content) {
      dealWithText(ctx, ratio, ctx.canvas, markWidth, markHeight)
    }
  }
  else {
    throw new Error('当前环境不支持Canvas')
  }
}
function initH5() {
  const canvas = document.createElement('canvas')
  const ratio = window.devicePixelRatio
  const ctx = canvas.getContext('2d')
  const canvasWidth = `${(gapX + width) * ratio}px`
  const canvasHeight = `${(gapY + height) * ratio}px`
  const markWidth = width * ratio
  const markHeight = height * ratio
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)

  if (ctx) {
    if (image) {
      const img = new Image()
      dealWithImage(ctx, img, ratio, canvas, markWidth, markHeight)
    }
    else if (content) {
      dealWithText(ctx, ratio, canvas, markWidth, markHeight)
    }
  }
  else {
    throw new Error('当前环境不支持Canvas')
  }
}
function dealWithImage(ctx: any, img: HTMLImageElement, ratio: number, canvas: HTMLCanvasElement, markWidth: number, markHeight: number) {
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  img.crossOrigin = 'anonymous'
  img.referrerPolicy = 'no-referrer'
  img.src = image // 要加载的图片 url, 可以是base64
  img.onload = () => {
    ctx.drawImage(
      img,
      (-imageWidth * ratio) / 2,
      (-imageHeight * ratio) / 2,
      imageWidth * ratio,
      imageHeight * ratio,
    )
    ctx.restore()
    state.base64Url = canvas.toDataURL()
  }
}
function dealWithText(ctx: any, ratio: number, canvas: HTMLCanvasElement, markWidth: number, markHeight: number) {
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  // 文字绕中间旋转
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  const markSize = Number(fontSize) * ratio
  ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`
  ctx.fillStyle = fontColor
  ctx.fillText(content, 0, 0)
  ctx.restore()
  state.base64Url = canvas.toDataURL()
}
// #ifdef H5
initH5()
// #endif

// #ifndef H5
init()
// #endif

watch(
  () => [
    zIndex,
    gapX,
    gapY,
    width,
    height,
    rotate,
    image,
    imageWidth,
    imageHeight,
    content,
    fontStyle,
    fontWeight,
    fontColor,
    fontSize,
    fontFamily,
  ],
  () => {
    init()
  },
)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}-full-page`]: props.fullPage,
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-watermark`

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
  <view
    :class="classes"
    :style="{
      zIndex,
      backgroundSize: `${gapX + width}px`,
      backgroundImage: `url('${state.base64Url}')`,
    }"
  />
</template>

<style lang="scss">
@import './index';
</style>
