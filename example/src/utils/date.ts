/**
 * 时间戳转换 或 获取当前时间的时间戳
 */
export function getTimeStamp(timeStr?: string | number) {
  if (!timeStr)
    return Date.now()
  let t = timeStr
  t = (t as number > 0) ? +t : t.toString().replace(/-/g, '/')
  return new Date(t).getTime()
}

/**
 * 是否为闫年
 * @return {Boolse} true|false
 */
export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
}

/**
 * 返回星期数
 * @return {string}
 */
export function getWhatDay(year: number, month: number, day: number): string {
  const date = new Date(`${year}/${month}/${day}`)
  const index = date.getDay()
  const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return dayNames[index]
}

/**
 * 返回星期数
 * @return {number}
 */
export function getMonthPreDay(year: number, month: number): number {
  const date = new Date(`${year}/${month}/01`)
  let day = date.getDay()
  if (day === 0)
    day = 7

  return day
}

/**
 * 返回月份天数
 * @return {number}
 */
export function getMonthDays(year: string, month: string): number {
  if (month.startsWith('0'))
    month = month.split('')[1]

  return ([0, 31, isLeapYear(Number(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as number[])[
    month as any
  ]
}

/**
 * 补齐数字位数
 * @return {string}
 */
export function getNumTwoBit(n: number): string {
  n = Number(n)
  return (n > 9 ? '' : '0') + n
}

/**
 * 日期对象转成字符串
 * @return {string}
 */
export function date2Str(date: Date, split?: string): string {
  split = split || '-'
  const y = date.getFullYear()
  const m = getNumTwoBit(date.getMonth() + 1)
  const d = getNumTwoBit(date.getDate())
  return [y, m, d].join(split)
}

/**
 * 返回日期格式字符串
 * @param i 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
 * @return {string} '2014-12-31'
 */
export function getDay(i: number): string {
  i = i || 0
  let date = new Date()
  const diff = i * (1000 * 60 * 60 * 24)
  date = new Date(date.getTime() + diff)
  return date2Str(date)
}

/**
 * 时间比较
 * @return {boolean}
 */
export function compareDate(date1: string, date2: string): boolean {
  const startTime = new Date(date1.replace('-', '/').replace('-', '/'))
  const endTime = new Date(date2.replace('-', '/').replace('-', '/'))
  if (startTime >= endTime)
    return false

  return true
}

/**
 * 时间是否相等
 * @return {boolean}
 */
export function isEqual(date1: string, date2: string): boolean {
  const startTime = new Date(date1).getTime()
  const endTime = new Date(date2).getTime()
  if (startTime === endTime)
    return true

  return false
}
export function getMonthWeek(year: string, month: string, date: string, firstDayOfWeek = 0): number {
  const dateNow = new Date(Number(year), Number.parseInt(month) - 1, Number(date))
  let w = dateNow.getDay() // 星期数
  const d = dateNow.getDate()
  let remainder = 6 - w
  if (firstDayOfWeek !== 0) {
    w = w === 0 ? 7 : w
    remainder = 7 - w
  }
  return Math.ceil((d + remainder) / 7)
}
export function getYearWeek(year: string, month: string, date: string): number {
  const dateNow = new Date(Number(year), Number.parseInt(month) - 1, Number(date))
  const dateFirst = new Date(Number(year), 0, 1)
  const dataNumber = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / 86400000)
  return Math.ceil((dataNumber + (dateFirst.getDay() + 1 - 1)) / 7)
}
export function getWeekDate(year: string, month: string, date: string, firstDayOfWeek = 0): string[] {
  const dateNow = new Date(Number(year), Number.parseInt(month) - 1, Number(date))
  const nowTime = dateNow.getTime()
  let day = dateNow.getDay()
  if (firstDayOfWeek === 0) {
    const oneDayTime = 24 * 60 * 60 * 1000
    // 显示周日
    const SundayTime = nowTime - day * oneDayTime // 本周的周日
    // 显示周六
    const SaturdayTime = nowTime + (6 - day) * oneDayTime // 本周的周六

    const sunday = date2Str(new Date(SundayTime))
    const saturday = date2Str(new Date(SaturdayTime))
    return [sunday, saturday]
  }
  else {
    day = day === 0 ? 7 : day
    const oneDayTime = 24 * 60 * 60 * 1000
    // 显示周一
    const MondayTime = nowTime - (day - 1) * oneDayTime // 本周的周一
    // 显示周日
    const SundayTime = nowTime + (7 - day) * oneDayTime // 本周的周日

    const monday = date2Str(new Date(MondayTime))
    const sunday = date2Str(new Date(SundayTime))
    return [monday, sunday]
  }
}
export function formatResultDate(date: string) {
  const days = [...date.split('-')]
  days[2] = getNumTwoBit(Number(days[2]))
  days[3] = `${days[0]}-${days[1]}-${days[2]}`
  days[4] = getWhatDay(+days[0], +days[1], +days[2])
  return days
}
