import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routers from 'routers'
import Menu from 'components/menu'

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <BrowserRouter>
        <div className="w-[250px] h-full bg-bg-dark-primary">
          <Menu />
        </div>
        <div className="w-[calc(100%-250px)] h-full bg-bg-dark-secondary">
          <Routes>
            {routers.map((router) => (
              <Route key={router.name} path={router.path} element={router.element} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
