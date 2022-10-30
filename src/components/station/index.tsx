import React, { useMemo } from 'react'
import { stationColor, stationTextPosConvert, textAnchorConvert } from 'utils/mapConfig'
import { ClickStationProps } from 'interface/I_Map'

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
  scale: number
  handleClick: (info: ClickStationProps) => void
}

const Station = ({ stationId, name, x, y, r, strokeWidth, line, fontSize, scale, handleClick }: StationProps) => {
  const stationTextPos = useMemo<{ x: number, y: number }>(() => stationTextPosConvert({ x, y }, name.anchor, scale), [x, y, name.anchor])
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
    // handle click event
    handleClick({
      x,
      y,
      r,
      name: {
        en: name.en,
        zh: name.zh
      }
    })
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
