<script setup lang="ts">
import { useAppStore } from './store'

const { darkMode, statusBarHeight, menuButtonBounding } = storeToRefs(useAppStore())
onLaunch(() => {
  // #ifdef MP-WEIXIN || MP-QQ
  const systemInfo = uni.getSystemInfoSync()
  // the systemInfo.theme is only support dark mode in WeChat and QQ
  darkMode.value = systemInfo?.theme === 'dark'

  statusBarHeight.value = systemInfo!.statusBarHeight || 44
  menuButtonBounding.value = uni.getMenuButtonBoundingClientRect()
  uni.onThemeChange((res: UniApp.OnThemeChangeCallbackResult) => darkMode.value = res.theme === 'dark')
  // #endif

  // #ifdef H5
  statusBarHeight.value = 0
  menuButtonBounding.value = { width: 87, height: 32, left: 281, top: 4, right: 368, bottom: 36 }
  // #endif

  // #ifdef H5
  if (window.parent !== window.self) {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'theme')
        darkMode.value = e.data.data === 'dark'
    })
  }
  // #endif
})
onShow(() => {
})
onHide(() => {
})
</script>

<style lang="scss">
@import 'nutui-uniapp/styles/index';

/* #ifdef H5 */
html.dark {
  --UI-BG-CLOLOR-ACTIVE: #373737;
  --UI-BORDER-CLOLOR-1: #373737;
  --UI-BG: #000;
  --UI-BG-0: #191919;
  --UI-BG-1: #1f1f1f;
  --UI-BG-2: #232323;
  --UI-BG-3: #2f2f2f;
  --UI-BG-4: #606060;
  --UI-BG-5: #2c2c2c;
  --UI-FG: #fff;
  --UI-FG-0: hsl(0deg 0% 100% / 80%);
  --UI-FG-HALF: hsl(0deg 0% 100% / 60%);
  --UI-FG-1: hsl(0deg 0% 100% / 50%);
  --UI-FG-2: hsl(0deg 0% 100% / 30%);
  --UI-FG-3: hsl(0deg 0% 100% / 5%);
}

/* #endif */
</style>
