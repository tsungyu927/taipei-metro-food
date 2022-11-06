import React, { useState, useEffect } from 'react'
import Map from 'pages/map'

// import stationData from 'data/station.json'

import { ClickStationProps } from 'interface/I_Map'

function App () {
  // the aspect of container
  const aspect = 1
  const [clickedStation, setClickedStation] = useState<ClickStationProps | undefined>(undefined)
  const [mapSize, setMapSize] = useState<{ width: number, height: number }>({ width: 960, height: 1286 })

  const handleResize = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window
    if (windowWidth < windowHeight) {
      // Portrait (mobile)
      setMapSize({ width: windowWidth, height: windowWidth / aspect })
      return
    }
    // Landscape (computer)
    setMapSize({ width: windowHeight * aspect, height: windowHeight })
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

  console.log(mapSize)

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-[#E7E7E7]">
      <Map
        width={mapSize?.width}
        height={mapSize?.height}
        clickedStation={clickedStation}
        handleClickStation={(info: ClickStationProps) => setClickedStation(info)}
      />
    </div>
  )
}

export default App
