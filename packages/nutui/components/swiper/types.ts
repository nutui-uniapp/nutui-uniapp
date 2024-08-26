export interface SwiperInst {
  /**
   * @description 切换到上一页
   */
  prev: () => void
  /**
   * @description 切换到下一页
   */
  next: () => void
  /**
   * @description 切换到指定轮播
   * @param index
   * @returns
   */
  to: (index: number) => void
}
