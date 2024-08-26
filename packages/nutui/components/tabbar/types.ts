export interface TabbarContext {
  modelValue: number | string
  activeColor?: string
  unactiveColor?: string
  children: any[]
  changeIndex: (index: number, active: number | string) => void
}
