import type { ExtractPropTypes, PropType } from 'vue'
import { type Interceptor, isArray, isObject } from '../_utils'
import type { AcceptType, FileItem, MediaType, SizeType, SourceType } from './type'
import type { UploadOptions } from './use-uploader'

export const uploaderProps = {
  name: { type: String, default: 'file' },
  url: { type: String, default: '' },
  sourceType: {
    type: Array as PropType<SourceType[]>,
    default: () => ['album', 'camera'],
  },
  mediaType: {
    type: Array as PropType<MediaType[]>,
    default: () => ['image', 'video', 'mix'],
  },

  timeout: { type: [Number, String], default: 1000 * 30 },
  // defaultFileList: { type: Array, default: () => new Array<FileItem>() },
  fileList: { type: Array<any>, default: () => [] },
  isPreview: { type: Boolean, default: true },
  // picture、list
  listType: { type: String, default: 'picture' },
  isDeletable: { type: Boolean, default: true },
  method: { type: String, default: 'post' },
  capture: { type: Boolean, default: false },
  maximize: { type: [Number, String], default: Number.MAX_VALUE },
  maximum: { type: [Number, String], default: 9 },
  clearInput: { type: Boolean, default: true },
  accept: { type: String as PropType<AcceptType>, default: 'image' },
  headers: { type: Object, default: {} },
  data: { type: Object, default: {} },
  xhrState: { type: [Number, String], default: 200 },
  multiple: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  autoUpload: { type: Boolean, default: true },
  beforeUpload: {
    type: Function,
    default: null,
  },
  beforeDelete: {
    type: Function as PropType<Interceptor>,
    default: (file: FileItem, files: FileItem[]) => {
      return true
    },
  },
  onChange: { type: Function },
  /**
   * 当accept为video时生效，是否压缩视频，默认为true（默认 true ）
   * compressed: { type: Boolean, default: true },
   * 当accept为video时生效，拍摄视频最长拍摄时间，单位秒（默认 60 ）
   */
  maxDuration: { type: [Number, String], default: 60 },
  /**
   * 所选的图片的尺寸, 可选值为original compressed
   */
  sizeType: {
    type: Array as PropType<SizeType[]>,
    default: ['original', 'compressed'],
  },
  /**
   * 当accept为video时生效，可选值为back或front
   */
  camera: {
    type: String as PropType<'back' | 'front' | undefined>,
    default: 'back',
  },
  mode: {
    type: String as PropType<'aspectFit' | 'scaleToFill' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'>,
    default: 'aspectFit',
  },
}

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>

export const uploaderEmits = {
  'start': (option: UploadOptions) => option,
  'progress': (val: { event: any; option: UploadOptions; percentage: string | number }) => isObject(val),
  'update:fileList': (val: FileItem[]) => isArray(val),
  'oversize': (val: any[]) => isArray(val),
  'success': (val: any) => val,
  'failure': (err: any) => err,
  'change': (val: { fileList: FileItem[]; event?: any }) => val,
  'delete': (val: { file: FileItem; fileList: FileItem[]; index: number }) => val,
  'fileItemClick': (val: any) => true,
}

export type UploaderEmits = typeof uploaderEmits

export interface UploaderInst {
  submit: () => void
  chooseImage: () => void
  clearUploadQueue: (index: number) => void
}
