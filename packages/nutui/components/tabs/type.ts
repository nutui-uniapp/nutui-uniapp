export interface provideData {
  children: any[]
  size: string
  modelValue: string | number
  unactiveColor: string
  activeColor: string
  dot: boolean
  changeIndex: (index: number, active: number | string) => void
}
