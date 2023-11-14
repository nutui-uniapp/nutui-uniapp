/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 * copy from https://github.com/youzan/vant/blob/main/packages/vant/src/utils/props.ts
 */
import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const,
}

export function makeRequiredProp<T>(type: T) {
  return {
    type,
    required: true as const,
  }
}

export function makeArrayProp<T>(defaultVal: T[] = []) {
  return {
    type: Array as PropType<T[]>,
    default: () => defaultVal,
  }
}

export function makeObjectProp<T>(defaultVal: T) {
  return {
    type: Object as PropType<T>,
    default: () => defaultVal,
  }
}

export function makeNumberProp<T>(defaultVal: T) {
  return {
    type: Number,
    default: defaultVal,
  }
}

export function makeNumericProp<T>(defaultVal: T) {
  return {
    type: numericProp,
    default: defaultVal,
  }
}

export function makeStringProp<T>(defaultVal: T) {
  return {
    type: String as unknown as PropType<T>,
    default: defaultVal,
  }
}

export type ClassType = string | object | Array<ClassType>

export const commonProps = {
  /**
   * @description 自定义类名
   */
  customClass: {
    type: [String, Object, Array] as PropType<ClassType>,
    default: '',
  },
  /**
   * @description 自定义样式
   */
  customStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
}

export type CommonProps = ExtractPropTypes<typeof commonProps>
