import type { SetupContext } from 'vue'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { CLEAR_EVENT, CONFIRM_EVENT } from '../_constants'
import { useSelectorQuery } from '../_hooks'
import { getMainClass } from '../_utils'
import type { SignatureEmits, SignatureProps } from './signature'

const COMPONENT_NAME = 'nut-signature'

export function useSignature(props: SignatureProps, emit: SetupContext<SignatureEmits>['emit']) {
  const instance = getCurrentInstance()!

  const { query } = useSelectorQuery(instance)

  const spcanvas = ref<HTMLElement | null>(null)

  const canvasSetId = `spcanvas${new Date().getTime()}`

  const points: { x: number, y: number }[] = []

  const classes = computed(() => {
    return getMainClass(props, COMPONENT_NAME)
  })

  const state = reactive({
    canvasHeight: 0,
    canvasWidth: 0,
    ctx: null as unknown as UniNamespace.CanvasContext,
  })

  const isDrawing = ref(false)

  function draw() {
    const [point1, point2] = points

    points.shift()

    state.ctx.moveTo(point1.x, point1.y)
    state.ctx.lineTo(point2.x, point2.y)
    state.ctx.stroke()
    state.ctx.draw(true)
  }

  function clear() {
    state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight)
    state.ctx.closePath()
    state.ctx.draw(true)

    emit(CLEAR_EVENT)

    isDrawing.value = false
  }

  function startEventHandler(event: any) {
    event.preventDefault()

    points.push({
      x: event.changedTouches[0].x,
      y: event.changedTouches[0].y,
    })

    emit('start')

    state.ctx.beginPath()
    state.ctx.lineWidth = props.lineWidth
    state.ctx.strokeStyle = props.strokeStyle
  }

  function moveEventHandler(event: any) {
    event.preventDefault()

    isDrawing.value = true

    points.push({
      x: event.changedTouches[0].x,
      y: event.changedTouches[0].y,
    })

    if (points.length >= 2)
      draw()

    emit('signing', event)
  }

  function endEventHandler(event: any) {
    event.preventDefault()

    points.splice(0)

    emit('end')
  }

  function leaveEventHandler(event: any) {
    event.preventDefault()
  }

  function onSave() {
    return new Promise<string>((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: canvasSetId,
        width: state.canvasWidth,
        height: state.canvasHeight,
        fileType: props.type,
        success(result) {
          const _canvas = !isDrawing.value ? '请绘制签名' : state.ctx
          const _filePath = !isDrawing.value ? '' : result.tempFilePath

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

  function confirm() {
    onSave()
  }

  function canvasSetting(width: number, height: number) {
    const dpr = uni.getSystemInfoSync().pixelRatio

    state.ctx = uni.createCanvasContext(canvasSetId, instance.proxy)
    state.canvasWidth = width * dpr
    state.canvasHeight = height * dpr
  }

  onMounted(() => {
    query.select(`#${canvasSetId}`)
      .fields({ size: true }, (res: any) => {
        canvasSetting(res.width, res.height)
      })
      .exec()
  })

  return {
    classes,
    spcanvas,
    state,
    canvasSetId,
    COMPONENT_NAME,
    startEventHandler,
    moveEventHandler,
    endEventHandler,
    leaveEventHandler,
    clear,
    confirm,
    onSave,
  }
}
