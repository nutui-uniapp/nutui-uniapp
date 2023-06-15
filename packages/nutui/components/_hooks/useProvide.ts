import { getCurrentInstance, markRaw, provide, shallowReactive } from 'vue'
import type {
  ComponentInternalInstance,
  ConcreteComponent,
  InjectionKey,
  VNode,
  VNodeNormalizedChildren,
} from 'vue'

// TODO: uniapp 不支持 vue 直接导出的 isVNode
export function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function flattenVNodes(shouldTraverseChildren: VNodeNormalizedChildren, childName?: string) {
  const result: VNode[] = []

  const traverse = (children: VNodeNormalizedChildren) => {
    if (!Array.isArray(children))
      return
    children.forEach((child) => {
      if (!isVNode(child))
        return

      if (childName) {
        if (child.type && (child.type as ConcreteComponent).name === childName) {
          result.push(child)
          return
        }
      }
      else {
        result.push(child)
      }

      if (child.component?.subTree)
        traverse(child.component.subTree.children)

      if (child.children)
        traverse(child.children)
    })
  }

  traverse(shouldTraverseChildren)

  return result
}

export function sortChildren(
  parent: ComponentInternalInstance,
  internalChildren: ComponentInternalInstance[],
  childName?: string,
) {
  const vnodes = flattenVNodes(parent && parent.subTree && parent.subTree.children, childName)
  internalChildren.sort((a, b) => {
    return vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode)
  })
}

// 如果指定组件名称，则只查找此组件并且查到后结束。也就是不关心此组件下的内容，在大部分场景下节省查找消耗。
export function useProvide<ProvideValue>(key: InjectionKey<ProvideValue>, childName?: string) {
  const internalChildren: ComponentInternalInstance[] = shallowReactive([])
  const parent = getCurrentInstance()!

  const add = (child: ComponentInternalInstance) => {
    if (!child.proxy)
      return
    internalChildren.push(markRaw(child))
    sortChildren(parent, internalChildren, childName)
  }

  const remove = (child: ComponentInternalInstance) => {
    internalChildren.splice(internalChildren.indexOf(markRaw(child)), 1)
  }

  return (value?: ProvideValue) => {
    provide(key, {
      add,
      remove,
      internalChildren,
      ...value,
    } as any)

    return {
      internalChildren,
    }
  }
}
