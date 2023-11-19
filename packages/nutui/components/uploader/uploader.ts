import type { ExtractPropTypes, PropType } from 'vue'
import { type Interceptor, commonProps, makeArrayProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import type { AcceptType, FileItem, MediaType, SizeType, SourceType } from './type'
import type { UploadOptions } from './use-uploader'

export const uploaderProps = {
  ...commonProps,
  /**
   * @description 发到后台的文件参数名
   * - 类型为 `string`
   * - 默认值为 `'file'`
   */
  name: makeStringProp('file'),
  /**
   * @description 上传服务器的接口地址
   */
  url: String,
  /**
   * @description 选择文件的来源
   * - 类型为 `Array<SourceType>`
   * - 默认值为 `['album', 'camera']`
   */
  sourceType: makeArrayProp<SourceType>(['album', 'camera']),
  /**
   * @description 选择文件类型
   * - 类型为 `Array<MediaType>`
   * - 默认值为 `['image', 'video', 'mix']`
   */
  mediaType: makeArrayProp<MediaType>(['image', 'video', 'mix']),
  /**
   * @description 超时时间，单位为毫秒
   * - 类型为 `number | string`
   * - 默认值为 `1000 * 30`
   */
  timeout: makeNumericProp(1000 * 30),
  /**
   * @description 默认已经上传的文件列表
   */
  fileList: makeArrayProp<any>([]),
  /**
   * @description 是否上传成功后展示预览图
   * - 类型为 `boolean`
   * - 默认值为 `true`
   */
  isPreview: truthProp,
  /**
   * @description 上传列表的内建样式，支持两种基础样式 `picture`、`list`
   * - 类型为 `string`
   * - 默认值为 `'picture'`
   */
  listType: makeStringProp<'picture' | 'list'>('picture'),
  /**
   * @description 是否展示删除按钮
   */
  isDeletable: truthProp,
  /**
   * @description 上传请求的 http method
   * - 类型为 `string`
   * - 默认值为 `'post'`
   */
  method: makeStringProp('post'),
  capture: Boolean,
  /**
   * @description 可以设定最大上传文件的大小（字节）
   */
  maximize: makeNumericProp(Number.MAX_VALUE),
  /**
   * @description 最多可以选择的文件个数，微信基础库2.25.0前，最多可支持9个文件，2.25.0及以后最多可支持20个文件
   */
  maximum: makeNumericProp(9),
  accept: makeStringProp<AcceptType>('image'),
  /**
   * @description 设置上传的请求头部
   */
  headers: { type: Object, default: {} },
  /**
   * @description 附加上传的信息 formData
   */
  data: { type: Object, default: {} },
  /**
   * @description 接口响应的成功状态（status）值
   */
  xhrState: makeNumericProp(200),
  /**
   * @description 是否支持文件多选
   */
  multiple: truthProp,
  /**
   * @description 是否禁用文件上传
   */
  disabled: Boolean,
  /**
   * @description 是否在选取文件后立即进行上传，false 时需要手动执行ref的`submit`方法进行上传
   */
  autoUpload: truthProp,
  /**
   * @description 执行 `uni.uploadFile` 上传时，自定义方法
   */
  beforeUpload: {
    type: Function,
    default: null,
  },
  /**
   * @description 除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除
   */
  beforeDelete: {
    type: Function as PropType<Interceptor>,
    default: (_file: FileItem, _files: FileItem[]) => {
      return true
    },
  },
  /**
   * @description 当accept为video时生效，是否压缩视频，默认为true（默认 true ）
   * - compressed: { type: Boolean, default: true },
   * - 当accept为video时生效，拍摄视频最长拍摄时间，单位秒（默认 60 ）
   */
  maxDuration: makeNumericProp(60),
  /**
   * @description 所选的图片的尺寸, 可选值为original compressed
   */
  sizeType: makeArrayProp<SizeType>(['compressed', 'original']),
  /**
   * 当accept为video时生效，可选值为back或front
   */
  camera: makeStringProp<'back' | 'front' | undefined>('back'),
  /**
   * @description 预览图片的 mode 属性
   */
  mode: makeStringProp<'aspectFit' | 'scaleToFill' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'>('aspectFit'),
}

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>

export const uploaderEmits = {
  'start': (option: UploadOptions) => option instanceof Object,
  'progress': (val: { event: any; option: UploadOptions; percentage: string | number }) => val instanceof Object,
  'update:fileList': (val: FileItem[]) => val instanceof Object,
  'oversize': (val: any[]) => val instanceof Object,
  'success': (val: any) => val instanceof Object,
  'failure': (err: any) => err instanceof Object,
  'change': (val: { fileList: FileItem[]; event?: any }) => val instanceof Object,
  'delete': (val: { file: FileItem; fileList: FileItem[]; index: number }) => val instanceof Object,
  'fileItemClick': (val: any) => val instanceof Object,
}

export type UploaderEmits = typeof uploaderEmits

export interface UploaderInst {
  /**
   * @description 手动上传模式，执行上传操作
   */
  submit: () => void
  /**
   * @description 调用选择文件的方法，效果等同于点击 nut-uploader 组件
   */
  chooseImage: () => void
  /**
   * @description 清空已选择的文件队列（该方法一般配合在手动模式上传时使用）
   * @param index
   * @returns
   */
  clearUploadQueue: (index: number) => void
}
