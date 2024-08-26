export interface TextareaAutosizeObject {
  /**
   * 最大高度
   */
  maxHeight?: number | string
  /**
   * 最小高度
   */
  minHeight?: number | string
}

export const textareaConfirmType = ['send', 'search', 'next', 'go', 'done', 'return'] as const
export type TextareaConfirmType = (typeof textareaConfirmType)[number]

export const textareaAdjustKeyboardTo = ['cursor', 'bottom']
export type TextareaAdjustKeyboardTo = (typeof textareaAdjustKeyboardTo)[number]
