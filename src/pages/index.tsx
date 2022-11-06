import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routers from 'routers'

const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          {routers.map((router) => (
            <Route key={router.name} path={router.path} element={router.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
