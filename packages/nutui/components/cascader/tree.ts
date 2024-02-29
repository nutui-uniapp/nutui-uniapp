import type { CascaderConfig, CascaderOption, CascaderValue } from './types'
import { eachTree, formatTree } from './helper'

class Tree {
  nodes: CascaderOption[]
  maxLevel: number
  readonly config: CascaderConfig

  constructor(nodes: CascaderOption[], config?: CascaderConfig) {
    this.config = {
      value: 'value',
      text: 'text',
      children: 'children',
      ...(config || {}),
    }
    const { nodes: newNodes, maxLevel } = formatTree(nodes, null, this.config)
    this.nodes = newNodes
    this.maxLevel = maxLevel
  }

  updateChildren(nodes: CascaderOption[], parent: CascaderOption | null): void {
    if (!parent)
      this.nodes = formatTree(nodes, null, this.config).nodes

    else
      parent.children = formatTree(nodes, parent, this.config).nodes
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

  isLeaf(node: CascaderOption, lazy: boolean, maxLevel: number): boolean {
    const { leaf } = node
    if (leaf != null)
      return leaf

    const { minLevel } = this.config
    if (minLevel != null && !lazy) {
      const hasChildren = Array.isArray(node.children) && Boolean(node.children.length)
      if (node.level! < minLevel - 1)
        return false
      else if (node.level! >= minLevel - 1 && !hasChildren)
        return true
    }

    return !lazy && maxLevel === node.level
  }

  hasChildren(node: CascaderOption, lazy: boolean, maxLevel: number): boolean {
    const isLeaf = this.isLeaf(node, lazy, maxLevel)
    if (lazy)
      return Array.isArray(node.children) && Boolean(node.children.length)
    return !isLeaf
  }
}

export default Tree
