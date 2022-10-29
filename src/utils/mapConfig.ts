import { LINE, ANCHOR } from 'interface/I_Map'

export enum DEFAULT {
  RADIUS = 10,
  STROKEWIDTH = 3,
  FONTSIZE = 12
}

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

export const stationTextPosConvert = (pos: { x: number, y: number }, anchor: string) => {
  const gap = DEFAULT.RADIUS + 5

  switch (anchor) {
    case ANCHOR.TOP:
      return { x: pos.x, y: pos.y - gap }
    case ANCHOR.BOTTOM:
      return { x: pos.x, y: pos.y + gap }
    case ANCHOR.TOP_RIGHT:
      return { x: pos.x + gap, y: pos.y - gap }
    case ANCHOR.RIGHT:
      return { x: pos.x + gap, y: pos.y }
    case ANCHOR.BOTTOM_RIGHT:
      return { x: pos.x + gap, y: pos.y + gap }
    case ANCHOR.TOP_LEFT:
      return { x: pos.x - gap, y: pos.y - gap }
    case ANCHOR.LEFT:
      return { x: pos.x - gap, y: pos.y }
    case ANCHOR.BOTTOM_LEFT:
      return { x: pos.x - gap, y: pos.y + gap }
    default:
      return { x: pos.x, y: pos.y }
  }
}

export const textAnchorConvert = (anchor: string) => {
  switch (anchor) {
    case ANCHOR.TOP:
    case ANCHOR.BOTTOM:
      return 'middle'
    case ANCHOR.TOP_RIGHT:
    case ANCHOR.RIGHT:
    case ANCHOR.BOTTOM_RIGHT:
      return 'start'
    case ANCHOR.TOP_LEFT:
    case ANCHOR.LEFT:
    case ANCHOR.BOTTOM_LEFT:
      return 'end'
    default:
      return 'start'
  }
}
