import type { ExtractPropTypes } from 'vue'

export const watermarkProps = {
  name: {
    type: String,
    default: '',
  },
  gapY: {
    type: Number,
    default: 48,
  },
  gapX: {
    type: Number,
    default: 24,
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  width: {
    type: Number,
    default: 120,
  },
  height: {
    type: Number,
    default: 64,
  },
  rotate: {
    type: Number,
    default: -22,
  },
  image: {
    type: String,
    default: '',
  },
  imageWidth: {
    type: Number,
    default: 120,
  },
  imageHeight: {
    type: Number,
    default: 64,
  },
  content: {
    type: String,
    default: '',
  },
  fontColor: {
    type: String,
    default: 'rgba(0,0,0,.15)',
  },
  fontStyle: {
    type: String,
    default: 'normal',
  },
  fontFamily: {
    type: String,
    default: 'PingFang SC',
  },
  fontWeight: {
    type: String,
    default: 'normal',
  },
  fontSize: {
    type: [String, Number],
    default: 14,
  },
  fullPage: {
    type: Boolean,
    default: '',
  },
}

export type WaterMarkProps = ExtractPropTypes<typeof watermarkProps>

export const watermarkEmits = {
  click: (val: Event) => true,
}

export type WaterMarkEmits = typeof watermarkEmits
