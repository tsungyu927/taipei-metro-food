import React from 'react'
import { MdOutlineFastfood } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'

const Menu = () => {
  return (
    <div className="pl-6 w-full h-full flex flex-col">
      <div className="w-full h-[100px] text-text-main text-[24px] flex justify-start items-center gap-2">
        <div className="w-[35px] h-[35px] rounded-full bg-bg-dark-grey flex justify-center items-center">
          <MdOutlineFastfood fontSize={20}/>
        </div>
        <span className="font-taipeiSans">
          台北美食地圖
        </span>
      </div>
      <div className="w-full h-[calc(100%-200px)] flex flex-col justify-start items-start">
        <div className="mb-4 text-text-secondary font-bold text-lg">
          Menu
        </div>
        <button
          type='button'
          className="w-full flex justify-start items-center gap-3 text-text-main"
        >
          <div className="w-[25px] h-[25px] flex justify-center items-center">
            <AiFillHome />
          </div>
          <span className="font-taipeiSans">Home</span>
        </button>
      </div>
      <div className="w-full h-[100px]">
        setting
      </div>
    </div>
  )
}

export default Menu
