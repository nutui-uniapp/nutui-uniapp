import type { ExtractPropTypes, PropType } from 'vue'

export type TagType = 'primary' | 'success' | 'danger' | 'warning'

export const tagProps = {
  customColor: { type: String, default: '' },
  textColor: { type: String, default: '' },
  type: {
    type: String as PropType<TagType>,
    default: 'default',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  mark: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
}

export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  click: (evt: any) => true,
  close: (evt: any) => true,

}

export type TagEmits = typeof tagEmits
