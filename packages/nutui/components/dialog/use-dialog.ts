import { type CSSProperties, type SetupContext, computed, onMounted, ref, watch } from 'vue'
import { funInterceptor, getMainClass } from '../_utils'
import { CANCEL_EVENT, CLOSED_EVENT, OPENED_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { DialogEmits, DialogProps } from './dialog'
import type { DialogOptions } from './type'

const componentName = `${PREFIX}-dialog`

export function useDialog(props: DialogProps, emit: SetupContext<DialogEmits>['emit']) {
  const showPopup = ref(props.visible)
  const dialogStatus = ref<DialogOptions>({
    title: props.title,
    content: props.content,
    cancelText: props.cancelText,
    okText: props.okText,
    textAlign: props.textAlign,
    footerDirection: props.footerDirection,
    noFooter: props.noFooter,
    noOkBtn: props.noOkBtn,
    noCancelBtn: props.noCancelBtn,
    transition: props.transition,
    closeOnClickOverlay: props.closeOnClickOverlay,
    okAutoClose: props.okAutoClose,
  })

  const showDialog = (options: DialogOptions) => {
    dialogStatus.value = {
      title: options.title || props.title,
      content: options.content || props.content,
      cancelText: options.cancelText || props.cancelText,
      okText: options.okText || props.okText,
      okAutoClose: options.okAutoClose || props.okAutoClose,
      textAlign: options.textAlign || props.textAlign,
      footerDirection: options.footerDirection || props.footerDirection,
      noFooter: options.noFooter || props.noFooter,
      noOkBtn: options.noOkBtn || props.noOkBtn,
      transition: options.transition || props.transition,
      noCancelBtn: options.noCancelBtn || props.noCancelBtn,
      closeOnClickOverlay: options.closeOnClickOverlay || props.closeOnClickOverlay,
    }
    showPopup.value = true
  }

  onMounted(() => {
    if (props.closeOnPopstate) {
      window.addEventListener('popstate', () => {
        closed('page')
      })
    }
  })

  watch(
    () => props.visible,
    (value) => {
      showPopup.value = value

      if (value)
        emit(OPENED_EVENT)
    },
  )

  const classes = computed(() => {
    return getMainClass(props, componentName)
  })

  function update(val: boolean) {
    emit('update', val)
    emit(UPDATE_VISIBLE_EVENT, val)
  }

  function closed(action?: string) {
    funInterceptor(props.beforeClose, {
      args: [action],
      done: () => {
        showPopup.value = false
        update(false)
        emit(CLOSED_EVENT)
      },
    })
  }

  function onCancel() {
    emit(CANCEL_EVENT)
    if (props.cancelAutoClose) {
      showPopup.value = false
      closed(CANCEL_EVENT)
    }
  }

  function onOk() {
    emit('ok')
    if (props.okAutoClose)
      closed('ok')
  }

  function onClickOverlay() {
    if (props.closeOnClickOverlay)
      closed('')
  }

  const contentStyle = computed(() => {
    return {
      textAlign: dialogStatus.value.textAlign,
    } as CSSProperties
  })

  return {
    contentStyle,
    showPopup,
    onClickOverlay,
    onCancel,
    onOk,
    closed,
    classes,
    showDialog,
    dialogStatus,
  }
}
