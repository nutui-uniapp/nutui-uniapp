import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { popupProps } from '../popup/popup'
import { type Interceptor, isBoolean } from '../_utils'

export type TextAlign = 'left' | 'center' | 'right' | 'top'
export type FooterDirection = 'horizontal' | 'vertical'
export const dialogProps = {
  ...popupProps,
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: [String, Object] as PropType<string>,
    default: '',
  },
  noFooter: {
    type: Boolean,
    default: false,
  },
  noOkBtn: {
    type: Boolean,
    default: false,
  },
  noCancelBtn: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: '',
  },
  okText: {
    type: String,
    default: '',
  },
  okAutoClose: {
    type: Boolean,
    default: true,
  },
  cancelAutoClose: {
    type: Boolean,
    default: true,
  },
  textAlign: {
    type: String as PropType<TextAlign>,
    default: 'center',
  },
  closeOnPopstate: {
    type: Boolean,
    default: false,
  },
  footerDirection: {
    type: String as PropType<FooterDirection>,
    default: 'horizontal', // vertical
  },
  customClass: {
    type: String,
    default: '',
  },
  popStyle: {
    type: Object as PropType<CSSProperties>,
  },
  beforeClose: Function as PropType<Interceptor>,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  'update': (val: boolean) => isBoolean(val),
  'update:visible': (val: boolean) => isBoolean(val),
  'ok': () => true,
  'cancel': () => true,
  'opened': () => true,
  'closed': () => true,
}

export type DialogEmits = typeof dialogEmits
