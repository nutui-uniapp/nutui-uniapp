import { computed, normalizeClass, normalizeStyle } from 'vue'
import { stringifyStyle } from '../_utils'

export function useStyleContext(props: any, componentName: string) {
  const mainClass = computed(() => {
    const cls = normalizeClass([props.customClass, { [componentName]: true }])

    return cls
  })

  const mainStyle = computed(() => {
    return stringifyStyle(normalizeStyle(props.customStyle))
  })

  const getMainClass = (cls: unknown) => {
    return normalizeClass([props.customClass, { [componentName]: true }, cls])
  }

  const getMainStyle = (style: unknown) => {
    return stringifyStyle(normalizeStyle([props.customStyle, style]))
  }

  return {
    mainClass,
    mainStyle,
    getMainClass,
    getMainStyle,
  }
}
