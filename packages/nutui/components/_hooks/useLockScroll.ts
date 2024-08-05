let count = 0

const CLSNAME = 'nut-overflow-hidden'

export function useLockScroll(isLock: () => boolean) {
  const lock = () => {
    if (isLock()) {
      try {
        !count && document.body.classList.add(CLSNAME)
        count++
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  const unlock = () => {
    if (isLock() && count) {
      try {
        count--
        !count && document.body.classList.remove(CLSNAME)
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  return [lock, unlock]
}
