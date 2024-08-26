<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { getMainClass, getMainStyle } from '../_utils'
import { watermarkProps } from './watermark'

const COMPONENT_NAME = 'nut-watermark'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(watermarkProps)

const state = reactive({
  base64Url: '',
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}-full-page`]: props.fullPage,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    zIndex: props.zIndex,
    backgroundSize: `${props.gapX + props.width}px`,
    backgroundImage: `url('${state.base64Url}')`,
  })
})

async function init() {
  const ratio = uni.getSystemInfoSync().pixelRatio

  const canvasWidth = `${(props.gapX + props.width) * ratio}`
  const canvasHeight = `${(props.gapY + props.height) * ratio}`

  const markWidth = props.width * ratio
  const markHeight = props.height * ratio

  const canvas: any = uni.createOffscreenCanvas({
    type: '2d',
    width: Number(canvasWidth),
    height: Number(canvasHeight),
  })

  const ctx = canvas.getContext('2d')

  if (ctx) {
    if (props.image) {
      const image = canvas.createImage()

      drawWithImage(ctx, image, ratio, ctx.canvas, markWidth, markHeight)
    }
    else if (props.content) {
      drawWithText(ctx, ratio, ctx.canvas, markWidth, markHeight)
    }
  }
  else {
    throw new Error('当前环境不支持Canvas')
  }
}

function initH5() {
  const ratio = window.devicePixelRatio

  const canvasWidth = `${(props.gapX + props.width) * ratio}px`
  const canvasHeight = `${(props.gapY + props.height) * ratio}px`

  const markWidth = props.width * ratio
  const markHeight = props.height * ratio

  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)

  const ctx = canvas.getContext('2d')

  if (ctx) {
    if (props.image) {
      const image = new Image()

      drawWithImage(ctx, image, ratio, canvas, markWidth, markHeight)
    }
    else if (props.content) {
      drawWithText(ctx, ratio, canvas, markWidth, markHeight)
    }
  }
  else {
    throw new Error('当前环境不支持Canvas')
  }
}

function drawWithImage(
  ctx: any,
  img: HTMLImageElement,
  ratio: number,
  canvas: HTMLCanvasElement,
  markWidth: number,
  markHeight: number,
) {
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(props.rotate))

  img.crossOrigin = 'anonymous'
  img.referrerPolicy = 'no-referrer'
  img.src = props.image!
  img.onload = () => {
    ctx.drawImage(
      img,
      (-props.imageWidth * ratio) / 2,
      (-props.imageHeight * ratio) / 2,
      props.imageWidth * ratio,
      props.imageHeight * ratio,
    )
    ctx.restore()

    state.base64Url = canvas.toDataURL()
  }
}

function drawWithText(ctx: any, ratio: number, canvas: HTMLCanvasElement, markWidth: number, markHeight: number) {
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // 文字绕中间旋转
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(props.rotate))

  const markSize = Number(props.fontSize) * ratio
  ctx.font = `${props.fontStyle} normal ${props.fontWeight} ${markSize}px/${markHeight}px ${props.fontFamily}`
  ctx.fillStyle = props.fontColor

  if (Array.isArray(props.content)) {
    props.content.forEach((item, index) => {
      ctx.fillText(item, 0, (index - 1) * markSize)
    })
  }
  else {
    ctx.fillText(props.content, 0, 0)
  }
  ctx.restore()

  state.base64Url = canvas.toDataURL()
}

watch(() => [
  props.zIndex,
  props.gapX,
  props.gapY,
  props.width,
  props.height,
  props.rotate,
  props.image,
  props.imageWidth,
  props.imageHeight,
  props.content,
  props.fontStyle,
  props.fontWeight,
  props.fontColor,
  props.fontSize,
  props.fontFamily,
], () => {
  // #ifdef H5
  initH5()
  // #endif

  // #ifndef H5
  init()
  // #endif
})

onMounted(() => {
  // #ifdef H5
  initH5()
  // #endif

  // #ifndef H5
  init()
  // #endif
})
</script>

<template>
  <view :class="classes" :style="styles" />
</template>

<style lang="scss">
@import "./index";
</style>
