import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUTC(utcString: string, format: string = DEFAULT_FORMAT) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
