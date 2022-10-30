import React, { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TransformWrapper, TransformComponent } from '@pronestor/react-zoom-pan-pinch'
import Station from 'components/station'
import stationData from 'data/station.json'

import { MapDataProps } from 'interface/I_Map'
import { DEFAULT } from 'utils/mapConfig'

const Map = () => {
  // the aspect of 【svg】
  const aspect = useMemo(() => stationData.size.width / stationData.size.height, [])
  // the size of 【svg】
  const [size, setSize] = useState({ width: 960, height: 1286 })
  // the scale of 【element】 in svg
  const [scale, setScale] = useState(1)

  const handleResize = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window
    if (windowWidth < windowHeight) {
      // Portrait (mobile)
      setSize({ width: windowWidth, height: windowWidth / aspect })
      return
    }
    // Landscape (computer)
    setSize({ width: windowHeight * aspect, height: windowHeight })
  }

  useEffect(() => {
    // initial the svg size
    handleResize()
  }, [])

  useEffect(() => {
    // listen whether window size has changed
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // calculate the scale
    if (size.width / aspect < size.height) {
      // use width to calculate the scale
      setScale(size.width / stationData.size.width)
      return
    }
    // use height to calculate the scale
    setScale(size.height / stationData.size.height)
  }, [size])

  const svgStyle = {
    width: size.width,
    height: size.height,
    background: '#fff'
  }

  const stations = useMemo(() =>
    stationData.stations.map((station: MapDataProps) => (
      <Station
        key={uuidv4()}
        stationId={station.stationId}
        name={station.name}
        x={station.pos.x * scale}
        y={station.pos.y * scale}
        r={DEFAULT.RADIUS * scale}
        strokeWidth={DEFAULT.STROKEWIDTH * scale}
        line={station.lines}
        fontSize={DEFAULT.FONTSIZE * scale}
      />
    ))
  , [scale])

  return (
    <div className="w-full h-full flex justify-center items-start overflow-auto">
      <TransformWrapper>
        <TransformComponent>
          <svg style={svgStyle}>
            <g id="stations">{stations}</g>
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default Map
