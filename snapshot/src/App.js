import React from 'react'
import ItemMenu from './components/ItemMenu'
import './App.css'
import Content from './components/Content'
import routes from './router/router'
import { useRoutes } from 'react-router-dom'
import { SocketProvider } from './resource/SocketProvider'
export default function App() {
  const routerelement = useRoutes(routes)
  return (
    <div className='appwrapper'>
      <SocketProvider>
      <ItemMenu/>
      <div className='dividerwrapper'><span className='divider'></span></div>
      {routerelement}
      </SocketProvider>
    </div>
  )
}
