/**
  获取元素的大小及其相对于视口的位置，等价于 Element.getBoundingClientRect。
  width 宽度 number
  height 高度 number
  top 顶部与视图窗口左上角的距离 number
  left 左侧与视图窗口左上角的距离 number
  right 右侧与视图窗口左上角的距离 number
  bottom 底部与视图窗口左上角的距离 number
 */

import { type ComponentInternalInstance, nextTick } from 'vue'

export function useRect(id: string, instance: ComponentInternalInstance): any {
  return new Promise((resolve) => {
    nextTick(() => {
      uni
        .createSelectorQuery()
        // #ifndef MP-ALIPAY
        .in(instance)
        // #endif
        .select(`#${id}`)
        .boundingClientRect((res: any) => {
          resolve(res)
        })
        .exec()
    })
  })
}
