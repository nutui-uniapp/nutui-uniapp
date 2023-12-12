import { pinia } from '../../../store'
import { isH5 } from '../../../utils/env'

interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

export const useAppStore = defineStore(
  'app',
  () => {
    // #ifdef H5
    const themeStorage = localStorage.getItem('vitepress-theme-appearance')
    // #endif
    const darkMode = ref(isH5 ? themeStorage !== 'light' : false)

    const statusBarHeight = ref(0)
    const menuButtonBounding = ref<MenuButtonBoundingClientRect>()
    const customBarHeight = computed(
      () => !menuButtonBounding.value
        ? 0
        : menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value,
    )
    // #ifdef H5
    watch(darkMode, (isDark) => {
      isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    }, {
      immediate: true,
    })
    // #endif
    return {
      darkMode,
      statusBarHeight,
      customBarHeight,
      menuButtonBounding,
    }
  },
)

export function useAppStoreWidthOut() {
  return useAppStore(pinia)
}
