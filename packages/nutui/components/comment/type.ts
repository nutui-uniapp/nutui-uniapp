export interface VideosType {
  id: number | string
  mainUrl: string
  videoUrl: string
}
export interface ImagesType {
  smallImgUrl: string
  bigImgUrl: string
  imgUrl: string
}

export interface InfoType {
  /**
   * @description 评论详情
   */
  content: string
  /**
   * @description 评论人的姓名
   */
  nickName: string
  /**
   * @description 评论星星数
   */
  score: string | number
  /**
   * @description 评论人头像
   */
  avatar: string
  /**
   * @description 评论时间
   */
  time: string
  /**
   * @description 评论人购买的商品规格
   */
  size: string
  /**
   * @description 此评论的回复数
   */
  replay: number
  /**
   * @description 此评论的点赞数
   */
  like: number
}

export interface FollowType {
  /**
   * @description 购买多少天后进行追评
   */
  days: number
  /**
   * @description 追评内容
   */
  content: string
  /**
   * @description 追评图片
   */
  images: []
}
