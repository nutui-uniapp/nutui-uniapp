export type EcardDataValue = number | string

export interface EcardDataItem {
  price: EcardDataValue
}

export interface EcardChangeEvent {
  price: EcardDataValue
}

export interface EcardUpdateOptions {
  /**
   * 选中项（从0开始的索引，-1表示选中输入框，null表示不选中）
   */
  index?: number | null
  /**
   * 其他面值（当index为-1或null时有效）
   */
  input?: string
  /**
   * 数量
   */
  count?: number
}

export interface EcardInst {
  /**
   * 更新面值
   *
   * @param options 配置项
   */
  update: (options: EcardUpdateOptions) => void
}
