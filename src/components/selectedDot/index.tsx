import React from 'react'
import { DEFAULT } from 'utils/mapConfig'

interface SelectedDotProps {
  x: number
  y: number
  r: number
  scale: number
}

const SelectedDot = ({ x, y, r, scale }: SelectedDotProps) => {
  return (
    <g id="clicked dot">
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={DEFAULT.SELECTED_DOT_COLOR as string}
        opacity={0.75}
      >
        <animate attributeName="r" from={r} to={r * 3} dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" from={0.75} to={0} dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={DEFAULT.SELECTED_DOT_COLOR as string}
      />
    </g>
  )
}

export default SelectedDot
