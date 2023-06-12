import { type CSSProperties, type SetupContext, computed, onMounted, ref, watch } from 'vue'
import { PREFIX, funInterceptor } from '../_utils'
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
  })

  const showDialog = (options: DialogOptions) => {
    dialogStatus.value = {
      title: options.title || props.title,
      content: options.content || props.content,
      cancelText: options.cancelText || props.cancelText,
      okText: options.okText || props.okText,
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
        emit('opened')
    },
  )

  const classes = computed(() => {
    return {
      [componentName]: true,
      [props.customClass]: true,
    }
  })

  function update(val: boolean) {
    emit('update', val)
    emit('update:visible', val)
  }

  function closed(action?: string) {
    funInterceptor(props.beforeClose, {
      args: [action],
      done: () => {
        showPopup.value = false
        update(false)
        emit('closed')
      },
    })
  }

  function onCancel() {
    emit('cancel')
    if (props.cancelAutoClose) {
      showPopup.value = false
      closed('cancel')
    }
  }

  function onOk() {
    emit('ok')
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
