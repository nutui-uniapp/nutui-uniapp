export interface CountdownInst {
  /**
   * @description 开始倒计时
   */
  start: () => void
  /**
   * @description 暂停倒计时
   */
  pause: () => void
  /**
   * @description 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时
   */
  reset: () => void
}
