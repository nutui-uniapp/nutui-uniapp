import { type ComponentInternalInstance, type SetupContext, computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { CLEAR_EVENT, CONFIRM_EVENT, PREFIX } from '../_constants'
import { useSelectorQuery } from '../_hooks'
import { getMainClass } from '../_utils'
import type { SignatureEmits, SignatureProps } from './signature'

export const componentName = `${PREFIX}-signature`

export function useSignature(props: SignatureProps, emit: SetupContext<SignatureEmits>['emit']) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const { query } = useSelectorQuery(instance.proxy as any)
  let points = reactive<any[]>([]) // 路径点集合

  const classes = computed(() => {
    return getMainClass(props, componentName)
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
    emit(CLEAR_EVENT)
    isDraw.value = false
  }

  function confirm() {
    onSave()
  }

  function onSave() {
    return new Promise<string>((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: canvasSetId,
        width: state.canvasWidth,
        height: state.canvasHeight,
        fileType: props.type,
        success(result) {
          const _canvas = !isDraw.value ? '请绘制签名' : state.ctx
          const _filePath = !isDraw.value ? '' : result.tempFilePath
          emit(CONFIRM_EVENT, _canvas, _filePath)

          resolve(_filePath)
        },
        fail(result) {
          reject(result)
          emit(CONFIRM_EVENT, result)
        },
      }, instance)
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

  return {
    classes,
    spcanvas,
    state,
    canvasSetId,
    componentName,
    startEventHandler,
    moveEventHandler,
    endEventHandler,
    leaveEventHandler,
    clear,
    confirm,
    onSave,
  }
}
