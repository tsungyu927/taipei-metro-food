import React, { useState, useEffect } from 'react'
import Map from 'components/map'

// import stationData from 'data/station.json'

import { ClickStationProps } from 'interface/I_Map'
import Detail from 'components/detail'

function Home () {
  // the aspect of container
  const aspect = 960 / 1286
  const [clickedStation, setClickedStation] = useState<ClickStationProps | undefined>(undefined)
  const [mapSize, setMapSize] = useState<{ width: number, height: number }>({ width: 960, height: 1286 })

  const handleResize = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window
    const PADDING = 64
    if (windowWidth < windowHeight) {
      // Portrait (mobile)
      setMapSize({ width: windowWidth, height: windowWidth / aspect })
      return
    }
    // Landscape (computer)
    setMapSize({ width: (windowHeight - PADDING) * aspect, height: windowHeight - PADDING })
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

  return (
    <div className="p-8 relative w-full h-full flex justify-between items-center bg-bg-dark-secondary">
      <div className="w-[60%] h-full">
        <Detail info={clickedStation} />
      </div>
      <div className="w-[40%] h-full rounded-2xl overflow-hidden">
        <Map
          width={mapSize?.width}
          height={mapSize?.height}
          clickedStation={clickedStation}
          handleClickStation={(info: ClickStationProps) => setClickedStation(info)}
        />
      </div>
    </div>
  )
}

export default Home
