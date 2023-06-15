export type NavigateToOptions = string | UniApp.NavigateToOptions
export type RedirectToOptions = string | UniApp.RedirectToOptions

export type RouterOptions = UniApp.NavigateToOptions | UniApp.RedirectToOptions

export function useRouter() {
  const push = (options: NavigateToOptions) => {
    if (typeof options === 'string') {
      uni.navigateTo({ url: options })
      return
    }

    uni.navigateTo(options)
  }
  const replace = (options: RedirectToOptions) => {
    if (typeof options === 'string') {
      uni.redirectTo({ url: options })
      return
    }

    uni.redirectTo(options)
  }

  return {
    push,
    replace,
  }
}
