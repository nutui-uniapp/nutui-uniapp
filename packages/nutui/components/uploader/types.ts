export type SizeType = 'original' | 'compressed'
export type SourceType = 'album' | 'camera'
export type AcceptType = 'image' | 'media' | 'video' | 'all'
export type MediaType = 'image' | 'video' | 'mix'
export type FileType = 'image' | 'video' | 'audio'
export type FileItemStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface FileItem {
  status: FileItemStatus
  message: string
  uid?: string
  name: string
  url?: string
  type?: FileType
  path?: string
  size: number
  percentage?: string | number
}

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
  clearUploadQueue: (index?: number) => void
}
export interface DragState {
  dragging: boolean
  dragIndex: number
  startX: number
  startY: number
  offsetX: number
  offsetY: number
  // 各 item 的位置缓存
  rects: Array<{ left: number, top: number, width: number, height: number }>
}
