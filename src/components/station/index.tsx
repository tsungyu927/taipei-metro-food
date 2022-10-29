import React from 'react'
import { stationColor } from 'utils/colorConvert'

interface StationProps {
  x: number
  y: number
  r: number
  line: string[]
}

const Station = ({ x, y, r, line }: StationProps) => {
  const circleStyle = {
    stroke: stationColor(line),
    strokeWidth: 3,
    fill: '#fff'
  }

  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      style={circleStyle}
    />
  )
}

export default Station
