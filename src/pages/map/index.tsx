import React, { useMemo } from 'react'
import Station from 'components/station'
import stationData from 'data/station.json'

import { MapDataProps } from 'interface/I_Map'

const Map = () => {
  const scale = 1

  const svgStyle = {
    width: 960,
    height: 1286,
    background: '#E7E7E7'
  }

  const stations = useMemo(() =>
    stationData.stations.map((station: MapDataProps) => (
      <Station
        key={station.id}
        x={station.pos.x * scale}
        y={station.pos.y * scale}
        r={10 * scale}
        line={station.lines}
      />
    ))
  , [scale])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg style={svgStyle}>
        <g>{stations}</g>
      </svg>
    </div>
  )
}

export default Map
