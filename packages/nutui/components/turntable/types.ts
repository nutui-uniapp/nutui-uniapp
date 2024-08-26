export interface TPrizeItem {
  id: number | string
  prizeName: string
  prizeColor: string
  prizeImg: string
}

export interface TurnTableInst {
  rotateTurn: () => void
}
