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

  percentage?: string | number

  formData?: any
}
