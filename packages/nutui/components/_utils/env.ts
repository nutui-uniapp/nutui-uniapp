const processShim: typeof process
  = typeof process !== 'undefined' ? process : ({} as typeof process)
const envShim = processShim.env || ({} as typeof process.env)

type PLATFORM =
  | 'h5'
  | 'app'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-kuaishou'
  | 'mp-lark'
  | 'mp-qq'
  | 'mp-toutiao'
  | 'mp-weixin'
  | 'quickapp-webview'
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union'

/** Value of `process.env.UNI_PLATFORM` */
export const platform = envShim.UNI_PLATFORM as PLATFORM

/** Value of `process.env.UNI_UTS_PLATFORM` */
export const utsPlatform = envShim.UNI_UTS_PLATFORM as
  | PLATFORM
  | 'app-android'
  | 'app-ios'
  | 'web'

/** Value of `process.env.UNI_APP_PLATFORM` */
export const appPlatform = envShim.UNI_APP_PLATFORM as
  | 'android'
  | 'ios'
  | undefined

/** Value of `process.env.UNI_SUB_PLATFORM` */
export const subPlatform = envShim.UNI_SUB_PLATFORM as
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union'
  | undefined

/** Value of `process.env.UNI_CLI_CONTEXT` */
export const cliContext = envShim.UNI_CLI_CONTEXT as string

/** Value of `process.env.UNI_INPUT_DIR` */
export const inputDir = envShim.UNI_INPUT_DIR as string

/** Value of `process.env.UNI_OUTPUT_DIR` */
export const outputDir = envShim.UNI_OUTPUT_DIR as string

/** Detect if `VUE_APP_DARK_MODE` environment variable is set */
export const hasDarkMode = toBoolean(envShim.VUE_APP_DARK_MODE)

/** Detect if `SOURCEMAP` environment variable is set */
export const hasSourcemap = toBoolean(envShim.SOURCEMAP)

/** Value of `process.env.UNI_COMPILER` */
export const compiler = envShim.UNI_COMPILER as 'vue' | 'nvue'

/** Value of `process.env.UNI_NVUE_COMPILER` */
export const nvueCompiler = envShim.UNI_NVUE_COMPILER as
  | 'uni-app'
  | 'vue'
  | undefined

/** Value of `process.env.UNI_NVUE_STYLE_COMPILER` */
export const nvueStyleCompiler = envShim.UNI_NVUE_STYLE_COMPILER as
  | 'uni-app'
  | undefined

/** Value of `process.env.UNI_COMPILER_VERSION` */
export const compilerVersion = envShim.UNI_COMPILER_VERSION as string

/** Value of `process.env.UNI_COMPILER_VERSION_TYPE` */
export const compilerVersionType = envShim.UNI_COMPILER_VERSION_TYPE as
  | 'a'
  | 'r'

/** Value of `process.env.STAT_TITLE_JSON` */
export const statTitleJson = parseJSON<Record<string, string>>(
  envShim.STAT_TITLE_JSON,
)

/** Value of `process.env.UNI_CUSTOM_CONTEXT` */
export const customContext = envShim.UNI_CUSTOM_CONTEXT

/** Value of `process.env.UNI_CUSTOM_SCRIPT` */
export const customScript = envShim.UNI_CUSTOM_SCRIPT

/** Value of `process.env.UNI_CUSTOM_DEFINE` */
export const customDefine = envShim.UNI_CUSTOM_DEFINE

/** Value of `process.env.UNI_SUBPACKAGE` */
export const subpackage = envShim.UNI_SUBPACKAGE

/** Detect if `UNI_MP_PLUGIN` environment variable is set */
export const isMpPlugin = toBoolean(envShim.UNI_MP_PLUGIN)

/** Value of `process.env.UNI_RENDERER` */
export const renderer = envShim.UNI_RENDERER as 'native' | undefined

/** Value of `process.env.UNI_RENDERER_NATIVE` */
export const rendererNative = envShim.UNI_RENDERER_NATIVE as
  | 'appService'
  | 'pages'
  | undefined

/** Detect if `UNI_MINIMIZE` environment variable is set */
export const isMinimize = toBoolean(envShim.UNI_MINIMIZE)

/** Detect if `UNI_SSR_CLIENT` environment variable is set  */
export const isSSRClient = toBoolean(envShim.UNI_SSR_CLIENT)

/** Detect if `UNI_SSR_SERVER` environment variable is set  */
export const isSSRServer = toBoolean(envShim.UNI_SSR_SERVER)

/** Detect if `process.env.UNI_PLATFORM` is `H5` */
export const isH5 = platform === 'h5'

/** Detect if `process.env.UNI_PLATFORM` is `APP` */
export const isApp = platform === 'app'

/** Detect if `process.env.UNI_APP_PLATFORM` is `android` or if `process.env.UNI_UTS_PLATFORM` is "app-android" */
export const isAppAndroid = appPlatform === 'android' || utsPlatform === 'app-android'

/** Detect if `process.env.UNI_APP_PLATFORM` is `ios` or if `process.env.UNI_UTS_PLATFORM` is "app-ios" */
export const isAppIOS = appPlatform === 'ios' || utsPlatform === 'app-ios'

/** Detect if `process.env.UNI_PLATFORM` is `小程序` */
export const isMp = /^mp-/i.test(platform)

/** Detect if `process.env.UNI_PLATFORM` is `微信小程序` */
export const isMpWeixin = platform === 'mp-weixin'

/** Detect if `process.env.UNI_PLATFORM` is `支付宝小程序` */
export const isMpAlipay = platform === 'mp-alipay'

/** Detect if `process.env.UNI_PLATFORM` is `百度小程序` */
export const isMpBaidu = platform === 'mp-baidu'

/** Detect if `process.env.UNI_PLATFORM` is `快手小程序` */
export const isMpKuaishou = platform === 'mp-kuaishou'

/** Detect if `process.env.UNI_PLATFORM` is `QQ小程序` */
export const isMpQQ = platform === 'mp-qq'

/** Detect if `process.env.UNI_PLATFORM` is `头条小程序` */
export const isMpToutiao = platform === 'mp-toutiao'

/** Detect if `process.env.UNI_PLATFORM` is `快应用` */
export const isQuickapp = /^quickapp--webview/i.test(platform)

/** Detect if `process.env.UNI_PLATFORM` is `快应用联盟` */
export const isQuickappUnion = platform === 'quickapp-webview-union'

/** Detect if `process.env.UNI_PLATFORM` is `快应用华为` */
export const isQuickappHuawei = platform === 'quickapp-webview-huawei'

// utils
function toBoolean(val: any) {
  return val ? val !== 'false' : false
}

function parseJSON<T>(val: any) {
  let obj: T
  try {
    obj = JSON.parse(val || '{}') as T
  }
  catch (error) {
    obj = {} as T
  }
  return obj
}
