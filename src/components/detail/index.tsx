import React from 'react'
import { ClickStationProps } from 'interface/I_Map'

interface DetailProps {
  info?: ClickStationProps
}

const Detail = ({ info }: DetailProps) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className="text-text-main text-3xl font-bold">
        {info?.name?.zh} - {info?.name.en}
      </div>
    </div>
  )
}

export default Detail
