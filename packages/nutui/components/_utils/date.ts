/**
 * 时间戳转换 或 获取当前时间的时间戳
 * @param timeStr
 * @returns
 */
export function getTimeStamp(timeStr?: string | number) {
  if (!timeStr)
    return Date.now()
  let t = timeStr
  t = (t as number > 0) ? +t : t.toString().replace(/\-/g, '/')
  return new Date(t).getTime()
}
