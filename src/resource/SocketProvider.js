import React, { createContext, useContext, useRef } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const sockets = useRef({})  // 多任务 socket 存储

  const getSocket = (id) => {
    if (!sockets.current[id]) {
      const socket = io('http://10.16.53.208:8000')
      socket.emit('join', id)
      sockets.current[id] = socket
    }
    return sockets.current[id]
  }

  const disconnectSocket = (id) => {
    if (sockets.current[id]) {
      sockets.current[id].disconnect()
      delete sockets.current[id]
    }
  }

  return (
    <SocketContext.Provider value={{ getSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = (id) => {
  const context = useContext(SocketContext)
  if (!context) throw new Error("useSocket 必须在 <SocketProvider> 中使用")
  return context.getSocket(id)
}
