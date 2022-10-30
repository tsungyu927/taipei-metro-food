import React, { useMemo } from 'react'
import { ConnectorDataProps } from 'interface/I_Map'

import { stationColor } from 'utils/mapConfig'

interface ConnectorProps extends ConnectorDataProps {
  strokeWidth: number
  scale: number
}

const Connector = ({ strokeWidth, scale, line, path, connected }: ConnectorProps) => {
  const d = useMemo(() => {
    const pathArr = path.map((item) => {
      const pos = item.pos.map((posItem) => {
        return `${posItem.x * scale},${posItem.y * scale}`
      }).join(' ')
      return `${item.command}${pos}`
    })
    return pathArr.join(' ')
  }, [path])

  return (
    <g id={`${connected.from}-${connected.to}`}>
      <path d={d} strokeWidth={strokeWidth} stroke={stationColor([line])} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  )
}

export default Connector
