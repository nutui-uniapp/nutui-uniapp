import type { ExtractPropTypes } from 'vue'

export const colProps = {
  span: {
    type: [String, Number],
    default: '24',
  },
  offset: {
    type: [String, Number],
    default: '0',
  },
}

export type ColProps = ExtractPropTypes<typeof colProps>
