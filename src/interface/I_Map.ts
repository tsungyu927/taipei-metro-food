export enum LINE {
  BROWN = 'BROWN',
  RED = 'RED',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  MULTIPLE = 'MULTIPLE'
}

export enum ANCHOR {
  TOP_LEFT = 'top-left',
  TOP = 'top',
  TOP_RIGHT = 'top-right',
  RIGHT = 'right',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-left',
  LEFT = 'left',
}

export interface MapDataProps {
  stationId: string[]
  name: {
    en: string
    zh: string
    anchor: string
  }
  pos: {
    x: number
    y: number
  }
  lines: string[]
}

export interface ConnectorDataProps {
  line: string
  path: Array<{
    command: string
    pos: Array<{
      x: number
      y: number
    }>
  }>
  connected: {
    from: string
    to: string
  }
}
