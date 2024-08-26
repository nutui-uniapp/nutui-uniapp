export interface TabbarContext {
  modelValue: number | string
  activeColor: string | undefined
  unactiveColor: string | undefined
  children: any[]
  changeIndex: (index: number, active: number | string) => void
}
