<script setup lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
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
} = toRefs(props)

async function init() {
  let ratio = 1
  uni.getSystemInfo({
    success(res) {
      ratio = res.pixelRatio
    },
  })
  const canvasWidth = `${(gapX.value + width.value) * ratio}`
  const canvasHeight = `${(gapY.value + height.value) * ratio}`
  const markWidth = width.value * ratio
  const markHeight = height.value * ratio
  const canvas: any = uni.createOffscreenCanvas({
    type: '2d',
    width: Number(canvasWidth),
    height: Number(canvasHeight),
  })

  const ctx: any = canvas.getContext('2d')

  if (ctx) {
    if (image?.value) {
      // 创建一个图片
      const img = canvas.createImage() as HTMLImageElement
      dealWithImage(ctx, img, ratio, ctx.canvas, markWidth, markHeight)
    }
    else if (content?.value) {
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
  const canvasWidth = `${(gapX.value + width.value) * ratio}px`
  const canvasHeight = `${(gapY.value + height.value) * ratio}px`
  const markWidth = width.value * ratio
  const markHeight = height.value * ratio
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)

  if (ctx) {
    if (image?.value) {
      const img = new Image()
      dealWithImage(ctx, img, ratio, canvas, markWidth, markHeight)
    }
    else if (content?.value) {
      dealWithText(ctx, ratio, canvas, markWidth, markHeight)
    }
  }
  else {
    throw new Error('当前环境不支持Canvas')
  }
}
function dealWithImage(ctx: any, img: HTMLImageElement, ratio: number, canvas: HTMLCanvasElement, markWidth: number, markHeight: number) {
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(rotate.value))
  img.crossOrigin = 'anonymous'
  img.referrerPolicy = 'no-referrer'
  img.src = image!.value! // 要加载的图片 url, 可以是base64
  img.onload = () => {
    ctx.drawImage(
      img,
      (-imageWidth.value * ratio) / 2,
      (-imageHeight.value * ratio) / 2,
      imageWidth.value * ratio,
      imageHeight.value * ratio,
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
  ctx.rotate((Math.PI / 180) * Number(rotate.value))
  const markSize = Number(fontSize.value) * ratio
  ctx.font = `${fontStyle.value} normal ${fontWeight.value} ${markSize}px/${markHeight}px ${fontFamily.value}`
  ctx.fillStyle = fontColor.value
  ctx.fillText(content?.value, 0, 0)
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
    zIndex.value,
    gapX.value,
    gapY.value,
    width.value,
    height.value,
    rotate.value,
    image?.value,
    imageWidth.value,
    imageHeight.value,
    content?.value,
    fontStyle.value,
    fontWeight.value,
    fontColor.value,
    fontSize.value,
    fontFamily.value,
  ],
  () => {
    // #ifdef H5
    initH5()
    // #endif

    // #ifndef H5
    init()
    // #endif
  },
)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}-full-page`]: props.fullPage,
  })
})
const styles = computed(() => {
  return getMainStyle(props, {
    zIndex: props.zIndex,
    backgroundSize: `${props.gapX + props.width}px`,
    backgroundImage: `url('${state.base64Url}')`,
  })
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
    :style="styles"
  />
</template>

<style lang="scss">
@import './index';
</style>
