export interface NoticebarState {
  wrapWidth: number
  firstRound: boolean
  duration: number
  offsetWidth: number
  showNoticebar: boolean
  animationClass: string
  animate: boolean
  scrollList: any[]
  distance: number
  timer: NodeJS.Timeout | null
  keepAlive: boolean
  isCanScroll: boolean | null
  showNotice: boolean
  id: number
}
