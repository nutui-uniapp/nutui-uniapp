import type { ExtractPropTypes } from 'vue'

export const loadingpageProps = {
  loadingText: {
    type: [String, Number],
    default: '正在加载',
  },
  image: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // 背景色
  bgColor: {
    type: String,
    default: '#ffffff',
  },
  customColor: {
    type: String,
    default: '#C8C8C8',
  },
  fontSize: {
    type: [String, Number],
    default: 19,
  },
  iconSize: {
    type: [String, Number],
    default: 28,
  },
  loadingColor: {
    type: String,
    default: '#C8C8C8',
  },
  zIndex: {
    type: Number,
    default: 9999,
  },
}

export type LoadingPageProps = ExtractPropTypes<typeof loadingpageProps>
