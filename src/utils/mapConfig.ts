import { LINE, ANCHOR } from 'interface/I_Map'

export enum DEFAULT {
  BACKGROUND_COLOR = '#282828',

  // station
  RADIUS = 10,
  STATION_COLOR = '#FFFFF4',

  // connector line
  STROKEWIDTH = 3,
  CONNECTOR_STROKEWIDTH = 8,

  // text
  FONTSIZE = 12,
  FONT_COLOR = '#FFFFFF',

  SELECTED_RADIUS = 6,
  SELECTED_DOT_COLOR = '#2E5C6E',
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

export const stationTextPosConvert = (pos: { x: number, y: number }, anchor: string, scale: number) => {
  const gapX = (DEFAULT.RADIUS + 3) * scale
  const gapY = (DEFAULT.RADIUS + 8) * scale

  const offset = 3

  switch (anchor) {
    case ANCHOR.TOP:
      return { x: pos.x, y: pos.y - gapY }
    case ANCHOR.BOTTOM:
      return { x: pos.x, y: pos.y + gapY }
    case ANCHOR.TOP_RIGHT:
      return { x: pos.x + gapX - offset, y: pos.y - gapY + offset }
    case ANCHOR.RIGHT:
      return { x: pos.x + gapX, y: pos.y }
    case ANCHOR.BOTTOM_RIGHT:
      return { x: pos.x + gapX - offset, y: pos.y + gapY - offset }
    case ANCHOR.TOP_LEFT:
      return { x: pos.x - gapX + offset, y: pos.y - gapY + offset }
    case ANCHOR.LEFT:
      return { x: pos.x - gapX, y: pos.y }
    case ANCHOR.BOTTOM_LEFT:
      return { x: pos.x - gapX + offset, y: pos.y + gapY - offset }
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
