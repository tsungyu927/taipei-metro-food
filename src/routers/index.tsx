import React from 'react'
import Home from 'pages/home'

const routers = [
  {
    name: '主頁',
    path: '/',
    element: <Home />
  },
  {
    name: '無',
    path: '*'
    // element: <NotFound />,
  }
]

export default routers
