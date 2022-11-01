import React, { useState } from 'react'
import Map from 'pages/map'

import { ClickStationProps } from 'interface/I_Map'

function App () {
  const [clickedStation, setClickedStation] = useState<ClickStationProps | undefined>(undefined)

  const handleClickStation = (info: ClickStationProps) => {
    setClickedStation(info)
  }

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-[#E7E7E7]">
      <Map handleClickStation={handleClickStation} />
      {(clickedStation !== undefined) && (
        <div className="fixed bottom-4 right-4">
          {clickedStation.name.zh}
        </div>
      )}
    </div>
  )
}

export default App
