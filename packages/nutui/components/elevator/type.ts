export interface ElevatorData {
  name: string
  id: number | string
  [key: string]: string | number
}

export interface ElevatorInst {
  scrollTo: (val: number) => void
}
