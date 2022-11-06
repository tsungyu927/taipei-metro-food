import React, { useEffect, useMemo, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from '@pronestor/react-zoom-pan-pinch'

import Connector from 'components/connector'
import Station from 'components/station'
import SelectedDot from 'components/selectedDot'

import connectorData from 'data/connector.json'
import stationData from 'data/station.json'

import { ConnectorDataProps, MapDataProps, ClickStationProps } from 'interface/I_Map'
import { DEFAULT } from 'utils/mapConfig'

interface MapProps {
  handleClickStation: (info: ClickStationProps) => void
}

const Map = ({ handleClickStation }: MapProps) => {
  const ref = useRef<ReactZoomPanPinchRef | null>(null)
  // the aspect of 【svg】
  const aspect = useMemo(() => stationData.size.width / stationData.size.height, [])
  // the size of 【svg】
  const [size, setSize] = useState({ width: 960, height: 1286 })
  // the scale of 【element】 in svg
  const [scale, setScale] = useState(1)
  const [clickedStation, setClickedStation] = useState<ClickStationProps | undefined>(undefined)

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

  const onClickStation = (info: ClickStationProps) => {
    setClickedStation(info)
    // return station info to parent
    handleClickStation(info)
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

  useEffect(() => {
    // set map pos to the station that user clicked
    if (clickedStation !== undefined) {
      const staticScale = 2
      const x = (clickedStation.x * staticScale - size.width / 2) * -1
      const y = (clickedStation.y * staticScale - size.height / 2) * -1
      ref?.current?.setTransform(x, y, staticScale)
    }
  }, [clickedStation])

  useEffect(() => {
    // set init pos in the beginning
    const defaultScale = 2
    const initX = ((DEFAULT.INIT_POSX * scale * defaultScale) - (size.width / 2)) * -1
    const initY = ((DEFAULT.INIT_POSY * scale * defaultScale) - (size.height / 2)) * -1
    ref?.current?.setTransform(initX, initY, defaultScale)
  }, [scale])

  const svgStyle = {
    width: size.width,
    height: size.height
  }

  const connector = useMemo(() =>
    connectorData.connector.map((item: ConnectorDataProps) => (
      <Connector
        key={uuidv4()}
        line={item.line}
        path={item.path}
        connected={item.connected}
        strokeWidth={DEFAULT.CONNECTOR_STROKEWIDTH * scale}
        scale={scale}
      />
    ))
  , [scale])

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
        scale={scale}
        handleClick={onClickStation}
      />
    ))
  , [scale])

  return (
    <div
      className="w-fit h-fit flex justify-center items-start overflow-auto"
      style={{ backgroundColor: DEFAULT.BACKGROUND_COLOR }}
    >
      <TransformWrapper
        ref={ref}
        centerZoomedOut
      >
        <TransformComponent>
          <svg style={svgStyle}>
            <g id="connector">{connector}</g>
            <g id="stations">{stations}</g>
            {(clickedStation !== undefined) && (
              <SelectedDot
                x={clickedStation.x}
                y={clickedStation.y}
                r={DEFAULT.SELECTED_RADIUS * scale}
                scale={scale}
              />
            )}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default Map
