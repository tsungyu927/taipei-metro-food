import { LINE } from 'interface/I_Map'

export const stationColor = (line: string[]) => {
  // return 【Black】 when this station is an intersection
  const lineColor = line.length === 1 ? line[0] : LINE.MULTIPLE

  switch (lineColor) {
    case LINE.BROWN:
      return '#C48C31'
    case LINE.RED:
      return '#E3002C'
    case LINE.GREEN:
      return '#008659'
    case LINE.ORANGE:
      return '#F8B61C'
    case LINE.BLUE:
      return '#0070BD'
    case LINE.YELLOW:
      return '#FDDB00'
    case LINE.MULTIPLE:
      return '#000'
    default:
      return '#000'
  }
}
