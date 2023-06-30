export interface ElevatorData {
  name?: string
  id?: number | string
  [key: string]: any
}

export interface ElevatorInst {
  scrollTo: (val: number) => void
}
