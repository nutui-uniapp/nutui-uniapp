import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

const { theme } = uni.getSystemInfoSync()

export const signatureProps = {
  ...commonProps,
  lineWidth: {
    type: Number,
    default: 2,
  },
  strokeStyle: {
    type: String,
    default: '#000',
  },
  type: {
    type: String,
    default: 'png',
  },
  unSupportTpl: {
    type: String,
    default: '',
  },
}

export type SignatureProps = ExtractPropTypes<typeof signatureProps>

export const signatureEmits = {
  start: () => true,
  end: () => true,
  signing: (event: any) => true,
  confirm: (_canvas: any, _filePath?: string) => true,
  clear: () => true,
}

export type SignatureEmits = typeof signatureEmits
