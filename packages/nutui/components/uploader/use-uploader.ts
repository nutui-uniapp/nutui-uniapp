import { omit } from '../_utils'
import type { AcceptType, FileType, SizeType } from './type'
import type { UploaderProps } from './uploader'

interface UniChooseFileSuccessCallbackResult {
  /**
   * 本地文件路径列表
   */
  tempFilePaths?: string[]
  /**
   * 本地文件列表，每一项是一个 File 对象
   */
  tempFiles: ({
    path: string
    size: number
    name: string
    type: string
  } & File)[]
}

export interface ChooseFile {
  size: number
  type?: FileType
  fileType?: FileType
  originalFileObj?: any
  tempFilePath?: string
  thumbTempFilePath?: string
  path?: string
  name: string
  thumb?: string
  url?: string
  [k: string]: unknown
}

function omitProps<T>(obj: T, keys: string[]) {
  if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj)))
    return {}

  return omit(obj as unknown as Record<string, unknown>, keys)
}

function formatImage(res: UniChooseFileSuccessCallbackResult): ChooseFile[] {
  return res.tempFiles.map(item => ({
    ...omitProps(item, ['path']),
    type: 'image',
    url: item.path,
    thumb: item.path,
    size: item.size,
    name: item.name || 'image',
  }))
}

function formatMedia(res: UniApp.ChooseMediaSuccessCallbackResult & { name?: string }): ChooseFile[] {
  return res.tempFiles.map(item => ({
    ...omitProps(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
    type: res.type as FileType,
    url: item.tempFilePath,
    thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size,
    name: res?.name || 'media',
  }))
}

export interface ChooseFileOptions {
  accept: AcceptType
  multiple: boolean
  capture: boolean
  maxDuration: number
  sizeType: SizeType[]
  camera?: 'back' | 'front'
  maxCount: number
}

export function chooseFile({
  multiple,
  maxDuration,
  sizeType,
  camera,
}: ChooseFileOptions, props: UploaderProps, fileList: any[]): Promise<ChooseFile[]> {
  return new Promise((resolve, reject) => {
    // chooseMedia 目前只支持微信小程序原生，其余端全部使用 chooseImage API
    // #ifdef MP-WEIXIN

    uni.chooseMedia({
      /** 最多可以选择的文件个数 */
      count: multiple ? Number(props.maximum) * 1 - fileList.length : 1,
      /** 文件类型 */
      mediaType: props.mediaType,
      /** 图片和视频选择的来源 */
      sourceType: props.sourceType,
      /** 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间 */
      maxDuration,
      /** 仅对 mediaType 为 image 时有效，是否压缩所选文件 */
      sizeType,
      /** 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 */
      camera,
      /** 接口调用失败的回调函数 */
      fail: reject,
      /** 接口调用成功的回调函数 */
      success: res => resolve(formatMedia(res)),
    })
    // #endif

    // #ifndef MP-WEIXIN
    uni.chooseImage({
      // 选择数量
      count: props.multiple ? (props.maximum as number) * 1 - props.fileList.length : 1,
      // 可以指定是原图还是压缩图，默认二者都有
      sizeType,
      sourceType: props.sourceType,
      success: res => resolve(formatImage(res as UniChooseFileSuccessCallbackResult)),
      fail: reject,
    })
    // #endif
  })
}

export type OnProgressUpdateResult = UniApp.OnProgressUpdateResult
export type UploadFileSuccessCallbackResult = UniApp.UploadFileSuccessCallbackResult
export type GeneralCallbackResult = UniApp.GeneralCallbackResult

export type UploadOptions = UniNamespace.UploadFileOption & {
  xhrState?: number
  onStart?: (option: UploadOptions) => void
  onProgress?: (result: UniApp.OnProgressUpdateResult, option: UploadOptions) => void
  onSuccess?: (result: UniApp.UploadFileSuccessCallbackResult, option: UploadOptions) => void
  onFailure?: (result: UniApp.GeneralCallbackResult | UniApp.UploadFileSuccessCallbackResult, option: UploadOptions) => void
}

export function createUploader(options: UploadOptions) {
  const upload = () => {
    const uploadTask = uni.uploadFile({
      url: options.url,
      fileType: options.fileType,
      file: options.file,
      filePath: options.filePath,
      name: options.name,
      header: options.header,
      timeout: options.timeout,
      formData: options.formData,
      success: (result) => {
        if (options.xhrState === result.statusCode)
          options.onSuccess?.(result, options)
        else
          options.onFailure?.(result, options)
      },
      fail: (result) => {
        options.onFailure?.(result, options)
      },
    })

    options.onStart?.(options)

    uploadTask.onProgressUpdate((event) => {
      options.onProgress?.(event, options)
    })
  }

  return { upload }
}
