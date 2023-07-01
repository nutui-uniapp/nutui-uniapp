import type { ExtractPropTypes, PropType } from 'vue'

interface VideosType {
  id: number | string
  mainUrl: string
  videoUrl: string
}
interface ImagesType {
  smallImgUrl: string
  bigImgUrl: string
  imgUrl: string
}
export const commentProps = {
  headerType: {
    type: String,
    default: 'default', // 头部展示风格 default，complex
  },

  imagesRows: {
    type: String,
    default: 'one', // 'one'  'multi'
  },

  ellipsis: {
    type: [String, Number, Boolean],
    default: false,
  },

  videos: {
    type: Array as PropType<VideosType[]>,
    default: () => [],
  },
  images: {
    type: Array as PropType<ImagesType[]>,
    default: () => [],
  },

  info: {
    type: Object,
    default: () => ({}),
  },

  follow: {
    type: Object,
    default: () => ({}),
  },

  labels: {
    type: Function,
    default: () => '',
  },

  operation: {
    type: Array as PropType<string[]>,
    default: ['replay', 'like', 'more'],
  },
}

export type CommentProps = ExtractPropTypes<typeof commentProps>

export const commentEmits = {
  click: (val: object) => true,
  clickOperate: (val: string) => true,
  clickImages: (val: any) => true,
}

export type CommentEmits = typeof commentEmits
