export interface AddressRegionData {
  name: string
  [key: string]: any
}

export interface CustomRegionData {
  title: string
  list: any[]
}

export interface AddressExistRegionData {
  id?: string | number
  provinceName: string
  cityName: string
  countyName: string
  townName: string
  addressDetail: string
  selectedAddress: boolean
  [key: string]: any
}

export type AddressType = 'exist' | 'custom' | 'custom2'
