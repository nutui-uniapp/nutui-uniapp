import type { FormItemRule } from '../formitem/types'

export interface FormRules {
  [key: string]: FormItemRule[]
}

export interface FormRule {
  prop: string
  rules: FormItemRule[]
}

export interface ErrorMessage {
  prop: string
  message: string
}

export interface FormInst {
  /**
   * @description 清空校验结果
   */
  reset: () => void
  /**
   * @description 提交表单进行校验的方法
   */
  submit: () => void
  /**
   * @description 用户主动触发校验，用于用户自定义场景时触发，例如 `blur`、`change` 事件 | 同 `FormItem prop` 值,不传值会校验全部 `Rule`
   */
  validate: (customProp?: any) => Promise<any>
}
