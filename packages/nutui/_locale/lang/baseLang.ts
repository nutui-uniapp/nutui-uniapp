export interface BaseLang {
  save: string
  confirm: string
  cancel: string
  done: string
  noData: string
  placeholder: string
  select: string
  video: {
    errorTip: string
    clickRetry: string
  }
  fixednav: {
    activeText: string
    unActiveText: string
  }
  pagination: {
    prev: string
    next: string
  }
  calendaritem: {
    weekdays: Array<string>
    end: string
    start: string
    title: string
    monthTitle: any
    today: string
  }
  shortpassword: {
    title: string
    desc: string
    tips: string
  }
  uploader: {
    ready: string
    readyUpload: string
    waitingUpload: string
    uploading: string
    success: string
    error: string
  }
  countdown: {
    day: string
    hour: string
    minute: string
    second: string
  }
  address: {
    selectRegion: string
    deliveryTo: string
    chooseAnotherAddress: string
  }
  signature: {
    reSign: string
    unSupportTpl: string
  }
  ecard: {
    chooseText: string
    otherValueText: string
    placeholder: string
  }
  timeselect: {
    pickupTime: string
  }
  sku: {
    buyNow: string
    buyNumber: string
    addToCart: string
  }
  skuheader: {
    skuId: string
  }
  addresslist: {
    addAddress: string
    default: string
  }
  comment: {
    complaintsText: string
    additionalReview: any
    additionalImages: any
  }
  infiniteloading: {
    loading: string
    pullTxt: string
    loadMoreTxt: string
  }
  datepicker: {
    year: string
    month: string
    day: string
    hour: string
    min: string
    seconds: string
  }
  audiooperate: {
    back: string
    start: string
    pause: string
    forward: string
    mute: string
  }
  pullrefresh: {
    pulling: string
    loosing: string
    loading: string
  }
}

export function defineLocaleConfig(locale: BaseLang) {
  return locale
}
