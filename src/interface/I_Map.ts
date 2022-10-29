export enum LINE {
  BROWN = 'BROWN',
  RED = 'RED',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  MULTIPLE = 'MULTIPLE'
}

export interface MapDataProps {
  id: string
  name: {
    en: string
    zh: string
  }
  pos: {
    x: number
    y: number
  }
  lines: string[]
}
