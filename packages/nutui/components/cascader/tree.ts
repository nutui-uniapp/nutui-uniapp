import { eachTree, formatTree } from './helper'
import type { CascaderConfig, CascaderOption, CascaderValue } from './types'

class Tree {
  nodes: CascaderOption[]
  readonly config: CascaderConfig

  constructor(nodes: CascaderOption[], config?: CascaderConfig) {
    this.config = {
      value: 'value',
      text: 'text',
      children: 'children',
      ...(config || {}),
    }
    this.nodes = formatTree(nodes, null, this.config)
  }

  updateChildren(nodes: CascaderOption[], parent: CascaderOption | null): void {
    if (!parent)
      this.nodes = formatTree(nodes, null, this.config)

    else
      parent.children = formatTree(nodes, parent, this.config)
  }

  // for test
  getNodeByValue(value: CascaderOption['value']): CascaderOption | void {
    let foundNode
    eachTree(this.nodes, (node: CascaderOption) => {
      if (node.value === value) {
        foundNode = node
        return true
      }
    })

    return foundNode
  }

  getPathNodesByValue(value: CascaderValue): CascaderOption[] {
    if (!value.length)
      return []

    const pathNodes = []
    let currentNodes: CascaderOption[] | void = this.nodes

    while (currentNodes && currentNodes.length) {
      const foundNode: CascaderOption | void = currentNodes.find(node => node.value === value[node.level as number])

      if (!foundNode)
        break

      pathNodes.push(foundNode)
      currentNodes = foundNode.children
    }

    return pathNodes
  }

  isLeaf(node: CascaderOption, lazy: boolean): boolean {
    const { leaf, children } = node
    const hasChildren = Array.isArray(children) && Boolean(children.length)

    return leaf == null ? !hasChildren && !lazy : leaf
  }

  hasChildren(node: CascaderOption, lazy: boolean): boolean {
    if (lazy)
      return Array.isArray(node.children) && Boolean(node.children.length)
    return !this.isLeaf(node, lazy)
  }
}

export default Tree
