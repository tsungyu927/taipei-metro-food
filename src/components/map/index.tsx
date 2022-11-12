import React, { useEffect, useMemo, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from '@pronestor/react-zoom-pan-pinch'

import Connector from 'components/map/Connector'
import Station from 'components/map/Station'
import SelectedDot from 'components/map/SelectedDot'

import connectorData from 'data/connector.json'
import stationData from 'data/station.json'

import { ConnectorDataProps, MapDataProps, ClickStationProps } from 'interface/I_Map'
import { DEFAULT } from 'utils/mapConfig'

interface MapProps {
  width: number
  height: number
  clickedStation?: ClickStationProps
  handleClickStation: (info: ClickStationProps) => void
}

const Map = ({
  width,
  height,
  clickedStation,
  handleClickStation
}: MapProps) => {
  const ref = useRef<ReactZoomPanPinchRef | null>(null)
  // the aspect of 【svg】
  const aspect = useMemo(() => stationData.size.width / stationData.size.height, [])
  // the size of 【svg】
  const size = useMemo(() => ({ width, height }), [width, height])
  // the scale of 【element】 in svg
  const [scale, setScale] = useState(1)

  const onClickStation = (info: ClickStationProps) => {
    // return station info to parent
    handleClickStation(info)
  }

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
            <g id="title">
              <text
                x={size.width - 50 * scale}
                y={100 * scale}
                fontSize={50 * scale}
                fontFamily="TaipeiSans"
                textAnchor="end"
                fill={DEFAULT.FONT_COLOR as string}
              >
                台北捷運美食地圖
              </text>
              <text
                x={size.width - 50 * scale}
                y={150 * scale}
                fontSize={25 * scale}
                fontFamily="TaipeiSans"
                textAnchor="end"
                fill={DEFAULT.FONT_COLOR as string}
              >
                Version - 0.0.1
              </text>
            </g>
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default Map
