let globalZIndex = 2000

export function useGlobalZIndex() {
  return ++globalZIndex
}

export function setGlobalZIndex(value: number) {
  globalZIndex = value
}
