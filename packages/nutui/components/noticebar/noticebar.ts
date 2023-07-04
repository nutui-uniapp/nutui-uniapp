import type { ExtractPropTypes } from 'vue'

export interface stateProps {
  wrapWidth: number
  firstRound: boolean
  duration: number
  offsetWidth: number
  showNoticebar: boolean
  animationClass: string
  animate: boolean
  scrollList: never[]
  distance: number
  timer: null
  keepAlive: boolean
  isCanScroll: null | boolean
  showNotica: boolean
  id: number
}

export const noticebarProps = {
  // 滚动方向  across 横向 vertical 纵向
  direction: {
    type: String,
    default: 'across',
  },
  list: {
    type: Array,
    default: () => {
      return []
    },
  },
  standTime: {
    type: Number,
    default: 1000,
  },
  complexAm: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 40,
  },
  text: {
    type: String,
    default: '',
  },
  closeMode: {
    type: Boolean,
    default: false,
  },
  wrapable: {
    type: Boolean,
    default: false,
  },
  leftIcon: {
    type: Boolean,
    default: true,
  },
  customColor: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '',
  },
  delay: {
    type: [String, Number],
    default: 1,
  },
  scrollable: {
    type: Boolean,
    default: null,
  },
  speed: {
    type: Number,
    default: 50,
  },
}

export type NoticeBarProps = ExtractPropTypes<typeof noticebarProps>

export const noticebarEmits = {
  click: (evt: Event) => true,
  close: (evt: Event) => true,
  acrossEnd: (evt: Event) => true,

}

export type NoticeBarEmits = typeof noticebarEmits
