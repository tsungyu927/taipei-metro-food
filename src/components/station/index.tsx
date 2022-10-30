import React, { useMemo } from 'react'
import { stationColor, stationTextPosConvert, textAnchorConvert } from 'utils/mapConfig'

interface StationProps {
  stationId: string[]
  name: {
    en: string
    zh: string
    anchor: string
  }
  x: number
  y: number
  r: number
  strokeWidth: number
  line: string[]
  fontSize: number
}

const Station = ({ stationId, name, x, y, r, strokeWidth, line, fontSize }: StationProps) => {
  const stationTextPos = useMemo<{ x: number, y: number }>(() => stationTextPosConvert({ x, y }, name.anchor), [x, y, name.anchor])
  const circleStyle = {
    stroke: stationColor(line),
    strokeWidth,
    fill: '#fff'
  }

  const onMouseEnter = () => {
    // console.log(`Enter: ${name.zh}`)
  }

  const onMouseLeave = () => {
    // console.log(`Leave: ${name.zh}`)
  }

  const onClick = () => {
    console.log(`Click: ${name.zh}`)
  }

  return (
    <g
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onClick()}
    >
      <circle
        cx={x}
        cy={y}
        r={r}
        style={circleStyle}
      />
      <text
        x={stationTextPos.x}
        y={stationTextPos.y}
        fontSize={fontSize}
        fontFamily="TaipeiSans"
        textAnchor={textAnchorConvert(name.anchor)}
        dy=".3em"
      >
          {name.zh}
      </text>
    </g>
  )
}

export default Station
