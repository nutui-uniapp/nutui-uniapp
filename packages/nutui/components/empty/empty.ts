import type { ExtractPropTypes, PropType } from 'vue'

export type EmptyImage = 'empty' | 'error' | 'network' | string

export const emptyProps = {
  image: {
    type: String as PropType<EmptyImage>,
    default: 'empty', // 默认empty
  },
  imageSize: {
    type: [Number, String], // 图片大小，正方形
    default: '',
  },
  description: {
    type: String, // 文字区
    default: '',
  },
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
